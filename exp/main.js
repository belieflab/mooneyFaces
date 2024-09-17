"use strict";

// Initialize jsPsych
// const jsPsych = initJsPsych({
//     show_progress_bar: true,
//     preload_images: [original_stimuli, inverted_stimuli],
// });

// This function will be called from timeline.js
// function runExperiment(timeline) {
//     console.log("Running experiment with timeline:", timeline);
//     if (timeline && timeline.length > 0) {
//         jsPsych.run(timeline);
//     } else {
//         console.error("Timeline is empty or undefined. Cannot start experiment.");
//     }
// }

// Export the runExperiment function so it can be called from timeline.js
// window.runExperiment = runExperiment;

// Remove the timeline creation and jsPsych.run() call from here
// The timeline will be created in timeline.js and passed to runExperiment

switch (version) {
    case "original":
        timeline.push(...originalTimeline);
        break;
    case "silverstein":
        timeline.push(...silversteinTimeline);
        break;
}

if (subjectId) {
    // New jsPsych 7.x syntax
    jsPsych.run(timeline);
}