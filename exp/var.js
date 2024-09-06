"use strict";

// Dynamically load the appropriate variable file based on the version
switch (version) {
    case "silverstein":
        import("./var-silverstein.js")
            .then(() => {
                console.log("Loaded var-silverstein.js successfully.");
            })
            .catch((error) => {
                console.error("Failed to load var-silverstein.js:", error);
            });
        break;

    case "master":
        import("./var-master.js")
            .then(() => {
                console.log("Loaded var-master.js successfully.");
            })
            .catch((error) => {
                console.error("Failed to load var-master.js:", error);
            });
        break;

    default:
        console.error("Unknown version:", version);
}
