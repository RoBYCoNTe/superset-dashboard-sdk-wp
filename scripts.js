var SDS = (function (exports, React, ReactDOM) {
    'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = ".superset-dashboard {\n  width: 100%;\n  height: inherit;\n  border: 0;\n}\n.superset-dashboard iframe {\n  width: 100%;\n  height: 100%;\n  border: 0;\n}";
    styleInject(css_248z);

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var rison = createCommonjsModule(function (module, exports) {
    // Uses CommonJS, AMD or browser globals to create a module.
    // Based on: https://github.com/umdjs/umd/blob/master/commonjsStrict.js
    (function (root, factory) {
        {
            // CommonJS
            factory(exports);
        }
    }(commonjsGlobal, function (exports) {
    var rison = exports;

    //////////////////////////////////////////////////
    //
    //  the stringifier is based on
    //    http://json.org/json.js as of 2006-04-28 from json.org
    //  the parser is based on 
    //    http://osteele.com/sources/openlaszlo/json
    //

    if (typeof rison == 'undefined')
        window.rison = {};

    /**
     *  rules for an uri encoder that is more tolerant than encodeURIComponent
     *
     *  encodeURIComponent passes  ~!*()-_.'
     *
     *  we also allow              ,:@$/
     *
     */
    rison.uri_ok = {  // ok in url paths and in form query args
                '~': true,  '!': true,  '*': true,  '(': true,  ')': true,
                '-': true,  '_': true,  '.': true,  ',': true,
                ':': true,  '@': true,  '$': true,
                "'": true,  '/': true
    };

    /*
     * we divide the uri-safe glyphs into three sets
     *   <rison> - used by rison                         ' ! : ( ) ,
     *   <reserved> - not common in strings, reserved    * @ $ & ; =
     *
     * we define <identifier> as anything that's not forbidden
     */

    /**
     * punctuation characters that are legal inside ids.
     */
    // this var isn't actually used
    //rison.idchar_punctuation = "_-./~";  

    (function () {
        var l = [];
        for (var hi = 0; hi < 16; hi++) {
            for (var lo = 0; lo < 16; lo++) {
                if (hi+lo == 0) continue;
                var c = String.fromCharCode(hi*16 + lo);
                if (! /\w|[-_.\/~]/.test(c))
                    l.push('\\u00' + hi.toString(16) + lo.toString(16));
            }
        }
        /**
         * characters that are illegal inside ids.
         * <rison> and <reserved> classes are illegal in ids.
         *
         */
        rison.not_idchar = l.join('');
        //idcrx = new RegExp('[' + rison.not_idchar + ']');
        //console.log('NOT', (idcrx.test(' ')) );
    })();
    //rison.not_idchar  = " \t\r\n\"<>[]{}'!=:(),*@$;&";
    rison.not_idchar  = " '!:(),*@$";


    /**
     * characters that are illegal as the start of an id
     * this is so ids can't look like numbers.
     */
    rison.not_idstart = "-0123456789";


    (function () {
        var idrx = '[^' + rison.not_idstart + rison.not_idchar + 
                   '][^' + rison.not_idchar + ']*';

        rison.id_ok = new RegExp('^' + idrx + '$');

        // regexp to find the end of an id when parsing
        // g flag on the regexp is necessary for iterative regexp.exec()
        rison.next_id = new RegExp(idrx, 'g');
    })();

    /**
     * this is like encodeURIComponent() but quotes fewer characters.
     *
     * @see rison.uri_ok
     *
     * encodeURIComponent passes   ~!*()-_.'
     * rison.quote also passes   ,:@$/
     *   and quotes " " as "+" instead of "%20"
     */
    rison.quote = function(x) {
        if (/^[-A-Za-z0-9~!*()_.',:@$\/]*$/.test(x))
            return x;

        return encodeURIComponent(x)
            .replace('%2C', ',', 'g')
            .replace('%3A', ':', 'g')
            .replace('%40', '@', 'g')
            .replace('%24', '$', 'g')
            .replace('%2F', '/', 'g')
            .replace('%20', '+', 'g');
    };


    //
    //  based on json.js 2006-04-28 from json.org
    //  license: http://www.json.org/license.html
    //
    //  hacked by nix for use in uris.
    //

    (function () {
        var sq = { // url-ok but quoted in strings
                   "'": true,  '!': true
        },
        s = {
                array: function (x) {
                    var a = ['!('], b, f, i, l = x.length, v;
                    for (i = 0; i < l; i += 1) {
                        v = x[i];
                        f = s[typeof v];
                        if (f) {
                            v = f(v);
                            if (typeof v == 'string') {
                                if (b) {
                                    a[a.length] = ',';
                                }
                                a[a.length] = v;
                                b = true;
                            }
                        }
                    }
                    a[a.length] = ')';
                    return a.join('');
                },
                'boolean': function (x) {
                    if (x)
                        return '!t';
                    return '!f'
                },
                'null': function (x) {
                    return "!n";
                },
                number: function (x) {
                    if (!isFinite(x))
                        return '!n';
                    // strip '+' out of exponent, '-' is ok though
                    return String(x).replace(/\+/,'');
                },
                object: function (x) {
                    if (x) {
                        if (x instanceof Array) {
                            return s.array(x);
                        }
                        // WILL: will this work on non-Firefox browsers?
                        if (typeof x.__prototype__ === 'object' && typeof x.__prototype__.encode_rison !== 'undefined')
                            return x.encode_rison();

                        var a = ['('], b, f, i, v, ki, ks=[];
                        for (i in x)
                            ks[ks.length] = i;
                        ks.sort();
                        for (ki = 0; ki < ks.length; ki++) {
                            i = ks[ki];
                            v = x[i];
                            f = s[typeof v];
                            if (f) {
                                v = f(v);
                                if (typeof v == 'string') {
                                    if (b) {
                                        a[a.length] = ',';
                                    }
                                    a.push(s.string(i), ':', v);
                                    b = true;
                                }
                            }
                        }
                        a[a.length] = ')';
                        return a.join('');
                    }
                    return '!n';
                },
                string: function (x) {
                    if (x == '')
                        return "''";

                    if (rison.id_ok.test(x))
                        return x;

                    x = x.replace(/(['!])/g, function(a, b) {
                        if (sq[b]) return '!'+b;
                        return b;
                    });
                    return "'" + x + "'";
                },
                undefined: function (x) {
                    throw new Error("rison can't encode the undefined value");
                }
            };


        /**
         * rison-encode a javascript structure
         *
         *  implemementation based on Douglas Crockford's json.js:
         *    http://json.org/json.js as of 2006-04-28 from json.org
         *
         */
        rison.encode = function (v) {
            return s[typeof v](v);
        };

        /**
         * rison-encode a javascript object without surrounding parens
         *
         */
        rison.encode_object = function (v) {
            if (typeof v != 'object' || v === null || v instanceof Array)
                throw new Error("rison.encode_object expects an object argument");
            var r = s[typeof v](v);
            return r.substring(1, r.length-1);
        };

        /**
         * rison-encode a javascript array without surrounding parens
         *
         */
        rison.encode_array = function (v) {
            if (!(v instanceof Array))
                throw new Error("rison.encode_array expects an array argument");
            var r = s[typeof v](v);
            return r.substring(2, r.length-1);
        };

        /**
         * rison-encode and uri-encode a javascript structure
         *
         */
        rison.encode_uri = function (v) {
            return rison.quote(s[typeof v](v));
        };

    })();




    //
    // based on openlaszlo-json and hacked by nix for use in uris.
    //
    // Author: Oliver Steele
    // Copyright: Copyright 2006 Oliver Steele.  All rights reserved.
    // Homepage: http://osteele.com/sources/openlaszlo/json
    // License: MIT License.
    // Version: 1.0


    /**
     * parse a rison string into a javascript structure.
     *
     * this is the simplest decoder entry point.
     *
     *  based on Oliver Steele's OpenLaszlo-JSON
     *     http://osteele.com/sources/openlaszlo/json
     */
    rison.decode = function(r) {
        var errcb = function(e) { throw Error('rison decoder error: ' + e); };
        var p = new rison.parser(errcb);
        return p.parse(r);
    };

    /**
     * parse an o-rison string into a javascript structure.
     *
     * this simply adds parentheses around the string before parsing.
     */
    rison.decode_object = function(r) {
        return rison.decode('('+r+')');
    };

    /**
     * parse an a-rison string into a javascript structure.
     *
     * this simply adds array markup around the string before parsing.
     */
    rison.decode_array = function(r) {
        return rison.decode('!('+r+')');
    };


    /**
     * construct a new parser object for reuse.
     *
     * @constructor
     * @class A Rison parser class.  You should probably 
     *        use rison.decode instead. 
     * @see rison.decode
     */
    rison.parser = function (errcb) {
        this.errorHandler = errcb;
    };

    /**
     * a string containing acceptable whitespace characters.
     * by default the rison decoder tolerates no whitespace.
     * to accept whitespace set rison.parser.WHITESPACE = " \t\n\r\f";
     */
    rison.parser.WHITESPACE = "";

    // expose this as-is?
    rison.parser.prototype.setOptions = function (options) {
        if (options['errorHandler'])
            this.errorHandler = options.errorHandler;
    };

    /**
     * parse a rison string into a javascript structure.
     */
    rison.parser.prototype.parse = function (str) {
        this.string = str;
        this.index = 0;
        this.message = null;
        var value = this.readValue();
        if (!this.message && this.next())
            value = this.error("unable to parse string as rison: '" + rison.encode(str) + "'");
        if (this.message && this.errorHandler)
            this.errorHandler(this.message, this.index);
        return value;
    };

    rison.parser.prototype.error = function (message) {
        if (typeof(console) != 'undefined')
            console.log('rison parser error: ', message);
        this.message = message;
        return undefined;
    };
        
    rison.parser.prototype.readValue = function () {
        var c = this.next();
        var fn = c && this.table[c];

        if (fn)
            return fn.apply(this);

        // fell through table, parse as an id

        var s = this.string;
        var i = this.index-1;

        // Regexp.lastIndex may not work right in IE before 5.5?
        // g flag on the regexp is also necessary
        rison.next_id.lastIndex = i;
        var m = rison.next_id.exec(s);

        // console.log('matched id', i, r.lastIndex);

        if (m.length > 0) {
            var id = m[0];
            this.index = i+id.length;
            return id;  // a string
        }

        if (c) return this.error("invalid character: '" + c + "'");
        return this.error("empty expression");
    };

    rison.parser.parse_array = function (parser) {
        var ar = [];
        var c;
        while ((c = parser.next()) != ')') {
            if (!c) return parser.error("unmatched '!('");
            if (ar.length) {
                if (c != ',')
                    parser.error("missing ','");
            } else if (c == ',') {
                return parser.error("extra ','");
            } else
                --parser.index;
            var n = parser.readValue();
            if (typeof n == "undefined") return undefined;
            ar.push(n);
        }
        return ar;
    };

    rison.parser.bangs = {
        t: true,
        f: false,
        n: null,
        '(': rison.parser.parse_array
    };

    rison.parser.prototype.table = {
        '!': function () {
            var s = this.string;
            var c = s.charAt(this.index++);
            if (!c) return this.error('"!" at end of input');
            var x = rison.parser.bangs[c];
            if (typeof(x) == 'function') {
                return x.call(null, this);
            } else if (typeof(x) == 'undefined') {
                return this.error('unknown literal: "!' + c + '"');
            }
            return x;
        },
        '(': function () {
            var o = {};
            var c;
            var count = 0;
            while ((c = this.next()) != ')') {
                if (count) {
                    if (c != ',')
                        this.error("missing ','");
                } else if (c == ',') {
                    return this.error("extra ','");
                } else
                    --this.index;
                var k = this.readValue();
                if (typeof k == "undefined") return undefined;
                if (this.next() != ':') return this.error("missing ':'");
                var v = this.readValue();
                if (typeof v == "undefined") return undefined;
                o[k] = v;
                count++;
            }
            return o;
        },
        "'": function () {
            var s = this.string;
            var i = this.index;
            var start = i;
            var segments = [];
            var c;
            while ((c = s.charAt(i++)) != "'") {
                //if (i == s.length) return this.error('unmatched "\'"');
                if (!c) return this.error('unmatched "\'"');
                if (c == '!') {
                    if (start < i-1)
                        segments.push(s.slice(start, i-1));
                    c = s.charAt(i++);
                    if ("!'".indexOf(c) >= 0) {
                        segments.push(c);
                    } else {
                        return this.error('invalid string escape: "!'+c+'"');
                    }
                    start = i;
                }
            }
            if (start < i-1)
                segments.push(s.slice(start, i-1));
            this.index = i;
            return segments.length == 1 ? segments[0] : segments.join('');
        },
        // Also any digit.  The statement that follows this table
        // definition fills in the digits.
        '-': function () {
            var s = this.string;
            var i = this.index;
            var start = i-1;
            var state = 'int';
            var permittedSigns = '-';
            var transitions = {
                'int+.': 'frac',
                'int+e': 'exp',
                'frac+e': 'exp'
            };
            do {
                var c = s.charAt(i++);
                if (!c) break;
                if ('0' <= c && c <= '9') continue;
                if (permittedSigns.indexOf(c) >= 0) {
                    permittedSigns = '';
                    continue;
                }
                state = transitions[state+'+'+c.toLowerCase()];
                if (state == 'exp') permittedSigns = '-';
            } while (state);
            this.index = --i;
            s = s.slice(start, i);
            if (s == '-') return this.error("invalid number");
            return Number(s);
        }
    };
    // copy table['-'] to each of table[i] | i <- '0'..'9':
    (function (table) {
        for (var i = 0; i <= 9; i++)
            table[String(i)] = table['-'];
    })(rison.parser.prototype.table);

    // return the next non-whitespace character, or undefined
    rison.parser.prototype.next = function () {
        var s = this.string;
        var i = this.index;
        do {
            if (i == s.length) return undefined;
            var c = s.charAt(i++);
        } while (rison.parser.WHITESPACE.indexOf(c) >= 0);
        this.index = i;
        return c;
    };

    // End of UMD module wrapper
    }));
    });

    /*
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     */
    var IFRAME_COMMS_MESSAGE_TYPE = "__embedded_comms__";
    var DASHBOARD_UI_FILTER_CONFIG_URL_PARAM_KEY = {
        visible: "show_filters",
        expanded: "expand_filters",
        native_filters: "native_filters",
    };

    (function () {var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;enterModule && enterModule(module);})();var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {return a;};
























    /**
     * A utility for communications between an iframe and its parent, used by the Superset embedded SDK.
     * This builds useful patterns on top of the basic functionality offered by MessageChannel.
     *
     * Both windows instantiate a Switchboard, passing in their MessagePorts.
     * Calling methods on the switchboard causes messages to be sent through the channel.
     */
    class Switchboard {






      // used to make unique ids




      constructor({ port, name = 'switchboard', debug = false }) {this.port = void 0;this.name = void 0;this.methods = {};this.incrementor = 1;this.debugMode = void 0;
        this.port = port;
        this.name = name;
        this.debugMode = debug;

        port.addEventListener('message', async (event) => {
          this.log('message received', event);
          const message = event.data;
          if (isGet(message)) {
            // find the method, call it, and reply with the result
            this.port.postMessage(await this.getMethodResult(message));
          } else if (isEmit(message)) {
            const { method, args } = message;
            // Find the method and call it, but no result necessary.
            // Should this multicast to a set of listeners?
            // Maybe, but that requires writing a bunch more code
            // and I haven't found a need for it yet.
            const executor = this.methods[method];
            if (executor) {
              executor(args);
            }
          }
        });
      }

      async getMethodResult({
        messageId,
        method,
        args })
      {
        const executor = this.methods[method];
        if (executor == null) {
          return {
            switchboardAction: Actions.ERROR,
            messageId,
            error: `[${this.name}] Method "${method}" is not defined` };

        }
        try {
          const result = await executor(args);
          return {
            switchboardAction: Actions.REPLY,
            messageId,
            result };

        } catch (err) {
          this.logError(err);
          return {
            switchboardAction: Actions.ERROR,
            messageId,
            error: `[${this.name}] Method "${method}" threw an error` };

        }
      }

      /**
       * Defines a method that can be "called" from the other side by sending an event.
       */
      defineMethod(methodName, executor) {
        this.methods[methodName] = executor;
      }

      /**
       * Calls a method registered on the other side, and returns the result.
       *
       * How this is accomplished:
       * This switchboard sends a "get" message over the channel describing which method to call with which arguments.
       * The other side's switchboard finds a method with that name, and calls it with the arguments.
       * It then packages up the returned value into a "reply" message, sending it back to us across the channel.
       * This switchboard has attached a listener on the channel, which will resolve with the result when a reply is detected.
       *
       * Instead of an arguments list, arguments are supplied as a map.
       *
       * @param method the name of the method to call
       * @param args arguments that will be supplied. Must be serializable, no functions or other nonense.
       * @returns whatever is returned from the method
       */
      get(method, args = undefined) {
        return new Promise((resolve, reject) => {
          // In order to "call a method" on the other side of the port,
          // we will send a message with a unique id
          const messageId = this.getNewMessageId();
          // attach a new listener to our port, and remove it when we get a response
          const listener = (event) => {
            const message = event.data;
            if (message.messageId !== messageId) return;
            this.port.removeEventListener('message', listener);
            if (isReply(message)) {
              resolve(message.result);
            } else {
              const errStr = isError(message) ?
              message.error :
              'Unexpected response message';
              reject(new Error(errStr));
            }
          };
          this.port.addEventListener('message', listener);
          this.port.start();
          const message = {
            switchboardAction: Actions.GET,
            method,
            messageId,
            args };

          this.port.postMessage(message);
        });
      }

      /**
       * Emit calls a method on the other side just like get does.
       * But emit doesn't wait for a response, it just sends and forgets.
       *
       * @param method
       * @param args
       */
      emit(method, args = undefined) {
        const message = {
          switchboardAction: Actions.EMIT,
          method,
          args };

        this.port.postMessage(message);
      }

      start() {
        this.port.start();
      }

      log(...args) {
        if (this.debugMode) {
          console.debug(`[${this.name}]`, ...args);
        }
      }

      logError(...args) {
        console.error(`[${this.name}]`, ...args);
      }

      getNewMessageId() {
        // eslint-disable-next-line no-plusplus
        return `m_${this.name}_${this.incrementor++}`;
      } // @ts-ignore
      __reactstandin__regenerateByEval(key, code) {// @ts-ignore
        this[key] = eval(code);}}


    // Each message we send on the channel specifies an action we want the other side to cooperate with.
    var Actions;






    // helper types/functions for making sure wires don't get crossed
    (function (Actions) {Actions["GET"] = "get";Actions["REPLY"] = "reply";Actions["EMIT"] = "emit";Actions["ERROR"] = "error";})(Actions || (Actions = {}));











    function isGet(message) {
      return message.switchboardAction === Actions.GET;
    }







    function isReply(message) {
      return message.switchboardAction === Actions.REPLY;
    }







    function isEmit(message) {
      return message.switchboardAction === Actions.EMIT;
    }







    function isError(message) {
      return message.switchboardAction === Actions.ERROR;
    }(function () {var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;if (!reactHotLoader) {return;}reactHotLoader.register(Switchboard, "Switchboard", "/Users/ville/src/superset-release/superset-frontend/packages/superset-ui-switchboard/src/switchboard.ts");reactHotLoader.register(isGet, "isGet", "/Users/ville/src/superset-release/superset-frontend/packages/superset-ui-switchboard/src/switchboard.ts");reactHotLoader.register(isReply, "isReply", "/Users/ville/src/superset-release/superset-frontend/packages/superset-ui-switchboard/src/switchboard.ts");reactHotLoader.register(isEmit, "isEmit", "/Users/ville/src/superset-release/superset-frontend/packages/superset-ui-switchboard/src/switchboard.ts");reactHotLoader.register(isError, "isError", "/Users/ville/src/superset-release/superset-frontend/packages/superset-ui-switchboard/src/switchboard.ts");})();(function () {var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;leaveModule && leaveModule(module);})();

    function e(e){this.message=e;}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw "Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e;}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";

    /**
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     */
    var REFRESH_TIMING_BUFFER_MS = 5000; // refresh guest token early to avoid failed superset requests
    var MIN_REFRESH_WAIT_MS = 10000; // avoid blasting requests as fast as the cpu can handle
    var DEFAULT_TOKEN_EXP_MS = 300000; // (5 min) used only when parsing guest token exp fails
    // when do we refresh the guest token?
    function getGuestTokenRefreshTiming(currentGuestToken) {
        var parsedJwt = o(currentGuestToken);
        // if exp is int, it is in seconds, but Date() takes milliseconds
        var exp = new Date(/[^0-9\.]/g.test(parsedJwt.exp) ? parsedJwt.exp : parseFloat(parsedJwt.exp) * 1000);
        var isValidDate = exp.toString() !== 'Invalid Date';
        var ttl = isValidDate ? Math.max(MIN_REFRESH_WAIT_MS, exp.getTime() - Date.now()) : DEFAULT_TOKEN_EXP_MS;
        return ttl - REFRESH_TIMING_BUFFER_MS;
    }

    /*
     * Licensed to the Apache Software Foundation (ASF) under one
     * or more contributor license agreements.  See the NOTICE file
     * distributed with this work for additional information
     * regarding copyright ownership.  The ASF licenses this file
     * to you under the Apache License, Version 2.0 (the
     * "License"); you may not use this file except in compliance
     * with the License.  You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing,
     * software distributed under the License is distributed on an
     * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     * KIND, either express or implied.  See the License for the
     * specific language governing permissions and limitations
     * under the License.
     */
    /**
     * Embeds a Superset dashboard into the page using an iframe.
     */
    function embedDashboard(_a) {
        var uuid = _a.uuid, supersetDomain = _a.supersetDomain, mountPoint = _a.mountPoint, fetchGuestToken = _a.fetchGuestToken, dashboardUiConfig = _a.dashboardUiConfig, _b = _a.debug, debug = _b === void 0 ? false : _b;
        return __awaiter(this, void 0, void 0, function () {
            function log() {
                var info = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    info[_i] = arguments[_i];
                }
                if (debug) {
                    console.debug.apply(console, __spreadArrays(["[superset-embedded-sdk][dashboard " + uuid + "]"], info));
                }
            }
            function calculateConfig() {
                var configNumber = 0;
                if (dashboardUiConfig) {
                    if (dashboardUiConfig.hideTitle) {
                        configNumber += 1;
                    }
                    if (dashboardUiConfig.hideTab) {
                        configNumber += 2;
                    }
                    if (dashboardUiConfig.hideChartControls) {
                        configNumber += 8;
                    }
                }
                return configNumber;
            }
            function mountIframe() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve) {
                                var iframe = document.createElement("iframe");
                                var dashboardConfig = dashboardUiConfig
                                    ? "?uiConfig=" + calculateConfig()
                                    : "";
                                var urlParams = (dashboardUiConfig === null || dashboardUiConfig === void 0 ? void 0 : dashboardUiConfig.urlParams) || {};
                                var urlParamsString = Object.keys(urlParams).length ? '&' + new URLSearchParams(urlParams).toString() : '';
                                var filterConfig = (dashboardUiConfig === null || dashboardUiConfig === void 0 ? void 0 : dashboardUiConfig.filters) || {};
                                var filterConfigKeys = Object.keys(filterConfig);
                                var filterConfigUrlParams = filterConfigKeys.length > 0
                                    ? "&" +
                                        filterConfigKeys
                                            .map(function (key) {
                                            return DASHBOARD_UI_FILTER_CONFIG_URL_PARAM_KEY[key] +
                                                "=" +
                                                filterConfig[key];
                                        })
                                            .join("&")
                                    : "";
                                // set up the iframe's sandbox configuration
                                iframe.sandbox.add("allow-same-origin"); // needed for postMessage to work
                                iframe.sandbox.add("allow-scripts"); // obviously the iframe needs scripts
                                iframe.sandbox.add("allow-presentation"); // for fullscreen charts
                                iframe.sandbox.add("allow-downloads"); // for downloading charts as image
                                iframe.sandbox.add("allow-forms"); // for forms to submit
                                iframe.sandbox.add("allow-popups"); // for exporting charts as csv
                                // add these if it turns out we need them:
                                // iframe.sandbox.add("allow-top-navigation");
                                // add the event listener before setting src, to be 100% sure that we capture the load event
                                iframe.addEventListener("load", function () {
                                    // MessageChannel allows us to send and receive messages smoothly between our window and the iframe
                                    // See https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
                                    var commsChannel = new MessageChannel();
                                    var ourPort = commsChannel.port1;
                                    var theirPort = commsChannel.port2;
                                    // Send one of the message channel ports to the iframe to initialize embedded comms
                                    // See https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
                                    // we know the content window isn't null because we are in the load event handler.
                                    iframe.contentWindow.postMessage({ type: IFRAME_COMMS_MESSAGE_TYPE, handshake: "port transfer" }, supersetDomain, [theirPort]);
                                    log("sent message channel to the iframe");
                                    // return our port from the promise
                                    resolve(new Switchboard({
                                        port: ourPort,
                                        name: "superset-embedded-sdk",
                                        debug: debug,
                                    }));
                                });
                                iframe.src = supersetDomain + "/embedded/" + uuid + dashboardConfig + filterConfigUrlParams + urlParamsString;
                                // Check if mountPoint has method replaceChildren and use it if available
                                if (mountPoint != null) {
                                    mountPoint.replaceChildren(iframe);
                                }
                                log("placed the iframe");
                            })];
                    });
                });
            }
            function refreshGuestToken() {
                return __awaiter(this, void 0, void 0, function () {
                    var newGuestToken;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetchGuestToken()];
                            case 1:
                                newGuestToken = _a.sent();
                                ourPort.emit("guestToken", { guestToken: newGuestToken });
                                setTimeout(refreshGuestToken, getGuestTokenRefreshTiming(newGuestToken));
                                return [2 /*return*/];
                        }
                    });
                });
            }
            function unmount() {
                log("unmounting");
                mountPoint.replaceChildren();
            }
            var _c, guestToken, ourPort, getScrollSize, getDashboardPermalink, getActiveTabs, getDashboardState;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        log("embedding");
                        return [4 /*yield*/, Promise.all([
                                fetchGuestToken(),
                                mountIframe(),
                            ])];
                    case 1:
                        _c = _d.sent(), guestToken = _c[0], ourPort = _c[1];
                        ourPort.emit("guestToken", { guestToken: guestToken });
                        log("sent guest token");
                        setTimeout(refreshGuestToken, getGuestTokenRefreshTiming(guestToken));
                        getScrollSize = function () { return ourPort.get("getScrollSize"); };
                        getDashboardPermalink = function (anchor) {
                            return ourPort.get("getDashboardPermalink", { anchor: anchor });
                        };
                        getActiveTabs = function () { return ourPort.get("getActiveTabs"); };
                        getDashboardState = function () { return __awaiter(_this, void 0, void 0, function () {
                            var interval;
                            return __generator(this, function (_a) {
                                interval = setInterval(function () {
                                    var dashboard = ourPort.get("getDashboardState");
                                    if (dashboard) {
                                        clearInterval(interval);
                                        return Promise.resolve(dashboard);
                                    }
                                }, 1000);
                                setTimeout(function () {
                                    clearInterval(interval);
                                    return Promise.resolve(undefined);
                                }, 10000);
                                return [2 /*return*/];
                            });
                        }); };
                        return [2 /*return*/, {
                                getScrollSize: getScrollSize,
                                unmount: unmount,
                                getDashboardPermalink: getDashboardPermalink,
                                getActiveTabs: getActiveTabs,
                                getDashboardState: getDashboardState,
                            }];
                }
            });
        });
    }

    var formatNativeFilter = function (filter) {
        var _a;
        var filterObject = (_a = {},
            _a[filter.id] = {
                "id": filter.id,
                "extraFormData": {
                    "filters": [
                        {
                            "col": filter.column,
                            "op": filter.operator,
                            "val": filter.value
                        }
                    ]
                },
                "filterState": {
                    "validateMessage": false,
                    "validateStatus": false,
                    "label": filter.value.toString(),
                    "value": filter.value
                },
                "ownState": {},
                "__cache": {
                    "validateMessage": false,
                    "validateStatus": false,
                    "label": filter.value.toString(),
                    "value": filter.value
                }
            },
            _a);
        return filterObject;
    };

    var Dashboard = function (_a) {
        var uuid = _a.uuid, domain = _a.domain, dataProvider = _a.dataProvider, guestToken = _a.guestToken, nativeFilters = _a.nativeFilters, _b = _a.autosize, autosize = _b === void 0 ? false : _b, _c = _a.placeholder, placeholder = _c === void 0 ? false : _c, _d = _a.uiConfig, uiConfig = _d === void 0 ? {
            hideTitle: true,
        } : _d;
        var ref = React.useRef(null);
        var _e = React__default.useState(true), loading = _e[0], setLoading = _e[1];
        React.useEffect(function () {
            if (!ref.current) {
                return;
            }
            (function () { return __awaiter(void 0, void 0, void 0, function () {
                var resources, token, _a, mergedNativeFilters, risonFilters;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            resources = [
                                {
                                    type: "dashboard",
                                    id: uuid,
                                },
                            ];
                            _a = guestToken;
                            if (_a) return [3 /*break*/, 2];
                            return [4 /*yield*/, dataProvider.fetchGuestToken(resources, [])];
                        case 1:
                            _a = (_b.sent());
                            _b.label = 2;
                        case 2:
                            token = _a;
                            mergedNativeFilters = {};
                            risonFilters = "";
                            if (nativeFilters && nativeFilters.length > 0) {
                                nativeFilters.map(formatNativeFilter).forEach(function (filterObject) {
                                    var nativeFilterKey = Object.keys(filterObject)[0];
                                    mergedNativeFilters[nativeFilterKey] = filterObject[nativeFilterKey];
                                });
                                risonFilters = rison.encode(mergedNativeFilters);
                            }
                            return [4 /*yield*/, embedDashboard({
                                    uuid: uuid,
                                    supersetDomain: domain,
                                    mountPoint: ref.current,
                                    fetchGuestToken: function () { return Promise.resolve(token); },
                                    dashboardUiConfig: __assign(__assign({}, uiConfig), { filters: __assign(__assign({}, uiConfig.filters), { native_filters: risonFilters }) }),
                                }).then(function (dashboard) { return __awaiter(void 0, void 0, void 0, function () {
                                    var height, lastHeight, interval;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!autosize) {
                                                    setLoading(false);
                                                    ref.current.style.height = "100%";
                                                    return [2 /*return*/];
                                                }
                                                return [4 /*yield*/, dashboard.getScrollSize()];
                                            case 1:
                                                height = (_a.sent()).height;
                                                lastHeight = height;
                                                interval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                                                    var _a, height, width;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0: return [4 /*yield*/, dashboard.getScrollSize()];
                                                            case 1:
                                                                _a = _b.sent(), height = _a.height, width = _a.width;
                                                                if (lastHeight === height) {
                                                                    clearInterval(interval);
                                                                    ref.current.style.height = height + "px";
                                                                    setLoading(false);
                                                                }
                                                                lastHeight = height;
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); }, 1500);
                                                return [2 /*return*/, function () {
                                                        clearInterval(interval);
                                                        dashboard.unmount();
                                                    }];
                                        }
                                    });
                                }); })];
                        case 3:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); })();
        }, [ref.current, uuid]);
        return (React__default.createElement(React__default.Fragment, null,
            placeholder !== false && loading === true && (React__default.createElement("div", { style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "100%",
                } }, placeholder)),
            React__default.createElement("div", { className: "superset-dashboard", ref: ref, style: { height: 0 } })));
    };

    var Dashboard$1 = /** @class */ (function () {
        function Dashboard(dashboardInfo) {
            this.info = dashboardInfo;
        }
        Dashboard.prototype.getJsonMetadata = function () {
            return JSON.parse(this.info.json_metadata);
        };
        return Dashboard;
    }());

    var DataProvider = /** @class */ (function () {
        function DataProvider(apiUrl, credentials) {
            this._apiUrl = apiUrl;
            this._credentials = credentials;
        }
        DataProvider.prototype._createUrl = function (path) {
            return "" + this._apiUrl + path;
        };
        DataProvider.prototype._fetchLogin = function (_a) {
            var username = _a.username, password = _a.password;
            return __awaiter(this, void 0, void 0, function () {
                var url;
                return __generator(this, function (_b) {
                    url = this._createUrl("/api/v1/security/login");
                    return [2 /*return*/, fetch(url, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                username: username,
                                password: password,
                                provider: "db",
                                refresh: true,
                            }),
                        }).then(function (response) { return response.json(); })];
                });
            });
        };
        DataProvider.prototype._fetchCsrfToken = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                var url, response, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = this._createUrl("/api/v1/security/csrf_token/");
                            return [4 /*yield*/, fetch(url, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + accessToken,
                                    },
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 2:
                            result = (_a.sent()).result;
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        DataProvider.prototype._fetchAuthData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, access_token, refresh_token, csrfToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (this._authData) {
                                return [2 /*return*/, this._authData];
                            }
                            if (this._credentials === null) {
                                throw new Error("Missing credentials");
                            }
                            return [4 /*yield*/, this._fetchLogin(this._credentials)];
                        case 1:
                            _a = _b.sent(), access_token = _a.access_token, refresh_token = _a.refresh_token;
                            return [4 /*yield*/, this._fetchCsrfToken(access_token)];
                        case 2:
                            csrfToken = _b.sent();
                            this._authData = {
                                accessToken: access_token,
                                refreshToken: refresh_token,
                                csrfToken: csrfToken,
                            };
                            return [2 /*return*/, this._authData];
                    }
                });
            });
        };
        DataProvider.prototype._fetchGuestToken = function (accessToken, resources, rls) {
            if (resources === void 0) { resources = []; }
            if (rls === void 0) { rls = []; }
            return __awaiter(this, void 0, void 0, function () {
                var url, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._credentials === null) {
                                throw new Error("Missing credentials");
                            }
                            url = this._createUrl("/api/v1/security/guest_token/");
                            return [4 /*yield*/, fetch(url, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + accessToken,
                                    },
                                    body: JSON.stringify({
                                        access_token: accessToken,
                                        user: {
                                            username: "guest",
                                            first_name: "Guest",
                                            last_name: "User",
                                        },
                                        resources: resources,
                                        rls: rls,
                                    }),
                                }).then(function (response) { return response.json(); })];
                        case 1:
                            token = (_a.sent()).token;
                            return [2 /*return*/, token];
                    }
                });
            });
        };
        DataProvider.prototype.fetchCsrfToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var csrfToken;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._fetchAuthData()];
                        case 1:
                            csrfToken = (_a.sent()).csrfToken;
                            return [2 /*return*/, csrfToken];
                    }
                });
            });
        };
        DataProvider.prototype.fetchGuestToken = function (resources, rls) {
            if (rls === void 0) { rls = []; }
            return __awaiter(this, void 0, void 0, function () {
                var accessToken, token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._credentials === null) {
                                throw new Error("Missing credentials");
                            }
                            return [4 /*yield*/, this._fetchAuthData()];
                        case 1:
                            accessToken = (_a.sent()).accessToken;
                            return [4 /*yield*/, this._fetchGuestToken(accessToken, resources, rls)];
                        case 2:
                            token = _a.sent();
                            return [2 /*return*/, token];
                    }
                });
            });
        };
        DataProvider.prototype.fetchDashboardInfo = function (guestToken, id) {
            return __awaiter(this, void 0, void 0, function () {
                var csrfToken, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._fetchAuthData()];
                        case 1:
                            csrfToken = (_a.sent()).csrfToken;
                            url = this._createUrl("/api/v1/dashboard/" + id);
                            return [2 /*return*/, fetch(url, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        "X-CSRFToken": csrfToken,
                                        "X-GuestToken": guestToken,
                                    },
                                })
                                    .then(function (response) { return response.json(); })
                                    .then(function (_a) {
                                    var result = _a.result;
                                    return new Dashboard$1(result);
                                })];
                    }
                });
            });
        };
        DataProvider.prototype.fetchChartData = function (guestToken, query) {
            return __awaiter(this, void 0, void 0, function () {
                var csrfToken, url;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this._fetchAuthData()];
                        case 1:
                            csrfToken = (_a.sent()).csrfToken;
                            url = this._createUrl("/api/v1/chart/data");
                            return [2 /*return*/, fetch(url, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        "X-CSRFToken": csrfToken,
                                        "X-GuestToken": guestToken,
                                    },
                                    body: JSON.stringify(query),
                                })
                                    .then(function (response) { return response.json(); })
                                    .then(function (_a) {
                                    var result = _a.result;
                                    return result;
                                })];
                    }
                });
            });
        };
        return DataProvider;
    }());

    function render(elementId, endpoint, username, password, dashboardUuid, placeholder, autosize, uiConfig) {
        if (autosize === void 0) { autosize = false; }
        var element = document.getElementById(elementId);
        if (!element) {
            console.error("Element with id " + elementId + " not found");
            return;
        }
        var dataProvider = new DataProvider(endpoint, { username: username, password: password });
        ReactDOM.render(React__default.createElement(React__default.StrictMode, null,
            React__default.createElement(Dashboard, { placeholder: placeholder, autosize: autosize, domain: endpoint, dataProvider: dataProvider, uuid: dashboardUuid, uiConfig: uiConfig })), document.getElementById(elementId));
    }

    exports.Dashboard = Dashboard;
    exports.DefaultDataProvider = DataProvider;
    exports.render = render;

    return exports;

}({}, React, ReactDOM));
