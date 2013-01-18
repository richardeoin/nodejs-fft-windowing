var windowing = require('../windowing.js');
var plot = require('plotter').plot;
var _ = require('underscore');


var data = {};

for (win in windowing) { /* for each windowing function */
	var wfunc = windowing[win];
	
	var blank = new Array();
	for (r in _.range(100)) {
		blank.push(1);
	}
	
	data[win] = wfunc(blank);
}

plot({
	data: data,
	filename: 'fft-windowing.pdf',
	title : 'windows',
});
