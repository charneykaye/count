var count = require('../../count');

exports.isCount = {
  setUp: function (done) {
    done();
  },

  'is camel case': function (test) {
    test.equal(count(1).camel(), 'One');
    test.equal(count(2).camel(), 'Two');
    test.equal(count(3).camel(), 'Three');
    test.equal(count(4).camel(), 'Four');
    test.equal(count(5).camel(), 'Five');
    test.equal(count(6).camel(), 'Six');
    test.equal(count(7).camel(), 'Seven');
    test.equal(count(8).camel(), 'Eight');
    test.equal(count(9).camel(), 'Nine');
    test.equal(count(10).camel(), 'Ten');
    test.equal(count(11).camel(), 'Eleven');
    test.equal(count(12).camel(), 'Twelve');
    test.equal(count(13).camel(), 'Thirteen');
    test.equal(count(14).camel(), 'Fourteen');
    test.equal(count(15).camel(), 'Fifteen');
    test.equal(count(16).camel(), 'Sixteen');
    test.equal(count(17).camel(), 'Seventeen');
    test.equal(count(18).camel(), 'Eighteen');
    test.equal(count(19).camel(), 'Nineteen');
    test.equal(count(20).camel(), 'Twenty');
    test.equal(count(21).camel(), 'TwentyOne');
    test.equal(count(22).camel(), 'TwentyTwo');
    test.equal(count(34).camel(), 'ThirtyFour');
    test.equal(count(42).camel(), 'FortyTwo');
    test.equal(count(57).camel(), 'FiftySeven');
    test.equal(count(64).camel(), 'SixtyFour');
    test.equal(count(75).camel(), 'SeventyFive');
    test.equal(count(89).camel(), 'EightyNine');

    test.done();
  }
};
