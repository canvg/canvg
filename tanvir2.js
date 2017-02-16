(function () {
	// Private helper vars
	var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
	var _ = self.Prism = {
		languages: {
			insertBefore: function (inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];
				var ret = {};
				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {
						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}
						ret[token] = grammar[token];
					}
				}
				return root[inside] = ret;
			},
			DFS: function (o, callback) {
				for (var i in o) {
					callback.call(o, i, o[i]);
					if (Object.prototype.toString.call(o) === '[object Object]') {
						_.languages.DFS(o[i], callback);
					}
				}
			}
		},
		highlightAll: function (async, callback) {
			var elements = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');
			for (var i = 0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, callback);
			}
		},
		highlightElement: function (element, async, callback) {
			// Find language
			var language, grammar, parent = element;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}
			if (parent) {
				language = (parent.className.match(lang) || [, ''])[1];
				grammar = _.languages[language];
			}
			if (!grammar) {
				return;
			}
			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			// Set language on the parent, for styling
			parent = element.parentNode;
			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
			var code = element.textContent.trim();
			if (!code) {
				return;
			}
			code = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\u00a0/g, ' ');
			//console.time(code.slice(0,50));
			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};
			_.hooks.run('before-highlight', env);
			if (async && self.Worker) {
				var worker = new Worker(_.filename);
				worker.onmessage = function (evt) {
					env.highlightedCode = Token.stringify(JSON.parse(evt.data));
					env.element.innerHTML = env.highlightedCode;
					callback && callback.call(env.element);
					//console.timeEnd(code.slice(0,50));
					_.hooks.run('after-highlight', env);
				};
				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code
				}));
			} else {
				env.highlightedCode = _.highlight(env.code, env.grammar)
				env.element.innerHTML = env.highlightedCode;
				callback && callback.call(element);
				_.hooks.run('after-highlight', env);
				//console.timeEnd(code.slice(0,50));
			}
		},
		highlight: function (text, grammar) {
			return Token.stringify(_.tokenize(text, grammar));
		},
		tokenize: function (text, grammar) {
			var Token = _.Token;
			var strarr = [text];
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}
				delete grammar.rest;
			}
			tokenloop: for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}
				var pattern = grammar[token],
					inside = pattern.inside,
					lookbehind = !! pattern.lookbehind || 0;
				pattern = pattern.pattern || pattern;
				for (var i = 0; i < strarr.length; i++) { // DonÂ’t cache length as it changes during the loop
					var str = strarr[i];
					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						break tokenloop;
					}
					if (str instanceof Token) {
						continue;
					}
					pattern.lastIndex = 0;
					var match = pattern.exec(str);
					if (match) {
						if (lookbehind) {
							lookbehind = match[1].length;
						}
						var from = match.index - 1 + lookbehind,
							match = match[0].slice(lookbehind),
							len = match.length,
							to = from + len,
							before = str.slice(0, from + 1),
							after = str.slice(to + 1);
						var args = [i, 1];
						if (before) {
							args.push(before);
						}
						var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match);
						args.push(wrapped);
						if (after) {
							args.push(after);
						}
						Array.prototype.splice.apply(strarr, args);
					}
				}
			}
			return strarr;
		},
		hooks: {
			all: {},
			add: function (name, callback) {
				var hooks = _.hooks.all;
				hooks[name] = hooks[name] || [];
				hooks[name].push(callback);
			},
			run: function (name, env) {
				var callbacks = _.hooks.all[name];
				if (!callbacks || !callbacks.length) {
					return;
				}
				for (var i = 0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};
	var Token = _.Token = function (type, content) {
			this.type = type;
			this.content = content;
		};
	Token.stringify = function (o) {
		if (typeof o == 'string') {
			return o;
		}
		if (Object.prototype.toString.call(o) == '[object Array]') {
			for (var i = 0; i < o.length; i++) {
				o[i] = Token.stringify(o[i]);
			}
			return o.join('');
		}
		var env = {
			type: o.type,
			content: Token.stringify(o.content),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {}
		};
		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}
		_.hooks.run('wrap', env);
		var attributes = '';
		for (var name in env.attributes) {
			attributes += name + '="' + (env.attributes[name] || '') + '"';
		}
		return '<' + env.tag + ' class="' + env.classes.join(' ') + '" ' + attributes + '>' + env.content + '</' + env.tag + '>';
	};
	if (!self.document) {
		// In worker
		self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code;
			self.postMessage(JSON.stringify(_.tokenize(code, _.languages[lang])));
			self.close();
		}, false);
		return;
	}
	// Get current script and highlight
	var script = document.getElementsByTagName('script');
	script = script[script.length - 1];
	if (script) {
		_.filename = script.src;
		if (document.addEventListener && !script.hasAttribute('data-manual')) {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
})();
Prism.languages.markup = {
	'comment': /&lt;!--[\w\W]*?--(&gt;|&gt;)/g,
	'prolog': /&lt;\?.+?\?&gt;/,
	'doctype': /&lt;!DOCTYPE.+?&gt;/,
	'cdata': /&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,
	'tag': {
		pattern: /&lt;\/?[\w:-]+\s*[\w\W]*?&gt;/gi,
		inside: {
			'tag': {
				pattern: /^&lt;\/?[\w:-]+/i,
				inside: {
					'punctuation': /^&lt;\/?/,
					'namespace': /^[\w-]+?:/
				}
			},
			'attr-value': {
				pattern: /=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,
				inside: {
					'punctuation': /=/g
				}
			},
			'punctuation': /\/?&gt;/g,
			'attr-name': {
				pattern: /[\w:-]+/g,
				inside: {
					'namespace': /^[\w-]+?:/
				}
			}
		}
	},
	'entity': /&amp;#?[\da-z]{1,8};/gi
};
// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {
	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});
