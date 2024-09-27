//***********************************//
//   EXPERIMENT CONFIGURATION FILE   //
//***********************************//

"use strict";

// select version of the experiment
// const version = "original";
const version = "silverstein";

// debug mode. true will speed up the experiment
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
    original:
        "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2",
    silverstein:
        "https://yalesurvey.ca1.qualtrics.com/jfe/form/SV_2hk9hrLndCovfM2",
};

const counterbalance = false;

let phase = undefined;
