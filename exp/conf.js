//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// COMMENT ONE OF THESE OUT
// const version = "silverstein";
const version = "master";

let debug = true

// Experiment Language
const language = "english"; // Language setting for the experiment

// User Interface Theme
// Options: "light", "dark", "white" (useful for images with white backgrounds)
const theme = "dark"; // Default theme setting for the user interface

const repetitions = {
    production: 0,
    debug: 0,
};

// Redirect Configuration (Daisy Chaining)
const urlConfig = {
    audio: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2",
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2"
};

const feedbackLink = "https://google.com"