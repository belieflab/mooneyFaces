"use strict";

// Translation
// This file contains the instructions for the experiment,
// which will be translated to the language specified in exp/conf.js

let instructions = [];

// Switch version to determine the instructions for the experiment and language
/**
 * Translates the text of instuctions, buttons, etc. based on the selected language.
 *
 * @param {string} version - The version of the task defined in exp/conf.js.
 *                           Default version is "standard".
 */
switch (version) {
    case "original":
        var english0 = `<h2 style="color:white;">Welcome to the experiment!</h2>
                  <p style="color:white;"><i>Press any key to begin.</i></p>`;

        var english1 = `<h3 style="color:white;">At the beginning of each trial, you will see a black and white image.</h3>
                  <h3 style="color:white;">If you believe the image is a <u>face</u>, please press the <u>1</u> key on your keyboard.</h3>
                  <h3 style="color:white;">If you believe the image is <u>not a face</u>, please press the <u>0</u> key on your keyboard.</h3>
                  <p style="color:white;"><i>Press either response key to continue.</i></p>`;

        var english2 = `
        <p>Welcome to the server-side experiment!</p>
        <p>In this experiment, you will be presented with the words red and green. Please press the key "y" if the word is congruent or "n" if the word is incongruent.</p>
        <p>Press Space to continue.</p>`;

        var english3 = (score) => `
        <p>Thank you!</p>
        <p>You have successfully completed this task and your data has been saved.</p>
        <p>Your final score is ${score}.</p>
        ${
            !src_subject_id // redirects only occur for workerId, participantId, PROLIFIC_PID
                ? `<p>You will be redirected to the next part of the experiment; If you are not redirected please click <a href="${redirectLink}">here</a>.</p>`
                : ""
        }`;
        break;
}

// Aggregate the instructions of your language choice
// These will be bassed to the translate function
/**
 * Translates the text of instuctions, buttons, etc. based on the selected language.
 *
 * @param {language} version - The language of the task defined exp/conf.js.
 *                             Default language is English.
 */

switch (language) {
    default:
        instructions = [
            english0,
            english1,
            english2,
            (score) => english3(score), // Store it as a function that accepts score
        ];
        break;
}

// Translate the instructions to the specified language
translate(language, ...instructions);
