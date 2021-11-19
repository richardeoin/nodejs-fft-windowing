import * as windowing from "../dist/windowing.js";

var data = {};

console.log("Applying windowing functions to a uniform array..");

/* Create a uniform array of '1's */
const blank = Array(100).fill(1);

/* Foreach windowing function */
for (const window in windowing) {
  const name = window.replace(/\_/g, " ");
  /* Apply the windowing function to a deep copy of the uniform array */
  data[name] = windowing[window](blank.slice(0));
}

console.log("Plotting result to fft-windowing.pdf..");

console.dir(data);
