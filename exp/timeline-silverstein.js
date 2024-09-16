"use strict";

window.createSilversteinTimeline = function() {

    const { full_stim } = window.shared_vars;
    const { extendFullStim } = window.silverstein_vars;
    
    let experimentIterator = 1;  // Initialize locally
    
    const silverstein_full_stim = extendFullStim(full_stim);
    const silverstein_full_stim_shuffle = jsPsych.randomization.shuffle(silverstein_full_stim);

// Define welcome message trial
let welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h2 style="color:white;">Welcome to the experiment!</h2>' +
        '<p style="color:white;"><i>Press any key to begin.</i></p>',
};

// Fixation cross trial
let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="color:white; font-size:30px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
    data: { test_part: "fixation" },
};

// Define face stimuli trial
let faces = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        return `
            <img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='${jsPsych.timelineVariable("stimulus", true)}'>
            <p style='color:white;'><b>Face</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>Not a Face</b> (press 0)</p>
        `;
    },
    choices: ["1", "0"],
    trial_duration: 5000,
    data: () => jsPsych.timelineVariable("data"),
    on_finish: (data) => {
        data.src_subject_id = workerId;
        data.index = experimentIterator;
        data.response_face = String.fromCharCode(data.key_press);
        // Accuracy handling based on test_part (upright/inverted/catch)
        if (["upright", "inverted", "catch"].includes(data.test_part)) {
            // Convert the key_press to the corresponding character
            const keyChar = String.fromCharCode(data.key_press);

            // Compare the key press with the correct response
            data.accuracy_face = keyChar === data.correct_response;
        }
    },
};

// Gender rating trial
let gender = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        return "<p style='color:white;'><b>more masculine</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>more feminine</b> (press 0)</p>";
    },
    choices: ["1", "0"],
    data: jsPsych.timelineVariable("gender"),
    on_finish: (data) => {
        // data.subjectkey = GUID;
        data.src_subject_id = workerId;
        // data.site = siteNumber;
        // data.interview_date = today;
        // data.interview_age = ageAtAssessment;
        // data.sex = sexAtBirth;
        // data.phenotype = groupStatus;
        // data.handedness = handedness;
        data.index = experimentIterator;
        data.response_gender = data.key_press == "1" ? "masculine" : "feminine";
    },
};

// Age rating trial
let age = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: () => {
        return "<p style='color:white;'><b>Child</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>Adult</b> (press 0)</p>";
    },
    choices: ["1", "0"],
    data: jsPsych.timelineVariable("age"),
    on_finish: (data) => {
        // data.subjectkey = GUID; 
        data.src_subject_id = workerId;
        // data.site = siteNumber;
        // data.interview_date = today;
        // data.interview_age = ageAtAssessment;
        // data.sex = sexAtBirth;
        // data.phenotype = groupStatus;
        // data.handedness = handedness;
        data.index = experimentIterator;
        experimentIterator++;
        data.response_age = data.key_press == "1" ? "child" : "adult";
    },
};

// Conditional node for additional trials based on previous response
let if_node = {
    timeline: [gender, age],
    conditional_function: () => {
        var data = jsPsych.data.get().last(1).values()[0];
        return data.key_press == 49;     },
};

// First block of trials
let first_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(0, 53).map(stim => ({
        // map your stimulus properties here
        stimulus: stim.stimulus,
        data: stim.data,
        // add other properties as needed
    }))
};

let second_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(53, 106).map(stim => ({
        // map your stimulus properties here
        stimulus: stim.stimulus,
        data: stim.data,
        // add other properties as needed
    }))
};

// Define instruction trials
let instructions_1 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">At the beginning of each trial, you will see a black and white image.</h3>' +
        '<h3 style="color:white;">If you believe the image is a <u>face</u>, please press the <u>1</u> key on your keyboard.</h3>' +
        '<h3 style="color:white;">If you believe the image is <u>not a face</u>, please press the <u>0</u> key on your keyboard.</h3>' +
        '<p style="color:white;"><i>Press either response key to continue.</i></p>',
    choices: ["1", "0"],
};

let instructions_2 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">If you respond that the image is a face, you will make two additional ratings.</h3>' +
        "<h3 style='color:white;'>The instructions will always be shown after you respond, so you don't need to memorize them.</h3>" +
        '<p style="color:white;"><i>Press either response key to continue.</i></p>',
    choices: ["1", "0"],
};

let instructions_3 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">If you believe the face is <u>more masculine</u>, please press the <u>1</u> key on your keyboard.</h3>' +
        '<h3 style="color:white;">If you believe the face is <u>more feminine</u>, please press the <u>0</u> key on your keyboard.</h3>' +
        '<p style="color:white;"><i>Press either response key to continue.</i></p>',
    choices: ["1", "0"],
};

let instructions_4 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">If you believe the face is a <u>child</u>, please press the <u>1</u> key on your keyboard.</h3>' +
        '<h3 style="color:white;">If you believe the face is an <u>adult</u>, please press the <u>0</u> key on your keyboard.</h3>' +
        '<p style="color:white;"><i>Press either response key to continue.</i></p>',
    choices: ["1", "0"],
};

let instructions_5 = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">Please respond as quickly as possible while maintaining a high level of confidence in your choice.</h3>' +
        '<p style="color:white;"><i>Press the spacebar when you are ready to begin the experiment.<i></p>',
    choices: [" "], // Updated spacebar key
};

// Break trial
let breaking = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        '<h3 style="color:white;">You are now on a halfway break.</h3>' +
        '<p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>',
    choices: [" "],
};

// Break period
let rest = {
    timeline: [breaking]
};

// Save data and display saving message
let save_data = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        "<p style='color:white;'>Data saving...</p>" +
        '<div class="sk-cube-grid">' +
        "<div class='sk-cube sk-cube1'></div>" +
        "<div class='sk-cube sk-cube2'></div>" +
        "<div class='sk-cube sk-cube3'></div>" +
        "<div class='sk-cube sk-cube4'></div>" +
        "<div class='sk-cube sk-cube5'></div>" +
        "<div class='sk-cube sk-cube6'></div>" +
        "<div class='sk-cube sk-cube7'></div>" +
        "<div class='sk-cube sk-cube8'></div>" +
        "<div class='sk-cube sk-cube9'></div>" +
        "</div>" +
        "<p style='color:white;'>Do not close this window until the text disappears.</p>",
   choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: () => {
        saveData("mooney_" + workerId, jsPsych.data.get().csv());
        document.getElementById("unload").onbeforeunload = "";
        $("body").addClass("showCursor"); // return cursor functionality
        closeFullscreen(); // exit fullscreen
    },
};

// End trial
let end = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
        "<p style='color:white;'>Thank you!</p>" +
        "<p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>" +
        "<p style='color:white;'><i>You may now close the experiment window at any time.</i></p>",
choices: "NO_KEYS",
};

// Procedure instructions timeline
let procedureInstructions = {
    timeline: [
        instructions_1,
        instructions_2,
        instructions_3,
        instructions_4,
        instructions_5,
    ],
    randomize_order: false
};

let timeline = [
    welcome,
    procedureInstructions,
    first_procedure,
    rest,
    second_procedure,
    save_data,
    end
];

window.shared_vars.experimentIterator = experimentIterator;

// Return the timeline array
return timeline;
};