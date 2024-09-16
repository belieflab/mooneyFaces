// timeline.js
"use strict";

console.log("Starting timeline.js");
console.log("Current version:", version);

function createTimeline() {
    if (version === "silverstein") {
        console.log("Creating Silverstein timeline");
        return window.createSilversteinTimeline();
    } else if (version === "master") {
        console.log("Creating Master timeline");
        return window.createMasterTimeline();
    } else {
        console.error("Invalid version specified");
        return null;
    }
}

const experimentTimeline = createTimeline();

console.log("Timeline created:", experimentTimeline);
console.log("Timeline length:", experimentTimeline ? experimentTimeline.length : 0);

if (experimentTimeline && experimentTimeline.length > 0) {
    console.log("Calling runExperiment with timeline");
    window.runExperiment(experimentTimeline);
} else {
    console.error("Failed to create timeline or timeline is empty");
}