var count = require('../../count');

exports.isCount = {
  setUp: function (done) {
    done();
  },

  'CamelCase from 0 to 9': function (test) {
    test.equal(count(0).camel(), 'Zero');
    test.equal(count(1).camel(), 'One');
    test.equal(count(2).camel(), 'Two');
    test.equal(count(3).camel(), 'Three');
    test.equal(count(4).camel(), 'Four');
    test.equal(count(5).camel(), 'Five');
    test.equal(count(6).camel(), 'Six');
    test.equal(count(7).camel(), 'Seven');
    test.equal(count(8).camel(), 'Eight');
    test.equal(count(9).camel(), 'Nine');
    test.done();
  },

  'CamelCase from 10 to 19': function (test) {
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
    test.done();
  },

  'CamelCase from 20 to 99': function (test) {
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
  },

  'CamelCase from 100 to 999': function (test) {
    test.equal(count(120).camel(), 'OneHundredTwenty');
    test.equal(count(221).camel(), 'TwoHundredTwentyOne');
    test.equal(count(322).camel(), 'ThreeHundredTwentyTwo');
    test.equal(count(434).camel(), 'FourHundredThirtyFour');
    test.equal(count(542).camel(), 'FiveHundredFortyTwo');
    test.equal(count(657).camel(), 'SixHundredFiftySeven');
    test.equal(count(764).camel(), 'SevenHundredSixtyFour');
    test.equal(count(875).camel(), 'EightHundredSeventyFive');
    test.equal(count(989).camel(), 'NineHundredEightyNine');
    test.done();
  }

};
