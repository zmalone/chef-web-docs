(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/decode.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/encode.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/index.js":[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/decode.js","./encode":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/encode.js"}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/app.js":[function(require,module,exports){
(function (process){
/* global angular */

var app = angular.module('chefLabClient', []);

app.constant('chefLabUrl', process.env.CHEF_LAB_URL || 'http://localhost:3000');

require('./chef-lab-provisioner-directive');
require('./fetch-machine-service');
require('./store-service');

}).call(this,require('_process'))
},{"./chef-lab-provisioner-directive":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/chef-lab-provisioner-directive.js","./fetch-machine-service":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/fetch-machine-service.js","./store-service":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/store-service.js","_process":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/process/browser.js"}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/chef-lab-provisioner-directive.js":[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner', 
["fetchMachine", "store", "$timeout", "$rootScope", "$window", function (fetchMachine, store, $timeout, $rootScope, $window) {
  return function (scope, element, attrs) {

    scope.fetch = function(force) {

      if (scope.visitor.prefs.suppressCloudshareModal || force === true) {
        $('#cloudshare-modal').foundation('reveal', 'close');
        
        fetchMachine(attrs, scope.visitor);
      }
      else {
        $('#cloudshare-modal').foundation('reveal', 'open');
      }
    };

    scope.visitor = store.visitor.get();

    scope.$watch('visitor', function() { 
      store.visitor.set(this.last);
    }, true);
  };
}]);

},{}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/fetch-machine-service.js":[function(require,module,exports){
/* global angular */

var querystring = require('querystring');

angular.module('chefLabClient').service('fetchMachine', ["chefLabUrl", "$http", "$rootScope", "$timeout", function (chefLabUrl, $http, $rootScope, $timeout) {

  function urlFor(type, id) {
    var url = chefLabUrl + '/labs/' + type.replace(/-/g, '/');
    url += '/provision' + (id ? '?' + querystring.stringify({ uid: id }) : '');
    return url;
  }

  return function (attrs, visitor) {

    if (attrs.chefLabProvisioner === 'cloudshare') {
      window.open(urlFor(attrs.type, visitor.id), '_blank');
    }
  }
}]);

},{"querystring":"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/node_modules/browserify/node_modules/querystring-es3/index.js"}],"/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/store-service.js":[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').service('store', ["$timeout", function($timeout) {

  function visitor(v) {

    if (v) {
      localStorage.setItem('visitor', JSON.stringify(v));
    }
    else {
      v = JSON.parse(localStorage.getItem('visitor')) || {
        id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
        }),
        prefs: {
          suppressCloudshareModal: false
        }
      };
    }
    
    return v;
  }

  return {
    visitor: {
      get: function() { return visitor() },
      set: function(v) { return visitor(v) }
    }
  }
}]);

},{}]},{},["/Users/christiannunciato/oc/code/opscode/learn-chef/lib/chef-lab-client/src/app.js"]);
