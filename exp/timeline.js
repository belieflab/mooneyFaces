// timeline.js
"use strict";

const jsPsych = initJsPsych({
    show_progress_bar: true,
});

const preload = {
    type: jsPsychPreload,
    images: [
        uprightStim,
        invertedStim,
        scrambledStimuli,
        scrambledInvertedStimuli,
    ],
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
