type WindowFunctionName =
  | "hann"
  | "hamming"
  | "cosine"
  | "lanczos"
  | "gaussian"
  | "tukey"
  | "blackman"
  | "exact_blackman"
  | "kaiser"
  | "nuttall"
  | "blackman_harris"
  | "blackman_nuttall"
  | "flat_top";

const sinc = (n: number) => Math.sin(Math.PI * n) / (Math.PI * n);

const bessi0 = (x: number) => {
  /* Evaluate modified Bessel function In(x) and n=0. */
  const ax = Math.abs(x);
  if (ax < 3.75) {
    const y = (x / 3.75) * (x / 3.75);
    return (
      1.0 +
      y *
        (3.5156229 +
          y *
            (3.0899424 +
              y *
                (1.2067492 +
                  y * (0.2659732 + y * (0.360768e-1 + y * 0.45813e-2)))))
    );
  } else {
    const y = 3.75 / ax;
    return (
      (Math.exp(ax) / Math.sqrt(ax)) *
      (0.39894228 +
        y *
          (0.1328592e-1 +
            y *
              (0.225319e-2 +
                y *
                  (-0.157565e-2 +
                    y *
                      (0.916281e-2 +
                        y *
                          (-0.2057706e-1 +
                            y *
                              (0.2635537e-1 +
                                y * (-0.1647633e-1 + y * 0.392377e-2))))))))
    );
  }
};

/**
 * Windowing functions.
 */
const windows = {
  hann: (n: number, points: number) =>
    0.5 - 0.5 * Math.cos((2 * Math.PI * n) / (points - 1)),

  hamming: (n: number, points: number) =>
    0.54 - 0.46 * Math.cos((2 * Math.PI * n) / (points - 1)),

  cosine: (n: number, points: number) => Math.sin((Math.PI * n) / (points - 1)),

  lanczos: (n: number, points: number) => sinc((2 * n) / (points - 1) - 1),

  gaussian: (n: number, points: number, alpha: number = 0.4) => {
    return Math.pow(
      Math.E,
      -0.5 * Math.pow((n - (points - 1) / 2) / ((alpha * (points - 1)) / 2), 2)
    );
  },
  tukey: (n: number, points: number, alpha: number = 0.5) => {
    if (n < 0.5 * alpha * (points - 1)) {
      return (
        0.5 * (1 + Math.cos(Math.PI * ((2 * n) / (alpha * (points - 1)) - 1)))
      );
    } else if (n < (1 - 0.5 * alpha) * (points - 1)) {
      return 1;
    } else {
      return (
        0.5 *
        (1 +
          Math.cos(
            Math.PI * ((2 * n) / (alpha * (points - 1)) + 1 - 2 / alpha)
          ))
      );
    }
  },
  blackman: (n: number, points: number) => {
    return (
      0.42 -
      0.5 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      0.08 * Math.cos((4 * Math.PI * n) / (points - 1))
    );
  },
  exact_blackman: (n: number, points: number) => {
    return (
      0.4243801 -
      0.4973406 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      0.0782793 * Math.cos((4 * Math.PI * n) / (points - 1))
    );
  },
  kaiser: (n: number, points: number, alpha: number = 3) => {
    return (
      bessi0(
        Math.PI * alpha * Math.sqrt(1 - Math.pow((2 * n) / (points - 1) - 1, 2))
      ) / bessi0(Math.PI * alpha)
    );
  },
  nuttall: (n: number, points: number) => {
    return (
      0.355768 -
      0.487396 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      0.144232 * Math.cos((4 * Math.PI * n) / (points - 1)) -
      0.012604 * Math.cos((6 * Math.PI * n) / (points - 1))
    );
  },
  blackman_harris: (n: number, points: number) => {
    return (
      0.35875 -
      0.48829 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      0.14128 * Math.cos((4 * Math.PI * n) / (points - 1)) -
      0.01168 * Math.cos((6 * Math.PI * n) / (points - 1))
    );
  },
  blackman_nuttall: (n: number, points: number) => {
    return (
      0.3635819 -
      0.3635819 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      0.1365995 * Math.cos((4 * Math.PI * n) / (points - 1)) -
      0.0106411 * Math.cos((6 * Math.PI * n) / (points - 1))
    );
  },
  flat_top: (n: number, points: number) => {
    return (
      1 -
      1.93 * Math.cos((2 * Math.PI * n) / (points - 1)) +
      1.29 * Math.cos((4 * Math.PI * n) / (points - 1)) -
      0.388 * Math.cos((6 * Math.PI * n) / (points - 1)) +
      0.032 * Math.cos((8 * Math.PI * n) / (points - 1))
    );
  },
};

/**
 * Applies a Windowing Function to an array.
 */
const applyWindowFunction = (
  data_array: number[],
  windowing_function: Function,
  alpha?: number
) => {
  const datapoints = data_array.length;

  /* For each item in the array */
  for (let n = 0; n < datapoints; ++n) {
    /* Apply the windowing function */
    data_array[n] *= windowing_function(n, datapoints, alpha);
  }

  return data_array;
};

/* -------- Exports -------- */

/**
 * A helper to actually create window functions.
 */
const create_window_function =
  (win: WindowFunctionName) => (array: number[], alpha?: number) =>
    applyWindowFunction(array, windows[win], alpha);
/**
 * Adds a function for each window to the module exports.
 */
const hann = create_window_function("hann");
const hamming = create_window_function("hamming");
const cosine = create_window_function("cosine");
const lanczos = create_window_function("lanczos");
const gaussian = create_window_function("gaussian");
const tukey = create_window_function("tukey");
const blackman = create_window_function("blackman");
const exact_blackman = create_window_function("exact_blackman");
const kaiser = create_window_function("kaiser");
const nuttall = create_window_function("nuttall");
const blackman_harris = create_window_function("blackman_harris");
const blackman_nuttall = create_window_function("blackman_nuttall");
const flat_top = create_window_function("flat_top");

export {
  hann,
  hamming,
  cosine,
  lanczos,
  gaussian,
  tukey,
  blackman,
  exact_blackman,
  kaiser,
  nuttall,
  blackman_harris,
  blackman_nuttall,
  flat_top,
  WindowFunctionName,
};
