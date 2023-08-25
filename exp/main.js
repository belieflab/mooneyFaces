let procedureInstructions = {
    timeline: [
        instructions_1,
        instructions_2,
        instructions_3,
        instructions_4,
        instructions_5,
    ],
    randomize_order: false,
};

let first_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(0, 10),
};

let rest = {
    timeline: [breaking],
};

let second_procedure = {
    timeline: [fixation, faces, if_node],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(53, 106),
};

timeline.push(welcome);
timeline.push(procedureInstructions);
timeline.push(first_procedure);
// timeline.push(rest);
// timeline.push(second_procedure);
timeline.push(save_data);
timeline.push(end);
