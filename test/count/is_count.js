var count = require('../../count');

exports.isCount = {
  setUp: function (done) {
    count.createFromInputFallback = function () {
      throw new Error('input not handled by count');
    };
    done();
  },

  'is count object': function (test) {
    test.expect(12);

    var MyObj = function () {
      },
      extend = function (a, b) {
        var i;
        for (i in b) {
          a[i] = b[i];
        }
        return a;
      };
    MyObj.prototype.toDate = function () {
      return new Date();
    };

    test.ok(count.isCount(count()), 'simple count object');
    test.ok(count.isCount(count(null)), 'invalid count object');
    test.ok(count.isCount(extend({}, count())), 'externally cloned moments are moments');

    test.ok(!count.isCount(new MyObj()), 'myObj is not count object');
    test.ok(!count.isCount(count), 'count function is not count object');
    test.ok(!count.isCount(new Date()), 'date object is not count object');
    test.ok(!count.isCount(Object), 'Object is not count object');
    test.ok(!count.isCount('foo'), 'string is not count object');
    test.ok(!count.isCount(1), 'number is not count object');
    test.ok(!count.isCount(NaN), 'NaN is not count object');
    test.ok(!count.isCount(null), 'null is not count object');
    test.ok(!count.isCount(undefined), 'undefined is not count object');

    test.done();
  },

  'is count with hacked hasOwnProperty': function (test) {
    var obj = {};
    // HACK to suppress jshint warning about bad property name
    obj['hasOwnMoney'.replace('Money', 'Property')] = function () {
      return true;
    };

    test.ok(!count.isCount(obj), 'isCount works even if passed object has a wrong hasOwnProperty implementation (ie8)');
    test.done();
  }
};
