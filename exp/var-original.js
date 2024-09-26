"use strict";

let trialIterator = 1;

const original = [
    "26.2",
    "45.2",
    "19.2",
    "24.2",
    "9.2",
    "20.2",
    "41.2",
    "39.2",
    "43.2",
    "22.2",
    "44.2",
    "25.2",
    "18.2",
    "27.2",
    "46.2",
    "42.2",
    "23.2",
    "21.2",
    "8.2",
    "38.2",
    "40.2",
    "34.2",
    "4.2",
    "10.2",
    "12.2",
    "6.2",
    "36.2",
    "32.2",
    "16.2",
    "14.2",
    "29.2",
    "30.2",
    "13.2",
    "7.2",
    "37.2",
    "35.2",
    "5.2",
    "11.2",
    "28.2",
    "15.2",
    "31.2",
    "33.2",
    "17.2",
];
const inverted = [
    "26.3",
    "24.3",
    "19.3",
    "45.3",
    "39.3",
    "41.3",
    "20.3",
    "9.3",
    "22.3",
    "43.3",
    "18.3",
    "46.3",
    "25.3",
    "44.3",
    "27.3",
    "23.3",
    "42.3",
    "40.3",
    "38.3",
    "8.3",
    "21.3",
    "10.3",
    "4.3",
    "34.3",
    "36.3",
    "6.3",
    "12.3",
    "16.3",
    "32.3",
    "30.3",
    "29.3",
    "14.3",
    "37.3",
    "7.3",
    "13.3",
    "11.3",
    "5.3",
    "35.3",
    "31.3",
    "15.3",
    "28.3",
    "17.3",
    "33.3",
];

let original_stimuli = original.map(
    (stim) => `./stimuli/upright/my_bitmap${stim}.jpg`
);
let inverted_stimuli = inverted.map(
    (stim) => `./stimuli/inverted/my_bitmap${stim}.jpg`
);

let full_stim = [
    ...original.map((stim, i) => ({
        stimulus: original_stimuli[i],
        face: {
            stimulus: stim,
            stim: `${stim}.jpg`,
            test_part: "upright",
            correct_response: "1",
            incorrect_response: "0",
        },
    })),
    ...inverted.map((stim, i) => ({
        stimulus: inverted_stimuli[i],
        face: {
            stimulus: stim,
            stim: `${stim}.jpg`,
            test_part: "inverted",
            correct_response: "0",
            incorrect_response: "1",
        },
    })),
];

let full_stim_shuffle = shuffleArray(full_stim);

// window.shared_vars = {
//   trialIterator,
//   original,
//   inverted,
//   original_stimuli,
//   inverted_stimuli,
//   full_stim,
//   full_stim_shuffle,
// };
