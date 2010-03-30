/*
 * canvg.js - Javascript SVG parser and renderer on Canvas
 * MIT Licensed 
 * Gabe Lerner (gabelerner@gmail.com)
 * http://code.google.com/p/canvg/
 *
 * Requires: rgbcolor.js - http://www.phpied.com/rgb-color-parser-in-javascript/
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
		
		var ctx = target.getContext('2d');
		if (s.substr(0,1) == '<') {
			// load from xml string
			svg.loadXml(ctx, s);
		}
		else {
			// load from url
			svg.load(ctx, s);
		}
	}

	function build() {
		var svg = {};
		
		svg.FRAMERATE = 30;
		
		// globals
		svg.init = function() {
			svg.neverRendered = true;
			svg.context = []; // keep track of stack of styles/attributes while rendering
			svg.Definitions = {};
			svg.Styles = {};
			svg.Animations = [];
		}
		svg.init();

		// trim
		svg.trim = function(s) { return s.replace(/^\s+|\s+$/g, ''); }
		
		// compress spaces
		svg.compressSpaces = function(s) { return s.replace(/[\s\r\t\n]+/gm,' '); }
		
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
							
			// return the numerical value of the property
			this.numValue = function() {
				if (!this.hasValue()) return 0;
				
				var n = parseFloat(this.value);
				if ((this.value + '').match(/%$/)) {
					n = n / 100.0;
				}
				return n;
			}
			
			this.valueOrDefault = function(def) {
				if (this.hasValue()) return this.value;
				return def;
			}
			
			this.numValueOrDefault = function(def) {
				if (this.hasValue()) return this.numValue();
				return def;
			}
			
			/* EXTENSIONS */
			var that = this;
			
			// color extensions
			this.Color = {
				// augment the current color value with the opacity
				addOpacity: function(opacity) {
					var newValue = that.value;
					if (opacity != null && opacity != '') {
						var color = new RGBColor(that.value);
						if (color.ok) {
							newValue = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
						}
					}
					return new svg.Property(that.name, newValue);
				}
			}
			
			// definition extensions
			this.Definition = {
				hasDefinition: function() {
					return (that.value.indexOf('url(') == 0);
				},

				// get the definition from the definitions table
				getDefinition: function() {
					if (that.Definition.hasDefinition()) {
						var name = that.value.replace('url(#','').replace(')','');
						return svg.Definitions[name];
					}
					return null;
				}	
			}
			
			// length extensions
			this.Length = {
				DPI: function(viewPort) {
					return 96.0; // TODO: compute?
				},
				
				EM: function(viewPort) {
					var em = 12;
					
					var name = 'font-size';
					for (var i=svg.context.length-1; i>=0; i--) {
						if (svg.context[i] != null && svg.context[i][name] != null) {
							em = svg.context[i][name].Length.toPixels(viewPort);
						}
					}
					
					return em;
				},
			
				// get the length as pixels
				toPixels: function(viewPort) {
					if (!that.hasValue()) return 0;
					var s = that.value+'';
					if (s.match(/em$/)) return that.numValue() * this.EM(viewPort);
					if (s.match(/ex$/)) return that.numValue() * this.EM(viewPort) / 2.0;
					if (s.match(/px$/)) return that.numValue();
					if (s.match(/pt$/)) return that.numValue() * 1.25;
					if (s.match(/pc$/)) return that.numValue() * 15;
					if (s.match(/cm$/)) return that.numValue() * this.DPI(viewPort) / 2.54;
					if (s.match(/mm$/)) return that.numValue() * this.DPI(viewPort) / 25.4;
					if (s.match(/in$/)) return that.numValue() * this.DPI(viewPort);
					if (s.match(/%$/)) return that.numValue() * svg.getViewPortSize(viewPort);
					return that.numValue();
				}
			}
			
			// time extensions
			this.Time = {
				// get the time as milliseconds
				toMilliseconds: function() {
					if (!that.hasValue()) return 0;
					if (that.value.match(/s$/)) return that.numValue() * 1000;
					if (that.value.match(/ms$/)) return that.numValue();
					return that.numValue();
				}
			}
			
			// angle extensions
			this.Angle = {
				// get the angle as radians
				toRadians: function() {
					if (!that.hasValue()) return 0;
					if (that.value.match(/deg$/)) return that.numValue() * (Math.PI / 180.0);
					if (that.value.match(/grad$/)) return that.numValue() * (Math.PI / 200.0);
					if (that.value.match(/rad$/)) return that.numValue();
					return that.numValue() * (Math.PI / 180.0);
				}
			}
		}
		
		// points and paths
		svg.Point = function(x, y) {
			this.x = x;
			this.y = y;
		}
		svg.CreatePoint = function(s) {
			s = svg.trim(svg.compressSpaces(s.replace(',', ' ')));
			return new svg.Point(parseFloat(s.split(' ')[0]), parseFloat(s.split(' ')[1]));
		}
		svg.CreatePath = function(s) {
			var hasCommas = (s.indexOf(',') > -1);
			var path = [];
			var points = svg.compressSpaces(s).split(' ');
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
				this.p = svg.CreatePoint(s);			
				this.apply = function(ctx) {
					ctx.translate(this.p.x || 0.0, this.p.y || 0.0);
				}
			}
			
			// rotate
			this.Type.rotate = function(s) {
				this.angle = new svg.Property('angle', s);
				this.apply = function(ctx) {
					ctx.rotate(this.angle.Angle.toRadians());
				}
			}
			
			this.Type.scale = function(s) {
				this.p = svg.CreatePoint(s);
				this.apply = function(ctx) {
					ctx.scale(this.p.x || 1.0, this.p.y || this.p.x || 1.0);
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
			this.attributes = {};
			this.styles = {};
			this.children = [];
			
			// get or create attribute
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
			
			// look up in context stack (used by: 'g' and 'use' elements, 'class' attribute)
			this.context = function(name) {
				for (var i=svg.context.length-1; i>=0; i--) {
					if (svg.context[i] != null && svg.context[i][name] != null) {
						return svg.context[i][name];
					}
				}
				return null;
			}
			
			// base render
			this.render = function(ctx) {
				// OVERRIDE ME!
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
						if (svg.trim(styles[i]) != '') {
							var style = styles[i].split(':');
							var name = svg.trim(style[0]);
							var value = svg.trim(style[1]);
							this.styles[name] = new svg.Property(name, value);
						}
					}
				}
			}
		}
		
		svg.Element.RenderedElementBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			// base render 
			this.render = function(ctx) {
				this.renderChildren(ctx);
			}			
		
			this.renderChildren = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					var child = this.children[i];
				
					// apply class styles
					var stylesPushed = 0;
					if (child.attribute('class').hasValue()) {
						var classes = child.attribute('class').value.split(' ');
						for (var j=0; j<classes.length; j++) {
							var styles = svg.Styles['.'+svg.trim(classes[j])];
							if (styles != null) {
								svg.context.push(styles);
								stylesPushed++;
							}
						}
					}
					
					// apply tag styles
					var tagStyles = svg.Styles[child.type];
					if (tagStyles != null) {
						svg.context.push(tagStyles);
						stylesPushed++;
					}
					
					ctx.save();
					
					// fill
					if (child.style('fill').Definition.hasDefinition()) {
						var grad = child.style('fill').Definition.getDefinition();
						if (grad != null && grad.createGradient) {
							ctx.fillStyle = grad.createGradient(ctx, child);
						}
					}
					else {
						var fillStyle = child.style('fill');
						if (child.style('opacity').hasValue()) fillStyle = fillStyle.Color.addOpacity(child.style('opacity').value);
						if (child.style('fill-opacity').hasValue()) fillStyle = fillStyle.Color.addOpacity(child.style('fill-opacity').value);
						ctx.fillStyle = (fillStyle.value == 'none' ? '' : fillStyle.value);
					}
										
					// stroke
					var strokeStyle = child.style('stroke');
					if (child.style('opacity').hasValue()) strokeStyle = strokeStyle.Color.addOpacity(child.style('opacity').value);
					if (child.style('stroke-opacity').hasValue()) strokeStyle = strokeStyle.Color.addOpacity(child.style('stroke-opacity').value);
					ctx.strokeStyle = strokeStyle.value;
					ctx.lineWidth = child.style('stroke-width').Length.toPixels();
					ctx.lineCap = child.style('stroke-linecap').valueOrDefault('butt');
					ctx.lineJoin = child.style('stroke-join').valueOrDefault('miter');
					ctx.miterLimit = child.style('stroke-miterlimit').numValueOrDefault(4);

					// transform
					if (child.attribute('transform').hasValue()) { 
						if (child.attribute('transform').source == svg.PropertySource.Element) { // don't take transforms from context
							var transform = new svg.Transform(child.attribute('transform').value);
							transform.apply(ctx);
						}
					}
					
					// clip
					if (child.attribute('clip-path').hasValue()) {
						var clip = child.attribute('clip-path').Definition.getDefinition();
						if (clip != null) clip.apply(ctx);
					}
					
					child.render(ctx);
					ctx.restore();
					while (stylesPushed--) svg.context.pop();
				}
			}

			this.currentX = function() { 
				if (this.attribute('rx').hasValue()) return this.attribute('cx').Length.toPixels('x') - this.attribute('rx').Length.toPixels('x');
				if (this.attribute('r').hasValue()) return this.attribute('cx').Length.toPixels('x') - this.attribute('r').Length.toPixels();
				if (this.attribute('x1').hasValue()) return this.attribute('x1').Length.toPixels('x');
				if (this.attribute('x').hasValue()) return this.attribute('x').Length.toPixels('x');
			}
			
			this.currentY = function() { 
				if (this.attribute('ry').hasValue()) return this.attribute('cy').Length.toPixels('y') - this.attribute('ry').Length.toPixels('y');
				if (this.attribute('r').hasValue()) return this.attribute('cy').Length.toPixels('y') - this.attribute('r').Length.toPixels();
				if (this.attribute('y1').hasValue()) return this.attribute('y1').Length.toPixels('y');
				if (this.attribute('y').hasValue()) return this.attribute('y').Length.toPixels('y');
			}
			
			this.currentWidth = function() {
				if (this.attribute('rx').hasValue()) return 2 * this.attribute('rx').Length.toPixels('x');
				if (this.attribute('r').hasValue()) return 2 * this.attribute('r').Length.toPixels();
				if (this.attribute('x2').hasValue()) return this.attribute('x2').Length.toPixels('x') - this.attribute('x1').Length.toPixels('x');
				if (this.attribute('width').hasValue()) return this.attribute('width').Length.toPixels('x');
			}
			
			this.currentHeight = function() {
				if (this.attribute('ry').hasValue()) return 2 * this.attribute('ry').Length.toPixels('y');
				if (this.attribute('r').hasValue()) return 2 * this.attribute('r').Length.toPixels();
				if (this.attribute('y2').hasValue()) return this.attribute('y2').Length.toPixels('y') - this.attribute('y1').Length.toPixels('y');
				if (this.attribute('height').hasValue()) return this.attribute('height').Length.toPixels('y');
			}			
		}
		svg.Element.RenderedElementBase.prototype = new svg.Element.ElementBase;
		
		svg.Element.PathElementBase = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.path = function() {
				// OVERRIDE ME!
			}
			
			this.render = function(ctx) {
				ctx.save();
				ctx.beginPath();
				this.path(ctx);
				if (ctx.fillStyle == '' && ctx.strokeStyle == '') ctx.fillStyle = '#000000';
				if (ctx.fillStyle != '') ctx.fill();
				if (ctx.strokeStyle != '') ctx.stroke();	
				ctx.restore();
			}
		}
		svg.Element.PathElementBase.prototype = new svg.Element.RenderedElementBase;
		
		// svg element
		svg.Element.svg = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.baseRender = this.render;
			this.render = function(ctx) {
				ctx.save();
				
				// default viewport
				svg.getViewPortSize = function(d) { return d; }
				
				// calculate view
				if (this.attribute('width').hasValue()) {
					ctx.canvas.width = this.attribute('width').Length.toPixels(ctx.canvas.parentNode.clientWidth);
				}
				if (this.attribute('height').hasValue()) {
					ctx.canvas.height = this.attribute('height').Length.toPixels(ctx.canvas.parentNode.clientHeight);
				}
				
				var width = ctx.canvas.clientWidth;
				var height = ctx.canvas.clientHeight
				if (this.attribute('viewBox').hasValue()) {
					var viewBox = this.attribute('viewBox').value.split(' ');
					var minX = parseFloat(viewBox[0]);
					var minY = parseFloat(viewBox[1]);
					width = parseFloat(viewBox[2]);
					height = parseFloat(viewBox[3]);
					
					ctx.scale(ctx.canvas.clientWidth / width, ctx.canvas.clientHeight / height);
					ctx.translate(-minX, -minY);
				}
				
				// custom viewport
				svg.getViewPortSize = function(d) {
					if (d != null && typeof(d) == 'number') return d;
					if (d == 'x') return width;
					if (d == 'y') return height;
					return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2);
				}
				
				this.baseRender(ctx);
				ctx.restore();
			}
		}
		svg.Element.svg.prototype = new svg.Element.RenderedElementBase;

		// rect element
		svg.Element.rect = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				var width = this.attribute('width').Length.toPixels('x');
				var height = this.attribute('height').Length.toPixels('y');
				var rx = this.attribute('rx').Length.toPixels('x');
				var ry = this.attribute('ry').Length.toPixels('y');
				if (this.attribute('rx').hasValue() && !this.attribute('ry').hasValue()) ry = rx;
				if (this.attribute('ry').hasValue() && !this.attribute('rx').hasValue()) rx = ry;
				
				ctx.moveTo(x + rx, y);
				ctx.lineTo(x + width - rx, y);
				ctx.quadraticCurveTo(x + width, y, x + width, y + ry)
				ctx.lineTo(x + width, y + height - ry);
				ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height)
				ctx.lineTo(x + rx, y + height);
				ctx.quadraticCurveTo(x, y + height, x, y + height - ry)
				ctx.lineTo(x, y + ry);
				ctx.quadraticCurveTo(x, y, x + rx, y)
				ctx.closePath();
			}
		}
		svg.Element.rect.prototype = new svg.Element.PathElementBase;
		
		// circle element
		svg.Element.circle = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var cx = this.attribute('cx').Length.toPixels('x');
				var cy = this.attribute('cy').Length.toPixels('y');
				var r = this.attribute('r').Length.toPixels();
			
				ctx.arc(cx, cy, r, 0, Math.PI * 2, true); 
				ctx.closePath();			
			}
		}
		svg.Element.circle.prototype = new svg.Element.PathElementBase;	

		// ellipse element
		svg.Element.ellipse = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.path = function(ctx) {
				var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);
				var rx = this.attribute('rx').Length.toPixels('x');
				var ry = this.attribute('ry').Length.toPixels('y');
				var cx = this.attribute('cx').Length.toPixels('x');
				var cy = this.attribute('cy').Length.toPixels('y');
				var r = this.attribute('r').Length.toPixels();
				
				ctx.moveTo(cx, cy - ry);
				ctx.bezierCurveTo(cx + (KAPPA * rx), cy - ry,  cx + rx, cy - (KAPPA * ry), cx + rx, cy);
				ctx.bezierCurveTo(cx + rx, cy + (KAPPA * ry), cx + (KAPPA * rx), cy + ry, cx, cy + ry);
				ctx.bezierCurveTo(cx - (KAPPA * rx), cy + ry, cx - rx, cy + (KAPPA * ry), cx - rx, cy);
				ctx.bezierCurveTo(cx - rx, cy - (KAPPA * ry), cx - (KAPPA * rx), cy - ry, cx, cy - ry);
				ctx.closePath();
			}
		}
		svg.Element.ellipse.prototype = new svg.Element.PathElementBase;			
		
		// line element
		svg.Element.line = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
						
			this.path = function(ctx) {
				var x1 = this.attribute('x1').Length.toPixels('x');
				var y1 = this.attribute('y1').Length.toPixels('y');
				var x2 = this.attribute('x2').Length.toPixels('x');
				var y2 = this.attribute('y2').Length.toPixels('y');
				
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
			}
		}
		svg.Element.line.prototype = new svg.Element.PathElementBase;		
				
		// polyline element
		svg.Element.polyline = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
			
			this.points = svg.CreatePath(this.attribute('points').value);
			this.path = function(ctx) {
				ctx.moveTo(this.points[0].x, this.points[0].y);
				for (var i=1; i<this.points.length; i++) {
					ctx.lineTo(this.points[i].x, this.points[i].y);
				}
			}
		}
		svg.Element.polyline.prototype = new svg.Element.PathElementBase;				
				
		// polygon element
		svg.Element.polygon = function(node) {
			this.base = svg.Element.polyline;
			this.base(node);
			
			this.basePath = this.path;
			this.path = function(ctx) {
				this.basePath(ctx);
				ctx.lineTo(this.points[0].x, this.points[0].y);
				ctx.closePath();
			}
		}
		svg.Element.polygon.prototype = new svg.Element.polyline;

		// path element
		svg.Element.path = function(node) {
			this.base = svg.Element.PathElementBase;
			this.base(node);
					
			var d = this.attribute('d').value;
			// TODO: floating points, convert to real lexer based on http://www.w3.org/TR/SVG11/paths.html#PathDataBNF
			d = d.replace(/,/gm,' '); // get rid of all commas
			d = d.replace(/([A-Za-z])([A-Za-z])/gm,'$1 $2'); // separate commands from commands
			d = d.replace(/([A-Za-z])([A-Za-z])/gm,'$1 $2'); // separate commands from commands
			d = d.replace(/([A-Za-z])([^\s])/gm,'$1 $2'); // separate commands from points
			d = d.replace(/([^\s])([A-Za-z])/gm,'$1 $2'); // separate commands from points
			d = d.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits when no comma
			d = d.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when no comma
			d = svg.compressSpaces(d); // compress multiple spaces
			d = svg.trim(d);
			this.PathParser = new (function(d) {
				this.tokens = d.split(' ');
				
				this.reset = function() {
					this.i = -1;
					this.command = '';
					this.control = new svg.Point(0, 0);
					this.current = new svg.Point(0, 0);
				}
				
				this.isEnd = function() {
					return this.i == this.tokens.length - 1;
				}
				
				this.isCommandOrEnd = function() {
					if (this.isEnd()) return true;
					return this.tokens[this.i + 1].match(/[A-Za-z]/) != null;
				}
				
				this.isRelativeCommand = function() {
					return this.command == this.command.toLowerCase();
				}
				
				this.getToken = function() {
					this.i = this.i + 1;
					return this.tokens[this.i];
				}
				
				this.getScalar = function() {
					return parseFloat(this.getToken());
				}
				
				this.nextCommand = function() {
					this.command = this.getToken();
				}				
				
				this.getPoint = function() {
					var p = new svg.Point(this.getScalar(), this.getScalar());
					return this.makeAbsolute(p);
				}
				
				this.getAsControlPoint = function() {
					var p = this.getPoint();
					this.control = p;
					return p;
				}
				
				this.getAsCurrentPoint = function() {
					var p = this.getPoint();
					this.current = p;
					return p;	
				}
				
				this.getReflectedControlPoint = function() {
					var p = new svg.Point(2 * this.current.x - this.control.x, 2 * this.current.y - this.control.y);					
					return this.makeAbsolute(p);
				}
				
				this.makeAbsolute = function(p) {
					if (this.isRelativeCommand()) {
						p.x = this.current.x + p.x;
						p.y = this.current.y + p.y;
					}
					return p;
				}
			})(d);
			
			this.path = function(ctx) {				
				var pp = this.PathParser;
				pp.reset();
				
				while (!pp.isEnd()) {
					pp.nextCommand();
					if (pp.command.toUpperCase() == 'M') {
						var p = pp.getAsCurrentPoint();
						ctx.moveTo(p.x, p.y);
						while (!pp.isCommandOrEnd()) {
							var p = pp.getAsCurrentPoint();
							ctx.lineTo(p.x, p.y);
						}
					}
					else if (pp.command.toUpperCase() == 'L') {
						while (!pp.isCommandOrEnd()) {
							var p = pp.getAsCurrentPoint();
							ctx.lineTo(p.x, p.y);
						}
					}
					else if (pp.command.toUpperCase() == 'H') {
						while (!pp.isCommandOrEnd()) {
							pp.current.x = pp.getScalar();
							ctx.lineTo(pp.current.x, pp.current.y);
						}
					}
					else if (pp.command.toUpperCase() == 'V') {
						while (!pp.isCommandOrEnd()) {
							pp.current.y = pp.getScalar();
							ctx.lineTo(pp.current.x, pp.current.y);
						}
					}
					else if (pp.command.toUpperCase() == 'C') {
						while (!pp.isCommandOrEnd()) {
							var p1 = pp.getPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}
					}
					else if (pp.command.toUpperCase() == 'S') {
						while (!pp.isCommandOrEnd()) {
							var p1 = pp.getReflectedControlPoint();
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							ctx.bezierCurveTo(p1.x, p1.y, cntrl.x, cntrl.y, cp.x, cp.y);
						}				
					}					
					else if (pp.command.toUpperCase() == 'Q') {
						while (!pp.isCommandOrEnd()) {
							var cntrl = pp.getAsControlPoint();
							var cp = pp.getAsCurrentPoint();
							ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}
					}					
					else if (pp.command.toUpperCase() == 'T') {
						while (!pp.isCommandOrEnd()) {
							var cntrl = pp.getReflectedControlPoint();
							pp.control = cntrl;
							var cp = pp.getAsCurrentPoint();
							ctx.quadraticCurveTo(cntrl.x, cntrl.y, cp.x, cp.y);
						}					
					}
					else if (pp.command.toUpperCase() == 'Z') {
						ctx.closePath();
					}
				}
			}
		}
		svg.Element.path.prototype = new svg.Element.PathElementBase;
		
		// definitions element
		svg.Element.defs = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				svg.Definitions[child.attribute('id').value] = child;
			}			
		}
		svg.Element.defs.prototype = new svg.Element.ElementBase;
		
		// base for gradients
		svg.Element.GradientBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.gradientUnits = this.attribute('gradientUnits').valueOrDefault('objectBoundingBox');
			
			this.stops = [];			
			for (var i=0; i<this.children.length; i++) {
				var child = this.children[i];
				this.stops.push(child);
			}	

			this.getGradient = function() {
				// OVERRIDE ME!
			}			

			this.createGradient = function(ctx, element) {
				var g = this.getGradient(ctx, element);
				for (var i=0; i<this.stops.length; i++) {
					g.addColorStop(this.stops[i].offset, this.stops[i].color);
				}
				return g;				
			}
		}
		svg.Element.GradientBase.prototype = new svg.Element.ElementBase;
		
		// linear gradient element
		svg.Element.linearGradient = function(node) {
			this.base = svg.Element.GradientBase;
			this.base(node);
			
			this.getGradient = function(ctx, element) {
				var x = element.currentX();
				var y = element.currentY();
				var w = element.currentWidth();
				var h = element.currentHeight();
				
				var x1 = (this.gradientUnits == 'objectBoundingBox' 
					? x + w * this.attribute('x1').numValue() 
					: this.attribute('x1').Length.toPixels('x'));
				var y1 = (this.gradientUnits == 'objectBoundingBox' 
					? y + h * this.attribute('y1').numValue()
					: this.attribute('y1').Length.toPixels('y'));
				var x2 = (this.gradientUnits == 'objectBoundingBox' 
					? x + w * this.attribute('x2').numValue()
					: this.attribute('x2').Length.toPixels('x'));
				var y2 = (this.gradientUnits == 'objectBoundingBox' 
					? y + h * this.attribute('y2').numValue()
					: this.attribute('y2').Length.toPixels('y'));
				
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
				
				var cx = (this.gradientUnits == 'objectBoundingBox' 
					? x + w * this.attribute('cx').numValue() 
					: this.attribute('cx').Length.toPixels('x'));
				var cy = (this.gradientUnits == 'objectBoundingBox' 
					? y + h * this.attribute('cy').numValue() 
					: this.attribute('cy').Length.toPixels('y'));
				
				var fx = cx;
				var fy = cy;
				if (this.attribute('fx').hasValue()) {
					fx = (this.gradientUnits == 'objectBoundingBox' 
					? x + w * this.attribute('fx').numValue() 
					: this.attribute('fx').Length.toPixels('x'));
				}
				if (this.attribute('fy').hasValue()) {
					fy = (this.gradientUnits == 'objectBoundingBox' 
					? y + h * this.attribute('fy').numValue() 
					: this.attribute('fy').Length.toPixels('y'));
				}
				
				var r = (this.gradientUnits == 'objectBoundingBox' 
					? (w + h) / 2.0 * this.attribute('r').numValue()
					: this.attribute('r').Length.toPixels());
				
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
			if (this.style('stop-opacity').hasValue()) stopColor = stopColor.Color.addOpacity(this.style('stop-opacity').value);
			this.color = stopColor.value;
		}
		svg.Element.stop.prototype = new svg.Element.ElementBase;
		
		// animation base element
		svg.Element.AnimateBase = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			svg.Animations.push(this);
			
			this.duration = 0.0;
			this.begin = this.attribute('begin').Time.toMilliseconds();
			this.maxDuration = this.begin + this.attribute('dur').Time.toMilliseconds();

			this.calcValue = function() {
				// OVERRIDE ME!
				return '';
			}
			
			this.update = function(delta) {			
				// if we're past the end time
				if (this.duration > this.maxDuration) {
					// loop for indefinitely repeating animations
					if (this.attribute('repeatCount').value == 'indefinite') {
						this.duration = 0.0
					}
					else {
						return false; // no updates made
					}
				}			
				this.duration = this.duration + delta;
			
				// if we're past the begin time
				var updated = false;
				if (this.begin < this.duration) {
					var newValue = this.calcValue(); // tween
					var attributeType = this.attribute('attributeType').value;
					var attributeName = this.attribute('attributeName').value;
					
					if (this.parent != null) {
						if (attributeType == 'CSS') {
							this.parent.style(attributeName, true).value = newValue;
						}
						else { // default or XML
							if (this.attribute('type').hasValue()) {
								// for transform, etc.
								var type = this.attribute('type').value;
								this.parent.attribute(attributeName, true).value = type + '(' + newValue + ')';
							}
							else {
								this.parent.attribute(attributeName, true).value = newValue;
							}
						}
						updated = true;
					}
				}
				
				return updated;
			}
			
			// fraction of duration we've covered
			this.progress = function() {
				return ((this.duration - this.begin) / (this.maxDuration - this.begin));
			}			
		}
		svg.Element.AnimateBase.prototype = new svg.Element.ElementBase;
		
		// animate element
		svg.Element.animate = function(node) {
			this.base = svg.Element.AnimateBase;
			this.base(node);
			
			this.calcValue = function() {
				var from = this.attribute('from').numValue();
				var to = this.attribute('to').numValue();
				
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
			this.text = svg.trim(this.text);
			
			this.render = function(ctx) {
				var x = this.attribute('x').Length.toPixels('x');
				var y = this.attribute('y').Length.toPixels('y');
				
				var fontFamily = this.style('font-family').valueOrDefault('Arial');
				var fontSize = this.style('font-size').valueOrDefault('12px');
				
				ctx.font = fontSize + ' ' + fontFamily;
				if (ctx.fillText) ctx.fillText(this.text, x, y);
			}
		}
		svg.Element.text.prototype = new svg.Element.ElementBase;
		
		// group element
		svg.Element.g = function(node) {
			this.base = svg.Element.RenderedElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				svg.context.push(this.attributes); // add my attributes to the stack
				svg.context.push(this.styles); // add my styles to the stack
				this.renderChildren(ctx);
				svg.context.pop();		
				svg.context.pop();		
			}
		}
		svg.Element.g.prototype = new svg.Element.RenderedElementBase;
		
		svg.Element.style = function(node) { 
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			var css = node.childNodes[0].nodeValue;
			css = css.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(\/\/.*)/gm, ''); // remove comments
			css = svg.compressSpaces(css); // replace whitespace
			var cssDefs = css.split('}');
			for (var i=0; i<cssDefs.length; i++) {
				if (svg.trim(cssDefs[i]) != '') {
					var cssDef = cssDefs[i].split('{');
					var cssClasses = cssDef[0].split(',');
					var cssProps = cssDef[1].split(';');
					for (var j=0; j<cssClasses.length; j++) {
						var cssClass = svg.trim(cssClasses[j]);
						if (cssClass != '') {
							var props = {};
							for (var k=0; k<cssProps.length; k++) {
								var prop = cssProps[k].split(':');
								var name = prop[0];
								var value = prop[1];
								if (name != null && value != null) {
									props[svg.trim(prop[0])] = new svg.Property(svg.trim(prop[0]), svg.trim(prop[1]));
								}
							}
							svg.Styles[cssClass] = props;
						}
					}
				}
			}
		}
		svg.Element.style.prototype = new svg.Element.ElementBase;
		
		// use element 
		svg.Element.use = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.render = function(ctx) {
				var element = svg.Definitions[this.attribute('xlink:href').value.replace('#','')];
				if (element != null) {
					svg.context.push(this.attributes); // add my attributes to the stack
					svg.context.push(this.styles); // add my attributes to the stack
					element.render(ctx);
					svg.context.pop();
					svg.context.pop();
				}
			}
		}
		svg.Element.use.prototype = new svg.Element.ElementBase;
		
		// clip element
		svg.Element.clipPath = function(node) {
			this.base = svg.Element.ElementBase;
			this.base(node);
			
			this.apply = function(ctx) {
				for (var i=0; i<this.children.length; i++) {
					if (this.children[i].path) {
						this.children[i].path(ctx);
						ctx.clip();
					}
				}
			}
		}
		svg.Element.clipPath.prototype = new svg.Element.ElementBase;

		// title element, do nothing
		svg.Element.title = function(node) {
		}
		svg.Element.title.prototype = new svg.Element.ElementBase;

		// desc element, do nothing
		svg.Element.desc = function(node) {
		}
		svg.Element.desc.prototype = new svg.Element.ElementBase;		
		
		svg.Element.MISSING = function(node) {
			console.log('ERROR: Element \'' + node.nodeName + '\' not yet implemented.');
		}
		svg.Element.MISSING.prototype = new svg.Element.ElementBase;
		
		// element factory
		svg.CreateElement = function(node) {
			var className = 'svg.Element.' + node.nodeName;
			if (!eval(className)) className = 'svg.Element.MISSING';
		
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
			svg.init();
		
			var dom = svg.parseXml(xml);
			var e = svg.CreateElement(dom.documentElement);
			
			// render loop
			svg.intervalID = setInterval(function() { 
				// update animations
				var needUpdate = false;
				for (var i=0; i<svg.Animations.length; i++) {
					needUpdate = needUpdate | svg.Animations[i].update(1000 / svg.FRAMERATE);
				}
			
				// render if needed
				if (svg.neverRendered || needUpdate) {
					svg.neverRendered = false;
					ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
					e.render(ctx);
				}
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