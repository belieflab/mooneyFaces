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

        var english2 = `<h3 style="color:white;">Please respond as quickly as possible while maintaining a high level of confidence in your choice.</h3>
                  <p style="color:white;"><i>Press the spacebar when you are ready to begin the experiment.</i></p>`;

        var english3 = `<h3 style="color:white;">You are now on a halfway break.</h3>
                  <p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>`;

        var english4 = (score) => `
                  <p style='color:white;'>Thank you!</p>
                  <p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>
                  <p style='color:white;'>To leave feedback on this task, please click the following link:</p>
                  <p style='color:white;'><a href='${feedbackLink}'>Leave Task Feedback!</a></p>
                  <p style='color:white;'><i>You may now close the experiment window at any time.</i></p>,`;
        break;
    case "silverstein":
        var english0 = `
        <h2 style="color:white;">Welcome to the experiment!</h2>
        <p style="color:white;"><i>Press any key to begin.</i></p>`;

        var english1 = `
        <h3 style="color:white;">At the beginning of each trial, you will see a black and white image.</h3>
        <h3 style="color:white;">If you believe the image is a <u>face</u>, please press the <u>1</u> key on your keyboard.</h3>
        <h3 style="color:white;">If you believe the image is <u>not a face</u>, please press the <u>0</u> key on your keyboard.</h3>
        <p style="color:white;"><i>Press either response key to continue.</i></p>`;

        var english2 = `
        <h3 style="color:white;">If you respond that the image is a face, you will make two additional ratings.</h3>
        <h3 style='color:white;'>The instructions will always be shown after you respond, so you don't need to memorize them.</h3>
        <p style="color:white;"><i>Press either response key to continue.</i></p>`;

        var english3 = `
        <h3 style="color:white;">If you believe the face is <u>more masculine</u>, please press the <u>1</u> key on your keyboard.</h3>
        <h3 style="color:white;">If you believe the face is <u>more feminine</u>, please press the <u>0</u> key on your keyboard.</h3>
        <p style="color:white;"><i>Press either response key to continue.</i></p>`;

        var english4 = `
        <h3 style="color:white;">If you believe the face is a <u>child</u>, please press the <u>1</u> key on your keyboard.</h3>
        <h3 style="color:white;">If you believe the face is an <u>adult</u>, please press the <u>0</u> key on your keyboard.</h3>
        <p style="color:white;"><i>Press either response key to continue.</i></p>`;

        var english5 = `
        <h3 style="color:white;">Please respond as quickly as possible while maintaining a high level of confidence in your choice.</h3>
        <p style="color:white;"><i>Press the spacebar when you are ready to begin the experiment.<i></p>`;

        var english6 = `
        <h3 style="color:white;">You are now on a halfway break.</h3>
        <p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>`;

        var english7 = (score) => `
        <p style='color:white;'>Thank you!</p>
        <p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>
        <p style='color:white;'><i>You may now close the experiment window at any time.</i></p>`;
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

switch (version) {
    case "original":
        instructions = [
            english0,
            english1,
            english2,
            english3,
            (score) => english4(score),
        ];
        break;
    case "silverstein":
        instructions = [
            english0,
            english1,
            english2,
            english3,
            english4,
            english5,
            english6,
            (score) => english7(score),
        ];
}

// Translate the instructions to the specified language
translate(language, ...instructions);
