/* Richard Meadows 2013 */

/**
 * Extend Math
 */
Math.sinc = function(n) { return Math.sin(Math.PI*n)/(Math.PI*n); }
Math.bessi0 = function(x) { /* Evaluate modified Bessel function In(x) and n=0. */
	var ax = Math.abs(x);

	if (ax < 3.75) {
		y = x / 3.75; y = y * y;
		return 1.0 + y*(3.5156229+y*(3.0899424+y*(1.2067492+y*(0.2659732+y*(0.360768e-1+y*0.45813e-2)))));
   } else {
		y = 3.75 / ax;
		return (Math.exp(ax) / Math.sqrt(ax)) *
			(0.39894228+y*(0.1328592e-1+y*(0.225319e-2+y*(-0.157565e-2+y*(0.916281e-2+y*
			(-0.2057706e-1+y*(0.2635537e-1+y*(-0.1647633e-1+y*0.392377e-2))))))));
   }
}

/**
 * Windowing functions.
 */
var windows = {
	hann:		function (n, points) { return 0.5 - 0.5*Math.cos(2*Math.PI*n/(points-1)); },
	hamming:	function (n, points) { return 0.54 - 0.46*Math.cos(2*Math.PI*n/(points-1)); },
	cosine:		function (n, points) { return Math.sin(Math.PI*n/(points-1)); },
	lanczos:	function (n, points) { return Math.sinc((2*n/(points-1))-1); },
	gaussian:	function (n, points, alpha) {
				if (!alpha) { alpha = 0.4; }
				return Math.pow(Math.E, -0.5*Math.pow((n-(points-1)/2)/(alpha*(points-1)/2), 2));
			},
	tukey:		function (n, points, alpha) {
				if (!alpha) { alpha = 0.5; }

				if (n < 0.5*alpha*(points-1)) {
					return 0.5*(1+(Math.cos(Math.PI*((2*n/(alpha*(points-1)))-1))));
				} else if (n < (1-(0.5*alpha))*(points-1)) {
					return 1;
				} else {
					return 0.5*(1+(Math.cos(Math.PI*((2*n/(alpha*(points-1)))+1-(2/alpha)))));
				}
			},
	blackman:	function (n, points, alpha) {
				if (!alpha) { alpha = 0.16; }
				return 0.42 - 0.5*Math.cos(2*Math.PI*n/(points-1)) + 0.08*Math.cos(4*Math.PI*n/(points-1));
			},
	exact_blackman:	function (n, points) {
				return 0.4243801 - 0.4973406*Math.cos(2*Math.PI*n/(points-1)) + 0.0782793*Math.cos(4*Math.PI*n/(points-1));
			},
	kaiser:		function (n, points, alpha) {
				if (!alpha) { alpha = 3; }
				return Math.bessi0(Math.PI*alpha*Math.sqrt(1-Math.pow((2*n/(points-1))-1, 2))) / Math.bessi0(Math.PI*alpha);
			},
	nuttall:	function (n, points) {
				return 0.355768 - 0.487396*Math.cos(2*Math.PI*n/(points-1))
					+ 0.144232*Math.cos(4*Math.PI*n/(points-1))
					- 0.012604*Math.cos(6*Math.PI*n/(points-1));
			},
	blackman_harris:function (n, points) {
				return 0.35875 - 0.48829*Math.cos(2*Math.PI*n/(points-1))
					+ 0.14128*Math.cos(4*Math.PI*n/(points-1))
					- 0.01168*Math.cos(6*Math.PI*n/(points-1));
			},
	blackman_nuttall:function (n, points) {
				return 0.3635819 - 0.3635819*Math.cos(2*Math.PI*n/(points-1))
					+ 0.1365995*Math.cos(4*Math.PI*n/(points-1))
					- 0.0106411*Math.cos(6*Math.PI*n/(points-1));
			},
	flat_top:	function (n, points) {
				return 1 - 1.93*Math.cos(2*Math.PI*n/(points-1))
					+ 1.29*Math.cos(4*Math.PI*n/(points-1))
					- 0.388*Math.cos(6*Math.PI*n/(points-1))
					+ 0.032*Math.cos(8*Math.PI*n/(points-1));
			},
}

/**
 * Applies a Windowing Function to an array.
 */
function window(data_array, windowing_function, alpha) {
	var datapoints = data_array.length;

	/* For each item in the array */
	for (var n=0; n<datapoints; ++n) {
		/* Apply the windowing function */
		data_array[n] *= windowing_function(n, datapoints, alpha);
	}

	return data_array;
}

/* -------- Exports -------- */

/**
 * A helper to actually create window functions.
 */
var create_window_function = function(win) {
	return function (array, alpha) { return window(array, windows[win], alpha); };
}

/**
 * Adds a function for each window to the module exports.
 */
for (var win in windows) {
	exports[win] = module.exports[win] = create_window_function(win);
}
