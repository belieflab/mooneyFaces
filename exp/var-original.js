"use strict";

let trialIterator = 1;

const upright = [
    "4.2",
    "5.2",
    "6.2",
    "7.2",
    "8.2",
    "9.2",
    "10.2",
    "11.2",
    "12.2",
    "13.2",
    "14.2",
    "15.2",
    "16.2",
    "17.2",
    "18.2",
    "19.2",
    "20.2",
    "21.2",
    "22.2",
    "23.2",
    "24.2",
    "25.2",
    "26.2",
    "27.2",
    "28.2",
    "29.2",
    "30.2",
    "31.2",
    "32.2",
    "33.2",
    "34.2",
    "35.2",
    "36.2",
    "37.2",
    "38.2",
    "39.2",
    "40.2",
    "41.2",
    "42.2",
    "43.2",
    "44.2",
    "45.2",
    "46.2",
];

const inverted = [
    "4.3",
    "5.3",
    "6.3",
    "7.3",
    "8.3",
    "9.3",
    "10.3",
    "11.3",
    "12.3",
    "13.3",
    "14.3",
    "15.3",
    "16.3",
    "17.3",
    "18.3",
    "19.3",
    "20.3",
    "21.3",
    "22.3",
    "23.3",
    "24.3",
    "25.3",
    "26.3",
    "27.3",
    "28.3",
    "29.3",
    "30.3",
    "31.3",
    "32.3",
    "33.3",
    "34.3",
    "35.3",
    "36.3",
    "37.3",
    "38.3",
    "39.3",
    "40.3",
    "41.3",
    "42.3",
    "43.3",
    "44.3",
    "45.3",
    "46.3",
];

const uprightStim = upright.map(
    (upright) => `./stimuli/upright/my_bitmap${upright}.jpg`
);

const invertedStim = inverted.map(
    (inverted) => `./stimuli/inverted/my_bitmap${inverted}.jpg`
);

const originalStim = [
    ...upright.map((upright, i) => ({
        stimulus: uprightStim[i],
        face: {
            stim: `${upright}.jpg`,
            test_part: "upright",
            correct_response: "1",
            incorrect_response: "0",
        },
    })),
    ...inverted.map((inverted, i) => ({
        stimulus: invertedStim[i],
        face: {
            stim: `${inverted}.jpg`,
            test_part: "inverted",
            correct_response: "0",
            incorrect_response: "1",
        },
    })),
];

const originalStimShuffle = shuffleArray(originalStim);
