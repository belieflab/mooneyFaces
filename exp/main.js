// Debugging statement to check if full_stim_shuffle is defined
if (typeof full_stim_shuffle === 'undefined') {
    console.error('full_stim_shuffle is not defined!!!!!!!!!!!!!');
} else {
    console.log('full_stim_shuffle is defined');
}

// let timeline = [];

// let welcome = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus:
//         '<h2 style="color:white;">Welcome to the experiment!</h2>' +
//         '<p style="color:white;"><i>Press any key to begin.</i></p>',
// };

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

// First block of trials
let first_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(0, 53) // Ensure full_stim_shuffle is defined
};

// Break period
let rest = {
    timeline: [breaking]
};

// Second block of trials
let second_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(53, 106) // Ensure the range is correct
};

// Add welcome screen
timeline.push(welcome);

// Add the instruction procedure
timeline.push(procedureInstructions);

// Add first procedure block
timeline.push(first_procedure);

// Add rest/breaking period
timeline.push(rest);

// Add second procedure block
timeline.push(second_procedure);

// Add data-saving step (ensure save_data is a valid timeline object or plugin)
timeline.push(save_data);

// Add end screen/sequence (ensure end is a valid timeline object or plugin)
timeline.push(end);

// New jsPsych 7.x syntax
jsPsych.run(timeline);