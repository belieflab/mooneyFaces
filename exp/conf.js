//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// COMMENT ONE OF THESE OUT
// const version = "silverstein";
const version = "original";

let debug = true;

const score = 1;

const experimentName = "Mooney Faces"; // Name displayed in the browser title bar
const experimentAlias = `mooney_${version}`; // Unique identifier for the experiment, used in data saving

// Experiment Language
const language = "english"; // Language setting for the experiment

// User Interface Theme
// Options: "light", "dark", "white" (useful for images with white backgrounds)
const theme = "dark"; // Default theme setting for the user interface

const repetitions = {
    production: 0,
    debug: 0,
};

let trialDuration = debug ? 50 : 5000;
let fixationDuration = debug ? 50 : 1000;

// Redirect Configuration (Daisy Chaining)
const urlConfig = {
    audio: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2",
    default: "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2",
};

const feedbackLink = "https://google.com";

const counterbalance = false;

let phase = undefined;
