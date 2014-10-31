//! count.js
//! version : 0.1.0
//! authors : Nick Kaye
//! license : MIT
//! www.nickkaye.com/count-js

(function (undefined) {
  /**
   * Constants
   */

  var count,
    VERSION = '0.1.0',
    oldGlobalCount,
    hasOwnProperty = Object.prototype.hasOwnProperty,
  // NodeJS:
    globalScope = typeof global !== 'undefined' ? global : this,
    hasModule = (typeof module !== 'undefined' && module.exports);

  function hasOwnProp(a, b) {
    return hasOwnProperty.call(a, b);
  }

  function defaultParsingFlags() {
    // We need to deep clone this object, and es5 standard is not very
    // helpful.
    return {
      empty: false,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: false,
      invalidMonth: null,
      invalidFormat: false,
      userInvalidated: false,
      iso: false
    };
  }

  function printMsg(msg) {
    if (count.suppressDeprecationWarnings === false &&
      typeof console !== 'undefined' && console.warn) {
      console.warn('Deprecation warning: ' + msg);
    }
  }

  function deprecate(msg, fn) {
    var firstTime = true;
    return extend(function () {
      if (firstTime) {
        printMsg(msg);
        firstTime = false;
      }
      return fn.apply(this, arguments);
    }, fn);
  }

  /**
   * Constructor
   * @constructs Count
   * @param config
   */
  function Count(config) {
    copyConfig(this, config);
  }

  /**
   * Copy configuration to target object
   * @param to
   * @param from
   * @returns {*}
   */
  function copyConfig(to, from) {
    if (typeof from._isACountObject !== 'undefined') {
      to._isACountObject = from._isACountObject;
    }
    if (typeof from._i !== 'undefined') {
      to._i = from._i;
    }
    if (typeof from._pf !== 'undefined') {
      to._pf = from._pf;
    }
    return to;
  }

  /**
   * Simple object extension
   * @param a
   * @param b
   * @returns {*}
   */
  function extend(a, b) {
    for (var i in b) {
      if (hasOwnProp(b, i)) {
        a[i] = b[i];
      }
    }
    if (hasOwnProp(b, 'toString')) {
      a.toString = b.toString;
    }
    if (hasOwnProp(b, 'valueOf')) {
      a.valueOf = b.valueOf;
    }
    return a;
  }

  /**
   * Top-level: Make a Count object
   * @param config
   * @returns {*}
   */
  function makeCount(config) {
    var input = config._i;
    if (config._i === null) {
      return count.invalid({nullInput: true});
    }
    if (typeof input !== 'number') {
      config._i = Number(input);
    }
    return new Count(config);
  }

  /**
   * Top-level: Make this accessible
   * @param input
   * @returns {*}
   */
  count = function (input) {
    var c;

    // object construction must be done this way.
    // https://github.com/nickckaye/count/issues/1423
    c = {};
    c._isACountObject = true;
    c._i = input;
    c._pf = defaultParsingFlags();

    return makeCount(c);
  };

  count.suppressDeprecationWarnings = false;

  count.createFromInputFallback = deprecate(
      'count construction falls back to js Date. This is ' +
      'discouraged and will be removed in upcoming major ' +
      'release. Please refer to ' +
      'https://github.com/nickckaye/count/issues/1407 for more info.',
    function (config) {
      config._d = new Date(config._i);
    }
  );

  // version number
  count.version = VERSION;

  // compare count object
  count.isCount = function (obj) {
    return obj instanceof Count ||
      (obj != null && hasOwnProp(obj, '_isACountObject'));
  };

  count.invalid = function (flags) {
    var m = count(0);
    if (flags != null) {
      extend(m._pf, flags);
    } else {
      m._pf.userInvalidated = true;
    }
    return m;
  };

  /************************************
   Count Prototype
   ************************************/

  extend(count.fn = Count.prototype, {

    camel: function () {
      return 'ThisWillWork';
    },

    clone: function () {
      return count(this);
    },

    valueOf: function () {
      return +this._i;
    },

    parsingFlags: function () {
      return extend({}, this._pf);
    }

  });

  /**
   * Exposing Count
   * @param shouldDeprecate
   */
  function makeGlobal(shouldDeprecate) {
    /*global ender:false */
    if (typeof ender !== 'undefined') {
      return;
    }
    oldGlobalCount = globalScope.count;
    if (shouldDeprecate) {
      globalScope.count = deprecate(
          'Accessing Count through the global scope is ' +
          'deprecated, and will be removed in an upcoming ' +
          'release.',
        count);
    } else {
      globalScope.count = count;
    }
  }

  // CommonJS module is defined
  if (hasModule) {
    module.exports = count;
  } else if (typeof define === 'function' && define.amd) {
    define('count', function (require, exports, module) {
      if (module.config && module.config() && module.config().noGlobal === true) {
        // release the global variable
        globalScope.count = oldGlobalCount;
      }

      return count;
    });
    makeGlobal(true);
  } else {
    makeGlobal();
  }
}).call(this);
