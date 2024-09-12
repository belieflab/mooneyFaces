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