Prism.languages.css = {
	'comment': /\/\*[\w\W]*?\*\//g,
	'atrule': /@[\w-]+?(\s+.+)?(?=\s*{|\s*;)/gi,
	'url': /url\((["']?).*?\1\)/gi,
	'selector': /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
	'property': /(\b|\B)[a-z-]+(?=\s*:)/ig,
	'string': /("|')(\\?.)*?\1/g,
	'important': /\B!important\b/gi,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[\{\};:]/g
};
if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.css
			}
		}
	});
}
Prism.languages.javascript = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},
	'string': /("|')(\\?.)*?\1/g,
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
		lookbehind: true
	},
	'keyword': /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
	'boolean': /\b(true|false)\b/g,
	'number': /\b-?(0x)?\d*\.?\d+\b/g,
	'operator': /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\//g,
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g
};
if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/ig,
			inside: {
				'tag': {
					pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/ig,
					inside: Prism.languages.markup.tag.inside
				},
				rest: Prism.languages.javascript
			}
		}
	});
}
Prism.languages.java = {
	'comment': {
		pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
		lookbehind: true
	},
	'string': /("|')(\\?.)*?\1/g,
	'keyword': /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
	'boolean': /\b(true|false)\b/g,
	'number': /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
	'operator': {
		pattern: /([^\.]|^)([-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&amp;){1,2}|\|?\||\?|\*|\/|%|\^|(&lt;){2}|($gt;){2,3}|:|~)/g,
		lookbehind: true
	},
	'ignore': /&(lt|gt|amp);/gi,
	'punctuation': /[{}[\];(),.:]/g,
};
    
//CTRLU
shortcut={all_shortcuts:{},add:function(a,b,c){var d={type:"keydown",propagate:!1,disable_in_input:!1,target:document,keycode:!1};if(c)for(var e in d)"undefined"==typeof c[e]&&(c[e]=d[e]);else c=d;d=c.target,"string"==typeof c.target&&(d=document.getElementById(c.target)),a=a.toLowerCase(),e=function(d){d=d||window.event;if(c.disable_in_input){var e;d.target?e=d.target:d.srcElement&&(e=d.srcElement),3==e.nodeType&&(e=e.parentNode);if("INPUT"==e.tagName||"TEXTAREA"==e.tagName)return}d.keyCode?code=d.keyCode:d.which&&(code=d.which),e=String.fromCharCode(code).toLowerCase(),188==code&&(e=","),190==code&&(e=".");var f=a.split("+"),g=0,h={"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},i={esc:27,escape:27,tab:9,space:32,"return":13,enter:13,backspace:8,scrolllock:145,scroll_lock:145,scroll:145,capslock:20,caps_lock:20,caps:20,numlock:144,num_lock:144,num:144,pause:19,"break":19,insert:45,home:36,"delete":46,end:35,pageup:33,page_up:33,pu:33,pagedown:34,page_down:34,pd:34,left:37,up:38,right:39,down:40,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123},j=!1,l=!1,m=!1,n=!1,o=!1,p=!1,q=!1,r=!1;d.ctrlKey&&(n=!0),d.shiftKey&&(l=!0),d.altKey&&(p=!0),d.metaKey&&(r=!0);for(var s=0;k=f[s],s<f.length;s++)"ctrl"==k||"control"==k?(g++,m=!0):"shift"==k?(g++,j=!0):"alt"==k?(g++,o=!0):"meta"==k?(g++,q=!0):1<k.length?i[k]==code&&g++:c.keycode?c.keycode==code&&g++:e==k?g++:h[e]&&d.shiftKey&&(e=h[e],e==k&&g++);if(g==f.length&&n==m&&l==j&&p==o&&r==q&&(b(d),!c.propagate))return d.cancelBubble=!0,d.returnValue=!1,d.stopPropagation&&(d.stopPropagation(),d.preventDefault()),!1},this.all_shortcuts[a]={callback:e,target:d,event:c.type},d.addEventListener?d.addEventListener(c.type,e,!1):d.attachEvent?d.attachEvent("on"+c.type,e):d["on"+c.type]=e},remove:function(a){var a=a.toLowerCase(),b=this.all_shortcuts[a];delete this.all_shortcuts[a];if(b){var a=b.event,c=b.target,b=b.callback;c.detachEvent?c.detachEvent("on"+a,b):c.removeEventListener?c.removeEventListener(a,b,!1):c["on"+a]=!1}}},shortcut.add("Ctrl+U",function(){top.location.href=" http://codeyoumake.blogspot.com/"});
