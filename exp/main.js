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

// Create the timeline array for the entire experiment
let timeline = [];

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

// Make sure the `timeline` array is passed correctly to jsPsych.init when the experiment starts
