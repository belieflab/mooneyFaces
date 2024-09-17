// timeline.js
"use strict";

// console.log("Starting timeline.js");
// console.log("Current version:", version);

// function createTimeline() {
//     if (version === "silverstein") {
//         console.log("Creating Silverstein timeline");
//         return window.createSilversteinTimeline();
//     } else if (version === "original") {
//         console.log("Creating Original timeline");
//         return window.createOriginalTimeline();
//     } else {
//         console.error("Invalid version specified");
//         return null;
//     }
// }

// const experimentTimeline = createTimeline();

// console.log("Timeline created:", experimentTimeline);
// console.log("Timeline length:", experimentTimeline ? experimentTimeline.length : 0);

// if (experimentTimeline && experimentTimeline.length > 0) {
//     console.log("Calling runExperiment with timeline");
//     window.runExperiment(experimentTimeline);
// } else {
//     console.error("Failed to create timeline or timeline is empty");
// }


const jsPsych = initJsPsych({
    show_progress_bar: true
});

const preload = {
    type: jsPsychPreload,
    images: [original_stimuli, inverted_stimuli, catch_stimuli, catch_stimuli_inverted],
    show_detailed_errors: true,
    on_success: function (file) {
        console.log("File successfully preloaded:", file);
    },
    on_error: function (file) {
        console.error("Error preloading file:", file);
    },
    on_complete: function (data) {
        console.log("Preloading completed");
    },
};

let timeline = [];

switch (version) {
    case "original":
        $.getScript("exp/timeline-original.js");
        break;
    case "silverstein":
        $.getScript("exp/timeline-silverstein.js");
        break;
}