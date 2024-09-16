"use strict";

const ground_truth_gender = [
    "masculine", "ambiguous", "masculine", "masculine", "masculine", "ambiguous", 
    "masculine", "ambiguous", "masculine", "masculine", "ambiguous", "feminine",
    "masculine", "masculine", "ambiguous", "masculine", "masculine", "masculine", 
    "feminine", "ambiguous", "masculine", "masculine", "ambiguous", "feminine", 
    "masculine", "ambiguous", "masculine", "feminine", "masculine", "masculine", 
    "masculine", "ambiguous", "masculine", "masculine", "masculine", "feminine", 
    "masculine", "masculine", "feminine", "feminine", "masculine", "masculine", 
    "ambiguous"
];

const ground_truth_age = [
    "adult", "adult", "adult", "adult", "adult", "adult", "adult", "ambiguous", 
    "adult", "adult", "ambiguous", "adult", "child", "adult", "adult", "adult", 
    "adult", "adult", "ambiguous", "adult", "adult", "adult", "child", "child", 
    "adult", "ambiguous", "adult", "adult", "adult", "adult", "adult", "ambiguous", 
    "adult", "adult", "adult", "adult", "adult", "adult", "adult", "adult", "adult", 
    "adult", "child"
];

const scrambled = ["042", "177", "213", "217", "232", "233", "257", "259", "799", "807"];

let catch_stimuli = scrambled.map((stim) => `stimuli/scrambled/U0${stim}.png`);
let catch_stimuli_inverted = scrambled.map((stim) => `stimuli/scrambled/U0${stim}-180.png`);

const extendFullStim = (shared_full_stim) => {
    let extended_full_stim = [...shared_full_stim];

    extended_full_stim.forEach((stim, i) => {
        if (i < ground_truth_gender.length) {
            stim.gender = {
                stimulus: stim.data.stimulus,
                ground_truth_gender: ground_truth_gender[i]
            };
            stim.age = {
                stimulus: stim.data.stimulus,
                ground_truth_age: ground_truth_age[i]
            };
        }
    });

    scrambled.forEach((stim, i) => {
        extended_full_stim.push({
            stimulus: catch_stimuli[i],
            data: {
                stimulus: stim,
                stim: `U0${stim}.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1"
            },
            gender: { ground_truth_gender: "" },
            age: { ground_truth_age: "" }
        });
        extended_full_stim.push({
            stimulus: catch_stimuli_inverted[i],
            data: {
                stimulus: `${stim}-180.png`,
                stim: `U0${stim}-180.png`,
                test_part: "catch",
                correct_response: "0",
                incorrect_response: "1"
            },
            gender: { ground_truth_gender: "" },
            age: { ground_truth_age: "" }
        });
    });

    return extended_full_stim;
};

window.silverstein_vars = {
    ground_truth_gender,
    ground_truth_age,
    scrambled,
    catch_stimuli,
    catch_stimuli_inverted,
    extendFullStim
};