/*
 * canvg.js - Gabe Lerner (gabelerner@gmail.com)
 * MIT Licensed 
 */
 
(function(){
	// canvg(target, s)
	// target: canvas element or the id of a canvas element
	// s: svg string or url to svg file
	this.canvg = function (target, s) {
		if (typeof target == 'string') {
			target = document.getElementById(target);
		}
		
		// reuse class per canvas
		var svg;
		if (target.svg == null) {
			svg = build();
			target.svg = svg;
		}
		else {
			svg = target.svg;
			svg.stop();
		}
		
		if (s.substr(0,1) == '<') {
			// load from xml string
			svg.loadXml(target.getContext('2d'), s);
		}
		else {
			// load from url
			svg.load(target.getContext('2d'), s);
		}
	}

	function build() {
		var svg = {};
		
		svg.FRAMERATE = 30;
		
		svg.context = []; // keep track of stack of styles/attributes while rendering
		
		svg.trim = function(s) { return s.replace(/^\s+|\s+$/, ''); };
		
		// ajax
		svg.ajax = function(url) {
			var AJAX;
			if(window.XMLHttpRequest){AJAX=new XMLHttpRequest();}
			else{AJAX=new ActiveXObject('Microsoft.XMLHTTP');}
			if(AJAX){
			   AJAX.open('GET',url,false);
			   AJAX.send(null);
			   return AJAX.responseText;
			}
			return null;
		} 
		
		// parse xml
		svg.parseXml = function(xml) {
			if (window.DOMParser)
			{
				var parser = new DOMParser();
				return parser.parseFromString(xml, 'text/xml');
			}
			else 
			{
				var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
				xmlDoc.async = 'false';
				xmlDoc.loadXML(xml); 
				return xmlDoc;
			}		
		}
		
		// definitions table
		svg.Definitions = [];
		
		// property helpers
		svg.PropertySource = new (function() {
			this.New = 1;
			this.Element = 2;
			this.Context = 3;
		});
		
		svg.Property = function(name, value) {
			this.name = name;
			this.value = value;
			this.source = svg.PropertySource.New;
			
			this.hasValue = function() {
				return (this.value != null && this.value != '');
			}
			
			// augment the current color value with the opacity
			this.addOpacity = function(opacity) {
				var newValue = this.value;
				if (opacity != null && opacity != '') {
					var color = new RGBColor(this.value);
					if (color.ok) {
						newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
					}
				}
				return new svg.Property(this.name, newValue);
			}
			
			this.hasDefinition = function() {
				return (this.value.indexOf('url(') == 0);
			}
			
			// get the definition from the definitions table
			this.getDefinition = function() {
				if (this.hasDefinition()) {
					var name = this.value.replace('url(#','').replace(')','');
					return svg.Definitions[name];
				}
				return null;
			}
			
			// is it a scale value?
			this.isNumValueRelative = function() {
				var type = svg.Unit.getType(this.value);
				return (type == svg.Unit.Type.Decimal || type == svg.Unit.Type.Percent);
			}
			
			// return the numerical value of the property
			this.numValue = function() {
				if (!this.hasValue()) return 0;
				
				var type = svg.Unit.getType(this.value);
				if (type == svg.Unit.Type.Decimal) {
					return parseFloat(this.value);
				}
				else {
					var n = parseInt(this.value, 10);
					if (type == svg.Unit.Type.Percent) {
						n = n / 100.0;
					}
					return n;
				}
			}
		}
		
		svg.Unit = new (function() {
			this.Type = {};
			this.Type.Number = 1;
			this.Type.Decimal = 2;
			this.Type.Percent = 3;
			
			this.getType = function(s) {
				if (typeof(s) == 'number') return this.Type.Number;
				if (s.substr(0,1) == '.') return this.Type.Decimal;
				if (s.indexOf('%') != -1) return this.Type.Percent;
				return this.Type.Number;
			}
		});
		
		// points and paths
		svg.Point = function(x, y) {
			this.x = x;
			this.y = y;
		}
		svg.CreatePoint = function(s) {
			return new svg.Point(parseInt(s.split(',')[0], 10), parseInt(s.split(',')[1], 10));
		}
		svg.CreatePath = function(s) {
			var hasCommas = (s.indexOf(',') > -1);
			var path = [];
			var points = s.split(' ');
			for (var i=0; i<points.length; i++) {
				if (hasCommas) {
					path.push(svg.CreatePoint(points[i]));
				}
				else {
					path.push(svg.CreatePoint(points[i] + ',' + points[i+1]));
					i++;
				}
			}
			return path;
		}
		
		// transforms
		svg.Transform = function(v) {
			this.Type = {}
		
			// translate
			this.Type.translate = function(s) {
				this.x = parseInt(s.split(' ')[0], 10);
				this.y = parseInt(s.split(' ')[1], 10);
				
				this.apply = function(ctx) {
					ctx.translate(this.x, this.y);
				}
			}
			
			// rotate
			this.Type.rotate = function(s) {
				this.angle = parseInt(s, 10);
				
				this.apply = function(ctx) {
					ctx.rotate(this.angle * (Math.PI / 180.0));
				}
			}
			
			this.transforms = [];
			this.apply = function(ctx) {
				for (var i=0; i<this.transforms.length; i++) {
					this.transforms[i].apply(ctx);
				}
			}
			
			// ex: transform(200, 4) rotate(-30)
			var data = v.split(/\s(?=[a-z])/);
			for (var i=0; i<data.length; i++) {
				var type = data[i].split('(')[0];
				var s = data[i].split('(')[1].replace(')','');
				var transform = eval('new this.Type.' + type + '(s)');
				this.transforms.push(transform);
			}
		}

		// elements
		svg.Element = {}
		
		svg.Element.ElementBase = function(node) {	
			// get or create attribute
			this.attributes = {};
			this.attribute = function(name, createIfNotExists) {
				var a = this.attributes[name];
				if (a != null) {
					a.source = svg.PropertySource.Element;
					return a;
				}
				
				a = this.context(name);
				if (a != null && a.hasValue()) {
					a.source = svg.PropertySource.Context;
					return a;
				}
				
				a = new svg.Property(name, '');
				if (createIfNotExists == true) this.attributes[name] = a;
				return a;
			}
			
			// get or create style
			this.styles = {};
			this.style = function(name, createIfNotExists) {
				var s = this.styles[name];
				if (s != null) {
					s.source = svg.PropertySource.Element;
					return s;
				}
				
				var a = this.attribute(name);
				if (a != null && a.hasValue()) {
					return a;
				}
					
				s = new svg.Property(name, '');
				if (createIfNotExists == true) this.styles[name] = s;
				return s;
			}
			
			// look up in context stack (see svg.Element.g implementation)
			this.context = function(name) {
				for (var i=svg.context.length-1; i>=0; i--) {
					if (svg.context[i][name] != null) {
						return svg.context[i][name];
					}
				}
				return null;
			}
			
			// base render 
			this.render = function(ctx) {
				this.renderChildren(ctx);
			}
			
			this.children = [];
			this.renderChildren = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					var child = this.children[i];
				
					ctx.save();
					
					// fill
					if (child.style('fill').hasDefinition()) {
						ctx.fillStyle = child.style('fill').getDefinition().createGradient(ctx, child);
					}
					else {
						var fillStyle = child.style('fill');
						if (child.style('opacity').hasValue()) fillStyle = fillStyle.addOpacity(child.style('opacity').value);
						if (child.style('fill-opacity').hasValue()) fillStyle = fillStyle.addOpacity(child.style('fill-opacity').value);
						ctx.fillStyle = (fillStyle.value == 'none' ? '' : fillStyle.value);
					}
										
					// stroke
					var strokeStyle = child.style('stroke');
					if (child.style('opacity').hasValue()) strokeStyle = strokeStyle.addOpacity(child.style('opacity').value);
					if (child.style('stroke-opacity').hasValue()) strokeStyle = strokeStyle.addOpacity(child.style('stroke-opacity').value);
					ctx.strokeStyle = strokeStyle.value;
					ctx.lineWidth = child.style('stroke-width').value;

					// transform
					if (child.attribute('transform').hasValue()) { 
						if (child.attribute('transform').source == svg.PropertySource.Element) { // don't take transforms from context
							var transform = new svg.Transform(child.attribute('transform').value);
							transform.apply(ctx);
						}
					}
					
					// clip
					if (child.attribute('clip-path').hasValue()) {
						var clip = child.attribute('clip-path').getDefinition();
						clip.apply(ctx);
					}
					
					child.render(ctx);
					ctx.restore();
				}
			}
			
			if (node != null) {
				// add children
				for (var i=0; i<node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					if (childNode.nodeType == 1) { //ELEMENT_NODE
						var child = svg.CreateElement(childNode);
						child.parent = this;
						this.children.push(child);
					}
				}
				
				// add attributes
				for (var i=0; i<node.attributes.length; i++) {
					var attribute = node.attributes[i];
					this.attributes[attribute.nodeName] = new svg.Property(attribute.nodeName, attribute.nodeValue);
				}
				
				// add styles
				if (this.attribute('style').hasValue()) {
					var styles = this.attribute('style').value.split(';');
					for (var i=0; i<styles.length; i++) {
						var style = styles[i].split(':');
						var name = svg.trim(style[0]);
						var value = svg.trim(style[1]);
						this.styles[name] = new svg.Property(name, value);
					}
				}
			}
						
			this.currentX = function() { 
				if (this.attribute('rx').hasValue()) return this.attribute('cx').numValue() - this.attribute('rx').numValue();
				if (this.attribute('r').hasValue()) return this.attribute('cx').numValue() - this.attribute('r').numValue();
				if (this.attribute('x1').hasValue()) return this.attribute('x1').numValue();
				if (this.attribute('x').hasValue()) return this.attribute('x').numValue();
			}
			
			this.currentY = function() { 
				if (this.attribute('ry').hasValue()) return this.attribute('cy').numValue() - this.attribute('ry').numValue();
				if (this.attribute('r').hasValue()) return this.attribute('cy').numValue() - this.attribute('r').numValue();
				if (this.attribute('y1').hasValue()) return this.attribute('y1').numValue();
				if (this.attribute('y').hasValue()) return this.attribute('y').numValue();
			}
			
			this.currentWidth = function() {
				if (this.attribute('rx').hasValue()) return 2 * this.attribute('rx').numValue();
				if (this.attribute('r').hasValue()) return 2 * this.attribute('r').numValue();
				if (this.attribute('x2').hasValue()) return this.attribute('x2').numValue() - this.attribute('x1').numValue();
				if (this.attribute('width').hasValue()) return this.attribute('width').numValue();
			}
			
			this.currentHeight = function() {
				if (this.attribute('ry').hasValue()) return 2 * this.attribute('ry').numValue();
				if (this.attribute('r').hasValue()) return 2 * this.attribute('r').numValue();
				if (this.attribute('y2').hasValue()) return this.attribute('y2').numValue() - this.attribute('y1').numValue();
				if (this.attribute('height').hasValue()) return this.attribute('height').numValue();
			}
		}
		
		// svg element
		svg.Element.svg = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.baseRender = this.render;
			this.render = function(ctx) {
				ctx.save();
				if (this.attribute('viewBox').hasValue()) {
					var viewBox = this.attribute('viewBox').value.split(' ');
					ctx.translate(-parseInt(viewBox[0], 10), -parseInt(viewBox[1], 10));
				}
				this.baseRender(ctx);
				ctx.restore();
			}
		}
		svg.Element.svg.prototype = new svg.Element.ElementBase;

		// rect element
		svg.Element.rect = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				var x = this.attribute('x').numValue();
				var y = this.attribute('y').numValue();
				var w = this.attribute('width').numValue();
				var h = this.attribute('height').numValue();
			
				if (ctx.fillStyle != '') ctx.fillRect(x, y, w, h);
				if (ctx.strokeStyle != '') ctx.strokeRect(x, y, w, h);
			}
		}
		svg.Element.rect.prototype = new svg.Element.ElementBase;
		
		// circle element
		svg.Element.circle = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.fillStyle != '') ctx.fill();
				if (ctx.strokeStyle != '') ctx.stroke();
			}
			
			this.path = function(ctx) {
				var cx = this.attribute('cx').numValue();
				var cy = this.attribute('cy').numValue();
				var r = this.attribute('r').numValue();
			
				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, Math.PI * 2, true); 
				ctx.closePath();			
			}
		}
		svg.Element.circle.prototype = new svg.Element.ElementBase;	

		// ellipse element
		svg.Element.ellipse = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.fillStyle != '') ctx.fill();
				if (ctx.strokeStyle != '') ctx.stroke();
			}
			
			this.path = function(ctx) {
				var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
				var rx = this.attribute('rx').numValue();
				var ry = this.attribute('ry').numValue();
				var cx = this.attribute('cx').numValue();
				var cy = this.attribute('cy').numValue();
				var r = this.attribute('r').numValue();
				
				ctx.beginPath();
				ctx.moveTo(cx, cy - ry);
				ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
				ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
				ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
				ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
				ctx.closePath();
			}
		}
		svg.Element.ellipse.prototype = new svg.Element.ElementBase;			
		
		// line element
		svg.Element.line = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.strokeStyle != '') ctx.stroke();
			}
			
			this.path = function(ctx) {
				var x1 = this.attribute('x1').numValue();
				var y1 = this.attribute('y1').numValue();
				var x2 = this.attribute('x2').numValue();
				var y2 = this.attribute('y2').numValue();
				
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.closePath();
			}
		}
		svg.Element.line.prototype = new svg.Element.ElementBase;		
				
		// polygon element
		svg.Element.polygon = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.fillStyle != '') ctx.fill();
				if (ctx.strokeStyle != '') ctx.stroke();
			}
			
			this.path = function(ctx) {
				var path = svg.CreatePath(this.attribute('points').value);		
				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				for (var i=1; i<path.length; i++) {
					ctx.lineTo(path[i].x, path[i].y);
				}
				ctx.lineTo(path[0].x, path[0].y);
				ctx.closePath();
			}
		}
		svg.Element.polygon.prototype = new svg.Element.ElementBase;

		// polyline element
		svg.Element.polyline = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.strokeStyle != '') ctx.stroke();
			}
			
			this.path = function(ctx) {
				var path = svg.CreatePath(this.attribute('points').value);

				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				for (var i=1; i<path.length; i++) {
					ctx.lineTo(path[i].x, path[i].y);
				}
			}
		}
		svg.Element.polyline.prototype = new svg.Element.ElementBase;

		// path element
		svg.Element.path = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				this.path(ctx);
				if (ctx.fillStyle == '' && ctx.strokeStyle == '') ctx.fillStyle = '#000000';
				if (ctx.fillStyle != '') ctx.fill();
				if (ctx.strokeStyle != '') ctx.stroke();		
			}
			
			this.path = function(ctx) {
				var d = this.attribute('d').value;
				
				// standardize formatting
				d = d.replace(/,/g,' ');
				d = d.replace(/([A-Z])\s/g,'$1');
				d = d.replace(/[\s\r\n]+/g,' ');
				
				// maintain last x,y
				var cpx = 0;
				var cpy = 0;
				
				ctx.beginPath();
				var instructions = d.split(' ');
				for (var i=0; i<instructions.length; i++) {
					if (instructions[i].substr(0, 1) == 'M') {
						cpx = parseInt(instructions[i].replace('M', ''), 10);
						cpy = parseInt(instructions[i+1], 10);
						ctx.moveTo(cpx, cpy);
						i = i + 1;
					}
					else if (instructions[i].substr(0, 1) == 'L') {
						cpx = parseInt(instructions[i].replace('L', ''), 10);
						cpy = parseInt(instructions[i+1], 10);
						ctx.lineTo(cpx, cpy);
						i = i + 1;
					}
					else if (instructions[i].substr(0, 1) == 'H') {
						cpx = parseInt(instructions[i].replace('H', ''), 10);
						ctx.lineTo(cpx, cpy);
					}
					else if (instructions[i].substr(0, 1) == 'V') {
						cpy = parseInt(instructions[i].replace('V', ''), 10);
						ctx.lineTo(cpx, cpy);
					}
					else if (instructions[i].substr(0, 1) == 'Q') {
						var x1 = parseInt(instructions[i].replace('Q', ''), 10);
						var y1 = parseInt(instructions[i+1], 10);
						cpx = parseInt(instructions[i+2], 10);
						cpy = parseInt(instructions[i+3], 10);
						ctx.quadraticCurveTo(x1, y1, cpx, cpy);
						i = i + 3;
					}					
					else if (instructions[i].substr(0, 1) == 'C') {
						var x1 = parseInt(instructions[i].replace('C', ''), 10);
						var y1 = parseInt(instructions[i+1], 10);
						var x2 = parseInt(instructions[i+2], 10);
						var y2 = parseInt(instructions[i+3], 10);
						cpx = parseInt(instructions[i+4], 10);
						cpy = parseInt(instructions[i+5], 10);
						ctx.bezierCurveTo(x1, y1, x2, y2, cpx, cpy);
						i = i + 5;
					}
					else if (instructions[i].substr(0, 1) == 'Z') {
						ctx.closePath();
					}
				}
			}
		}
		svg.Element.path.prototype = new svg.Element.ElementBase;
		
		// definitions element
		svg.Element.defs = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				svg.Definitions[child.attribute('id').value] = child;
			}			

			this.render = function() {
				// NOOP
			}
		}
		svg.Element.defs.prototype = new svg.Element.ElementBase;
		
		// base for gradients
		svg.Element.GradientBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.stops = [];			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				this.stops.push(child);
			}		

			this.createGradient = function(ctx, element) {
				var g = this.getGradient(ctx, element);
				for (var i=0; i<this.stops.length; i++) {
					g.addColorStop(this.stops[i].offset, this.stops[i].color);
				}
				return g;				
			}
		}
		
		// linear gradient element
		svg.Element.linearGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);
			
			this.getGradient = function(ctx, element) {
				var x = element.currentX();
				var y = element.currentY();
				var w = element.currentWidth();
				var h = element.currentHeight();
				
				var x1 = this.attribute('x1').isNumValueRelative() ? x + w * this.attribute('x1').numValue() : this.attribute('x1').numValue();
				var y1 = this.attribute('y1').isNumValueRelative() ? y + h * this.attribute('y1').numValue() : this.attribute('y1').numValue();
				var x2 = this.attribute('x2').isNumValueRelative() ? x + w * this.attribute('x2').numValue() : this.attribute('x2').numValue();
				var y2 = this.attribute('y2').isNumValueRelative() ? y + h * this.attribute('y2').numValue() : this.attribute('y2').numValue();
				
				return ctx.createLinearGradient(x1, y1, x2, y2);
			}
		}
		svg.Element.linearGradient.prototype = new svg.Element.GradientBase;
		
		// radial gradient element
		svg.Element.radialGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);
			
			this.getGradient = function(ctx, element) {
				var x = element.currentX();
				var y = element.currentY();
				var w = element.currentWidth();
				var h = element.currentHeight();
				
				var cx = this.attribute('cx').isNumValueRelative() ? x + w * this.attribute('cx').numValue() : this.attribute('cx').numValue();
				var cy = this.attribute('cy').isNumValueRelative() ? y + h * this.attribute('cy').numValue() : this.attribute('cy').numValue();
				
				var fx = cx;
				var fy = cy;
				if (this.attribute('fx').hasValue()) fx = this.attribute('fx').isNumValueRelative() ? x + w * this.attribute('fx').numValue() : this.attribute('fx').numValue();
				if (this.attribute('fy').hasValue()) fy = this.attribute('fy').isNumValueRelative() ? y + h * this.attribute('fy').numValue() : this.attribute('fy').numValue();
				
				var r = this.attribute('r').isNumValueRelative() ? (w + h) / 2.0 * this.attribute('r').numValue() : this.attribute('r').numValue();
				
				return ctx.createRadialGradient(fx, fy, 0, cx, cy, r);
			}
		}
		svg.Element.radialGradient.prototype = new svg.Element.GradientBase;
		
		// gradient stop element
		svg.Element.stop = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.offset = this.attribute('offset').numValue();
			
			var stopColor = this.style('stop-color');
			if (this.style('stop-opacity').hasValue()) stopColor = stopColor.addOpacity(this.style('stop-opacity').value);
			this.color = stopColor.value;
		}
		svg.Element.stop.prototype = new svg.Element.ElementBase;
		
		// animation base element
		svg.Element.AnimateBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.duration = 0.0;
			this.begin = this.attribute('begin').numValue() * 1000.0;
			this.maxDuration = maxDuration = this.attribute('dur').numValue() * 1000.0;
			
			// set current duration, call next tick
			this.next = function() {
				var that = this;
				this.duration = this.duration + 1000.0 / svg.FRAMERATE;
				setTimeout(function() { that.tick(); }, 1000.0 / svg.FRAMERATE);
			}		
			
			this.tick = function() {	
				if (!this.calcValue) return;
			
				// if we're past the begin time
				if (this.begin < this.duration) {
					var newValue = this.calcValue(); // tween
					var attributeType = this.attribute('attributeType').value;
					var attributeName = this.attribute('attributeName').value;
					
					if (attributeType == 'CSS') {
						this.parent.style(attributeName, true).value = newValue;
					}
					else if (attributeType == 'XML') { 
						if (this.attribute('type').hasValue()) {
							// for transform, etc.
							var type = this.attribute('type').value;
							this.parent.attribute(attributeName, true).value = type + '(' + newValue + ')';
						}
						else {
							this.parent.attribute(attributeName, true).value = newValue;
						}
					}
				}

				// if we're past the end time
				if (this.duration > this.maxDuration) {
					// loop for indefinitely repeating animations
					if (this.attribute('repeatCount').value == 'indefinite') {
						this.duration = 0.0
						this.next();
					}
				}
				else {
					this.next();
				}
			}
			
			// fraction of duration we've covered
			this.progress = function() {
				return ((this.duration - this.begin) / (this.maxDuration - this.begin));
			}
			
			this.next();			
		}
		svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;
		
		// animate element
		svg.Element.animate = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);
			
			this.calcValue = function() {
				var from = parseInt(this.attribute('from').value, 10);
				var to = parseInt(this.attribute('to').value, 10);
				
				// tween value linearly
				return from + (to - from) * this.progress(); 
			};
		}
		svg.Element.animate.prototype = new svg.Element.AnimateBase;
			
		// animate color element
		svg.Element.animateColor = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);

			this.calcValue = function() {
				var from = new RGBColor(this.attribute('from').value);
				var to = new RGBColor(this.attribute('to').value);
				
				if (from.ok && to.ok) {
					// tween color linearly
					var r = from.r + (to.r - from.r) * this.progress();
					var g = from.g + (to.g - from.g) * this.progress();
					var b = from.b + (to.b - from.b) * this.progress();
					return 'rgb('+parseInt(r,10)+','+parseInt(g,10)+','+parseInt(b,10)+')';
				}
				return this.attribute('from').value;
			};
		}
		svg.Element.animateColor.prototype = new svg.Element.AnimateBase;
		
		// animate transform element
		svg.Element.animateTransform = function(node) {
			this.base = svg.Element.animate;
			this.base(node);
		}
		svg.Element.animateTransform.prototype = new svg.Element.animate;
		
		// text element
		svg.Element.text = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			// accumulate all the child text nodes, then trim them
			this.text = '';
			for (var i=0; i<node.childNodes.length; i++) {
				if (node.childNodes[i].nodeType == 3) { // TEXT
					this.text = this.text + node.childNodes[i].nodeValue;
				}
			}
			this.text = this.text.trim();
			
			this.render = function(ctx) {
				var x = this.attribute('x').numValue();
				var y = this.attribute('y').numValue();
				
				fontFamily = 'Arial'; // default font
				if (this.style('font-family').hasValue()) fontFamily = this.style('font-family').value;
				
				fontSize = '12px'; // default size
				if (this.style('font-size').hasValue()) fontSize = this.style('font-size').value;
				
				ctx.font = fontSize + ' ' + fontFamily;
				ctx.textBaseline = 'top';
				ctx.fillText(this.text, 0, 0);
			}
		}
		svg.Element.text.prototype = new svg.Element.ElementBase;
		
		// group element
		svg.Element.g = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				svg.context.push(this.attributes); // add my attributes to the stack
				this.renderChildren(ctx);
				svg.context.pop();		
			}
		}
		svg.Element.g.prototype = new svg.Element.ElementBase;
		
		// use element 
		svg.Element.use = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				svg.context.push(this.attributes); // add my attributes to the stack
				var element = svg.Definitions[this.attribute('xlink:href').value.replace('#','')];
				ctx.save();
				element.render(ctx);
				ctx.restore();
				svg.context.pop();
			}
		}
		svg.Element.use.prototype = new svg.Element.ElementBase;
		
		// clip element
		svg.Element.clipPath = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.apply = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					this.children[i].path(ctx);
					ctx.clip();
				}
			}
		}
		svg.Element.clipPath.prototype = new svg.Element.ElementBase;
		
		// element factory
		svg.CreateElement = function(node) {
			var className = 'svg.Element.' + node.nodeName;
			if (!eval(className)) {
				alert('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
				return null;
			}
		
			var e = eval('new ' + className + '(node)');
			e.type = node.nodeName;
			return e;
		}
				
		// load from url
		svg.load = function(ctx, url) {
			svg.loadXml(ctx, svg.ajax(url));
		}
		
		// load from xml
		svg.loadXml = function(ctx, xml) {
			var dom = svg.parseXml(xml);
			var e = svg.CreateElement(dom.documentElement);
			
			// render loop
			svg.intervalID = setInterval(function() { 
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				e.render(ctx);
			}, 1000 / svg.FRAMERATE);
		}
		
		svg.stop = function() {
			if (svg.intervalID) {
				clearInterval(svg.intervalID);
			}
		}
		
		return svg;
	}
})();