(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
(function (process){
/* global angular */

var app = angular.module('chefLabClient', ['ngAnimate']);

app.constant('chefLabUrl', process.env.CHEF_LAB_URL || 'http://localhost:3000');

require('./chef-lab-provisioner-directive');
require('./chef-lab-template-directive');
require('./fetch-machine-service');
require('./store-service');

}).call(this,require('_process'))
},{"./chef-lab-provisioner-directive":6,"./chef-lab-template-directive":7,"./fetch-machine-service":8,"./store-service":9,"_process":1}],6:[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabProvisioner',
["fetchMachine", "store", "$timeout", "$rootScope", "$window", function (fetchMachine, store, $timeout, $rootScope, $window) {
  return function (scope, element, attrs) {
    scope.fetch = function () {
      scope.machine.status = 'waiting';
      $timeout(function () { scope.$emit('machine:change', scope.machine); });
      fetchMachine(attrs.type, scope.machine.sessionId);
    };

    $rootScope.$on('machine:change', function (event, data) {
      if (data.type === attrs.type) {
        $timeout(function () { scope.machine = data; });
      }
    });

    $window.onbeforeunload = function (event) {
      var message = 'Your virtual machine is still being provisioned. If you leave this page the provisioning may not be completed.';
      if (scope.machine.status === 'waiting') {
        (event || $window.event).returnValue = message;
        return message
      }
    };

    scope.$on('destroy', function (event) { delete $window.onbeforeunload; })

    scope.machine = store.getMachine(attrs.type);

    if (scope.machine.status === 'waiting' || scope.machine.status === 'error') {
      scope.fetch();
    }
  };
}]);

},{}],7:[function(require,module,exports){
/* global angular */

module.exports = angular.module('chefLabClient').directive('chefLabTemplate', ["store", "$rootScope", function (store, $rootScope) {
  return function (scope, element, attrs) {
    function extend(data) {
      ['address', 'user', 'password'].forEach(function (i) {
        if (data[i]) {
          scope[i] = data[i];
        } else {
          scope[i] = '{{' + i + '}}';
        }
      });
    }

    $rootScope.$on('machine:change', function (event, data) {
      if (data.type === attrs.type) {
        extend(data);
        scope.$digest();
      }
    });

    extend(store.getMachine(attrs.type));
  };
}]);

},{}],8:[function(require,module,exports){
/* global angular */

var querystring = require('querystring');

angular.module('chefLabClient').service('fetchMachine', ["chefLabUrl", "$http", "$rootScope", function (chefLabUrl, $http, $rootScope) {
  function munge(type, data) {
    var rdpFileUrlParams = {
      user_name: data[0].username,
      ip_address: data[0].ip
    }

    return {
      status: 'ready',
      type: type,
      expires: data[0].expirationTime,
      address: data[0].ip,
      user: data[0].username,
      password: data[0].password,
      rdpFileUrl: chefLabUrl + '/labs/download_rdp?' +
        querystring.stringify(rdpFileUrlParams),
      sessionId: data[0].session_id
    }
  }

  function urlFor(type, sessionId) {
    var url = chefLabUrl + '/labs/' + type.replace(/-/g, '/') + '/provision.json';
    if (sessionId) {
      url += '?' + querystring.stringify({ session_id: sessionId });
    }
    return url;
  }

  return function (type, sessionId) {
    if (window.location.search.indexOf('fake') !== -1) {
      setTimeout(function () {
        $rootScope.$emit('machine:change', {
          type: type,
          message: 'fuuuuuu\nbar',
          status: ['error', 'ready'][Math.floor((Math.random() * 100) % 2)],
          //status: 'error',
          address: '127.0.0.1',
          user: 'testuser',
          password: 'test123',
          expires: new Date(),
          rdpFileUrl: 'http://test.com'
        });
      }, 5000);
    } else {
      $http.get(urlFor(type, sessionId)).
        success(function (data) {
          $rootScope.$emit('machine:change', munge(type, data));
        }).
        error(function () {
          $rootScope.$emit('machine:change', {
            type: type,
            status: 'error'
          });
        });
    }
  }
}]);

},{"querystring":4}],9:[function(require,module,exports){
/* global angular */

function expired(machine) {
  return new Date(machine.expires) < new Date()
}

module.exports = angular.module('chefLabClient').service('store',
["$rootScope", "$timeout", function ($rootScope, $timeout) {
  var prefix = 'chefLab-machine-';

  function getMachine (type) {
    var machine = JSON.parse(localStorage.getItem(prefix + type));
    if (!machine || expired(machine)) {
      machine = setMachine(type, { type: type });
    }
    return machine;
  }

  function setMachine (type, machine) {
    localStorage.setItem(prefix + type, JSON.stringify(machine));
    return machine;
  }

  $rootScope.$on('machine:change', function (event, data) {
    $timeout(function () { setMachine(data.type, data); });
  });

  return {
    getMachine: getMachine
  }
}]);

},{}]},{},[5]);
