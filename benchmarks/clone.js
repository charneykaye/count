var Benchmark = require('benchmark'),
  count = require("./../count.js"),
  base = count(1852);

module.exports = {
  name: 'clone',
  onComplete: function () {
    console.log('done');
  },
  fn: function () {
    base.clone();
  },
  async: true
};
