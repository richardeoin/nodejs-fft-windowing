var windowing = require('../windowing.js');
var plot = require('plotter').plot;
var _ = require('underscore');

var data = {};

console.log("Applying windowing functions to a uniform array..");

/* Create a uniform array of '1's */
var blank = new Array();
for (r in _.range(100)) {
  blank.push(1);
}

/* Foreach windowing function */
for (window in windowing) {
  var name = window.replace(/\_/g, ' ');
  /* Apply the windowing function to a deep copy of the uniform array */
  data[name] = windowing[window](blank.slice(0));
}

console.log("Plotting result to fft-windowing.pdf..");

/* Plot the result */
plot({
  data: data,
  filename: 'fft-windowing.pdf',
  title : 'windows',
});


