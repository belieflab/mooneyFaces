"use strict";

const silverstein_full_stim = extendFullStim(full_stim);
const silverstein_full_stim_shuffle = shuffleArray(silverstein_full_stim);

// Define welcome message trial
let welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[0],
};

// Fixation cross trial
let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="color:white; font-size:30px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: fixationDuration,
    data: { test_part: "fixation" },
};

// faces trials
let faces = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        return `
            <img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='${jsPsych.timelineVariable(
                "stimulus",
                true
            )}'>
            <p style='color:white;'><b>Face</b> (press 1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Not a Face</b> (press 0)</p>
        `;
    },
    choices: ["1", "0"],
    trial_duration: trialDuration,
    data: () => jsPsych.timelineVariable("face"),
    on_finish: (data) => {
        writeCandidateKeys(data);
        data.index = trialIterator;
        data.response_face = data.response || ""; // Use empty string if no response
        if (["upright", "inverted"].includes(data.test_part)) {
            data.accuracy_face = data.response
                ? data.response === data.correct_response
                : "";
        } else if (data.test_part === "catch") {
            data.accuracy_catch = data.response
                ? data.response === data.correct_response
                : "";
        }
    },
};

// Modify the gender and age trials
let gender = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        "<p style='color:white;'><b>more masculine</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>more feminine</b> (press 0)</p>",
    choices: ["1", "0"],
    data: jsPsych.timelineVariable("gender"),
    on_finish: (data) => {
        writeCandidateKeys(data);
        data.index = trialIterator;
        data.response_gender = data.response == "1" ? "masculine" : "feminine";
    },
};

let age = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        "<p style='color:white;'><b>Child</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>Adult</b> (press 0)</p>",
    choices: ["1", "0"],
    data: jsPsych.timelineVariable("age"),
    on_finish: (data) => {
        writeCandidateKeys(data);
        data.index = trialIterator;
        trialIterator++;
        data.response_age = data.response == "1" ? "child" : "adult";
    },
};

let facesWithRatings = {
    timeline: [
        faces,
        {
            timeline: [gender, age],
            conditional_function: () => {
                // Get the data from the previous trial
                let data = jsPsych.data.get().last(1).values()[0];

                // Check the response
                if (data.response === "1") {
                    // console.log("true");
                    return true; // Continue to gender and age trials
                } else {
                    console.log(
                        data.response === "0" ? "false" : "no response"
                    );
                    trialIterator++; // Increment the iterator
                    return false; // Skip gender and age trials
                }
            },
        },
    ],
};

// Modify the procedures to use the new facesWithRatings trial
let first_procedure = {
    timeline: [fixation, facesWithRatings],
    randomize_order: false,
    timeline_variables: silverstein_full_stim_shuffle
        .slice(0, 53)
        .map((stim) => ({
            stimulus: stim.stimulus,
            data: stim.data,
        })),
    repetitions: getRepetitions(),
};

let second_procedure = {
    timeline: [fixation, facesWithRatings],
    randomize_order: false,
    timeline_variables: silverstein_full_stim_shuffle
        .slice(53, 106)
        .map((stim) => ({
            stimulus: stim.stimulus,
            data: stim.data,
        })),
};

// Define instruction trials
let instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[1],
    choices: ["1", "0"],
};

let instructions_2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[2],
    choices: ["1", "0"],
};

let instructions_3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[3],
    choices: ["1", "0"],
};

let instructions_4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[4],
    choices: ["1", "0"],
};

let instructions_5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[5],
    choices: [" "], // Updated spacebar key
};

// Break trial
let breaking = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[6],
    choices: [" "],
};

// Break period
let rest = {
    timeline: [breaking],
};

// End trial
let end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: instructions[7],
    choices: "NO_KEYS",
};

// silverstein
let procedureInstructions = [
    instructions_1,
    instructions_2,
    instructions_3,
    instructions_4,
    instructions_5,
];

let silversteinTimeline = [
    welcome,
    ...procedureInstructions,
    first_procedure,
    rest,
    second_procedure,
    dataSave,
    end,
];

$.getScript("exp/main.js");
