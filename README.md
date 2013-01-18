**nodejs-fft-windowing** applies a [windowing function](http://en.wikipedia.org/wiki/Window_function) to an array of data, making it ready to be [FFT](http://en.wikipedia.org/wiki/Fast_Fourier_transform)'d.

[This article](http://www.ni.com/white-paper/4844/en) by [National Instruments](http://uk.ni.com/) gives a good introduction to why windowing function are useful.

## Installation ##

If you have [npm](https://npmjs.org/) installed, just run:

```
npm install fft-windowing
```

## Usage ##

The [Hann (Hanning) window](http://en.wikipedia.org/wiki/Window_function#Hann_.28Hanning.29_window) is a good general-purpose window. You would use it like so:

```javascript
var windowing = require('fft-windowing');

var raw = [2, 2, 0, -2, -2, 0, 2, 2];

var windowed = windowing.hann(raw);

```

The following windows are available:

- [hann](http://en.wikipedia.org/wiki/Window_function#Hann_.28Hanning.29_window)
- [hamming](http://en.wikipedia.org/wiki/Window_function#Hamming_window)
- [cosine](http://en.wikipedia.org/wiki/Window_function#Cosine_window)
- [lanczos](http://en.wikipedia.org/wiki/Window_function#Lanczos_window)
- [gaussian](http://en.wikipedia.org/wiki/Window_function#Gaussian_windows)
- [tukey](http://en.wikipedia.org/wiki/Window_function#Tukey_window)
- [blackman](http://en.wikipedia.org/wiki/Window_function#Blackman_windows)
- [exact_blackman](http://en.wikipedia.org/wiki/Window_function#Blackman_windows)
- [kaiser](http://en.wikipedia.org/wiki/Window_function#Kaiser_windows)
- [nuttall](http://en.wikipedia.org/wiki/Window_function#Nuttall_window.2C_continuous_first_derivative)
- [blackman_harris](http://en.wikipedia.org/wiki/Window_function#Blackman.E2.80.93Harris_window)
- [blackman_nuttall](http://en.wikipedia.org/wiki/Window_function#Blackman.E2.80.93Nuttall_window)
- [flat_top](http://en.wikipedia.org/wiki/Window_function#Flat_top_window)

The following windows accept an extra parameter, `alpha`:

- [gaussian](http://en.wikipedia.org/wiki/Window_function#Gaussian_windows) default _0.4_
- [tukey](http://en.wikipedia.org/wiki/Window_function#Tukey_window) default _0.5_
- [blackman](http://en.wikipedia.org/wiki/Window_function#Blackman_windows) default _0.16_
- [kaiser](http://en.wikipedia.org/wiki/Window_function#Kaiser_windows) default _0.3_

You would use it like this:

```javascript
var windowing = require('fft-windowing');

var raw = [2, 2, 0, -2, -2, 0, 2, 2];

var windowed = windowing.kaiser(raw, 0.5);

```

## LICENSE ###

MIT
