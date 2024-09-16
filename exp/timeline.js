"use strict";

let version_specific_content;

switch (version) {
    case "silverstein":
        version_specific_content = window.createSilversteinTimeline();
        break;
    case "master":
        version_specific_content = window.createMasterTimeline();
        break;
    default:
        console.error("Invalid version specified in conf.js");
}

// Make version-specific content globally accessible
window.version_specific_content = version_specific_content;