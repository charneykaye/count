//! count.js
//! version : 0.1.1
//! authors : Nick Kaye
//! license : MIT
//! www.nickkaye.com/count-js

(function (undefined) {
  var count,
    VERSION = '0.1.1',
    words = {
      0: 'zero',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
      10: 'ten',
      11: 'eleven',
      12: 'twelve',
      13: 'thirteen',
      14: 'fourteen',
      15: 'fifteen',
      16: 'sixteen',
      17: 'seventeen',
      18: 'eighteen',
      19: 'nineteen',
      20: 'twenty',
      30: 'thirty',
      40: 'forty',
      50: 'fifty',
      60: 'sixty',
      70: 'seventy',
      80: 'eighty',
      90: 'ninety'
    },
    zeros = {
      1: 'ten',
      2: 'hundred',
      3: 'thousand',
      6: 'million',
      9: 'billion',
      12: 'trillion'
    },
    i,
    oldGlobalCount,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    globalScope = typeof global !== 'undefined' ? global : this,
    hasModule = (typeof module !== 'undefined' && module.exports);

  /**
   * @param {number} num
   * @returns {array} words representing the number
   */
  function wordsForNumber(num) {
    var _n = num,
      _out = [],
      tens,
      hundreds,
      thousands,
      millions,
      billions,
      trillions;

    if (_n === 0) {
      _out.push(words[0]);
    } else {
      while (_n > 0) {
        //
        // from 1 to 19 e.g. "seventeen" (done)
        if (_n < 20) {
          _out.push(words[_n]);
          _n = 0;
        }
        // from 20 to 99 e.g. "eighty" (leave <10)
        else if (_n < 100) {
          tens = Math.floor(_n / 10);
          _out.push(words[tens * 10]);
          _n -= tens * 10;
        }
        // from 100 to 999 e.g. "two hundred" (leave <100)
        else if (_n < 100) {
          hundreds = Math.floor(_n / 100);
          _out.push(words[hundreds]);
          _out.push(zeros[2]);
          _n -= hundreds * 100;
        }
        // from 100 to 999 e.g. "two hundred" (leave <100)
        else if (_n < 1000) {
          hundreds = Math.floor(_n / 100);
          _out.push(words[hundreds]);
          _out.push(zeros[2]);
          _n -= hundreds * 100;
        }
        // TODO: iterate through the possible x10 digits and reference zeros{} language dynamically?
      }
    }
    return _out;
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function defaultParsingFlags() {
    // We need to deep clone this object,
    // and es5 standard is not very helpful.
    return {
      empty: false,
      nullInput: false,
      userInvalidated: false
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

  /**
   * Count Prototype
   */

  extend(count.fn = Count.prototype, {

    /**
     * Create a camel case block out of the input.
     * @returns {string}
     */
    camel: function () {
      var out = '',
        words = this.words();
      for (i = 0; i < words.length; i++) {
        out += capitalize(words[i]);
      }
      return out;
    },

    /**
     * Get the sequence of words that spells out the count
     */
    words: function () {
      return wordsForNumber(this._i);
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
   */

  function hasOwnProp(a, b) {
    return hasOwnProperty.call(a, b);
  }

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
