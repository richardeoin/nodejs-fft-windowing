var windowing = require('../windowing.js');
var plot = require('plotter').plot;
var _ = require('underscore');


var data = {};

/* Create a blank array of '1's to set the windowing functions */
var blank = new Array();
for (r in _.range(100)) {
	blank.push(1);
}

for (win in windowing) { /* for each windowing function */
	var name = win.replace(/\_/g, ' ');
	/* Apply the windowing function to a deep copy of the black array */
	data[name] = windowing[win](blank.slice(0));
}

/* Plot the result */
plot({
	data: data,
	filename: 'fft-windowing.pdf',
	title : 'windows',
});


