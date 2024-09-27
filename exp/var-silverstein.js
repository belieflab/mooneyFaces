"use strict";

// All of var-original is used in silverstein version, in addition to these variables

const groundTruthGender = [
    "ambiguous", // F or M
    "masculine", // M
    "ambiguous", // F or M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "ambiguous", // F or M
    "masculine", // M
    "masculine", // M
    "ambiguous", // F or M
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "ambiguous", // F or M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "masculine", // M
    "feminine", // F
    "masculine", // M
    "masculine", // M
    "ambiguous", // F or M
    "ambiguous", // F or M
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "masculine", // M
    "ambiguous", // F or M
    "ambiguous", // F or M
    "ambiguous", // F or M
];

const groundTruthAge = [
    "child", // C
    "adult", // A
    "ambiguous", // C or A
    "adult", // A
    "ambiguous", // C or A
    "adult", // A
    "child", // C
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "child", // C
    "child", // C
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "ambiguous", // C or A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "ambiguous", // C or A
    "adult", // A
    "adult", // A
    "adult", // A
    "adult", // A
    "ambiguous", // C or A
    "adult", // A
    "adult", // A
];

const scrambled = [
    "042",
    "177",
    "213",
    "217",
    "232",
    "233",
    "257",
    "259",
    "799",
    "807",
];

const scrambledStimuli = scrambled.map(
    (scrambled) => `stimuli/scrambled/U0${scrambled}.png`
);
const scrambledInvertedStimuli = scrambled.map(
    (scrambled) => `stimuli/scrambled/U0${scrambled}-180.png`
);

const extendFullStim = (originalStim) => {
    let silversteinStim = [];

    let uprightStim = [...originalStim.slice(0, 43)];

    uprightStim.forEach((stim, i) => {
        if (i < groundTruthGender.length) {
            // Keep the data object as is
            stim.face = {
                ...stim.face,
                groundTruthAge: "",
                groundTruthGender: "",
            };

            // Create separate age and gender objects with ground truth
            stim.age = {
                ...stim.face,
                groundTruthAge: groundTruthAge[i],
            };
            stim.gender = {
                ...stim.face,
                groundTruthGender: groundTruthGender[i],
            };
        }
    });

    silversteinStim.push(...uprightStim);

    let invertedStim = [...originalStim.slice(43, 86)];

    invertedStim.forEach((stim, i) => {
        if (i < groundTruthGender.length) {
            // Keep the data object as is
            stim.face = {
                ...stim.face,
                groundTruthAge: "",
                groundTruthGender: "",
            };

            // Create
            stim.age = {
                ...stim.face,
                groundTruthAge: groundTruthAge[i],
            };
            stim.gender = {
                ...stim.face,
                groundTruthGender: groundTruthGender[i],
            };
        }
    });

    silversteinStim.push(...invertedStim);

    scrambled.forEach((stim, i) => {
        silversteinStim.push({
            stimulus: scrambledStimuli[i],
            face: {
                stim: `U0${stim}.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
            gender: {
                stim: `U0${stim}.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
            age: {
                stim: `U0${stim}.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
        });
        silversteinStim.push({
            stimulus: scrambledInvertedStimuli[i],
            face: {
                stim: `U0${stim}-180.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
            gender: {
                stim: `U0${stim}-180.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
            age: {
                stim: `U0${stim}-180.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1",
                ground_truth_gender: "",
                ground_truth_age: "",
            },
        });
    });

    return silversteinStim;
};
