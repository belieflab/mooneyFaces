"use strict";

// let experimentIterator = 1;

// Upright and Inverted stimuli arrays
// const upright = [
//     "26.2", "45.2", "19.2", "24.2", "9.2", "20.2", "41.2", "39.2", "43.2", "22.2",
//     "44.2", "25.2", "18.2", "27.2", "46.2", "42.2", "23.2", "21.2", "8.2", "38.2",
//     "40.2", "34.2", "4.2", "10.2", "12.2", "6.2", "36.2", "32.2", "16.2", "14.2",
//     "29.2", "30.2", "13.2", "7.2", "37.2", "35.2", "5.2", "11.2", "28.2", "15.2",
//     "31.2", "33.2", "17.2"
// ];

// const inverted = [
//     "26.3", "45.3", "19.3", "24.3", "9.3", "20.3", "41.3", "39.3", "43.3", "22.3",
//     "44.3", "25.3", "18.3", "27.3", "46.3", "42.3", "23.3", "21.3", "8.3", "38.3",
//     "40.3", "34.3", "4.3", "10.3", "12.3", "6.3", "36.3", "32.3", "16.3", "14.3",
//     "29.3", "30.3", "13.3", "7.3", "37.3", "35.3", "5.3", "11.3", "28.3", "15.3",
//     "31.3", "33.3", "17.3"
// ];

// Ground truth gender and age arrays
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

// Scrambled stimuli
const scrambled = ["042", "177", "213", "217", "232", "233", "257", "259", "799", "807"];

// Create stimuli lists
// let upright_stimuli = upright.map((stim) => `stimuli/upright/my_bitmap${stim}.jpg`);
// let inverted_stimuli = inverted.map((stim) => `stimuli/inverted/my_bitmap${stim}.jpg`);
let catch_stimuli = scrambled.map((stim) => `stimuli/scrambled/U0${stim}.png`);
let catch_stimuli_inverted = scrambled.map((stim) => `stimuli/scrambled/U0${stim}-180.png`);

// Combine upright, inverted, and scrambled stimuli into full_stim
// let full_stim = [];

// Add upright stimuli
for (let i = 0; i < upright.length; i++) {
    full_stim.push({
        stimulus: upright_stimuli[i],
        data: {
            stimulus: upright[i],
            stim: `${upright[i]}.jpg`,
            test_part: "upright",
            correct_response: "1",
            incorrect_response: "0",
        },
        gender: {
            stimulus: upright[i],
            ground_truth_gender: ground_truth_gender[i],
        },
        age: {
            stimulus: upright[i],
            ground_truth_age: ground_truth_age[i],
        },
    });
}

// Add inverted stimuli
for (let i = 0; i < inverted.length; i++) {
    full_stim.push({
        stimulus: inverted_stimuli[i],
        data: {
            stimulus: inverted[i],
            stim: `${inverted[i]}.jpg`,
            test_part: "inverted",
            correct_response: "0",
            incorrect_response: "1",
        },
        gender: {
            stimulus: inverted[i],
            ground_truth_gender: ground_truth_gender[i],
        },
        age: {
            stimulus: inverted[i],
            ground_truth_age: ground_truth_age[i],
        },
    });
}

// Add scrambled stimuli (upright and inverted)
for (let i = 0; i < scrambled.length; i++) {
    full_stim.push({
        stimulus: catch_stimuli[i],
        data: {
            stimulus: scrambled[i],
            stim: `U0${scrambled[i]}.png`,
            test_part: "catch",
            correct_response: "0",
            incorrect_response: "1",
        },
        gender: { ground_truth_gender: "" },
        age: { ground_truth_age: "" },
    });
    full_stim.push({
        stimulus: catch_stimuli_inverted[i],
        data: {
            stimulus: `${scrambled[i]}-180.png`,
            stim: `U0${scrambled[i]}-180.png`,
            test_part: "catch",
            correct_response: "0",
            incorrect_response: "1",
        },
        gender: { ground_truth_gender: "" },
        age: { ground_truth_age: "" },
    });
}

// Shuffle the full stimuli array without repeats
// const full_stim_shuffle = jsPsych.randomization.shuffle(full_stim);
