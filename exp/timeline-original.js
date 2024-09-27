"use strict";

const welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
};

const instructions1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[1],
    choices: ["1", "0"],
};

const instructions2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[2],
    choices: [" "],
};

const fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="color:white; font-size:30px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: fixationDuration,
    data: { test_part: "fixation" },
};

const faces = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        return `
                <img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='${jsPsych.timelineVariable(
                    "stimulus",
                    true
                )}'>
                <p style='color:white;'><b>Face</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>Not a Face</b> (press 0)</p>
            `;
    },
    choices: ["1", "0"],
    trial_duration: trialDuration,
    data: () => jsPsych.timelineVariable("face"),
    on_finish: (data) => {
        writeCandidateKeys(data);
        data.index = trialIterator;
        trialIterator++;
        data.response_face = data.response || ""; // Use empty string if no response
        if (["upright", "inverted"].includes(data.test_part)) {
            data.accuracy_face = data.response
                ? data.response === data.correct_response
                : "";
        }
    },
};

// Add gender and age trials here, similar to Silverstein timeline

const firstHalfProcedure = {
    timeline: [fixation, faces],
    timeline_variables: originalStimShuffle.slice(
        0,
        Math.floor(originalStimShuffle.length / 2)
    ),
    repetitions: getRepetitions(),
};

const secondHalfProcedure = {
    timeline: [fixation, faces],
    timeline_variables: originalStimShuffle.slice(
        Math.floor(originalStimShuffle.length / 2)
    ),
};

const halfwayBreak = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: [" "],
};

const originalTimeline = [
    welcome,
    instructions1,
    instructions2,
    firstHalfProcedure,
    halfwayBreak,
    secondHalfProcedure,
    dataSave,
];

$.getScript("exp/main.js");
