"use strict";

const jsPsych = initJsPsych({
    show_progress_bar: true,
    preload_images: [original_stimuli, inverted_stimuli],
});

// Create the timeline array
let timeline = [];

// Check if version_specific_content exists
if (window.version_specific_content) {
    // Add welcome screen
    if (window.version_specific_content.welcome) {
        timeline.push(window.version_specific_content.welcome);
    }

    // Add the instruction procedure
    if (window.version_specific_content.procedureInstructions) {
        timeline.push(window.version_specific_content.procedureInstructions);
    }

    // Add first procedure block
    if (window.version_specific_content.first_procedure) {
        timeline.push(window.version_specific_content.first_procedure);
    }

    // Add rest/breaking period
    if (window.version_specific_content.rest) {
        timeline.push(window.version_specific_content.rest);
    }

    // Add second procedure block
    if (window.version_specific_content.second_procedure) {
        timeline.push(window.version_specific_content.second_procedure);
    }

    // Add data-saving step
    if (window.version_specific_content.save_data) {
        timeline.push(window.version_specific_content.save_data);
    }

    // Add end screen/sequence
    if (window.version_specific_content.end) {
        timeline.push(window.version_specific_content.end);
    }
} else {
    console.error("version_specific_content is not defined. Check if timeline.js is loaded correctly.");
}

// New jsPsych 7.x syntax
jsPsych.run(timeline);