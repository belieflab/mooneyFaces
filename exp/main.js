// procedure

let procedureInstructions = { //This loops over the object
    timeline: [instructions_1, instructions_2], //if you put fixation in front and the feedback after, it will display those in that order
    randomize_order: false,// This is the outer procedure, looping over the stimuli
  }
  
  let first_procedure = {
    timeline: [fixation, first_half],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(0,43),
    // randomize_order: true
  }
  
  let rest = {
    timeline: [breaking],
  }
  
  let second_procedure = {
    timeline: [fixation, second_half],
    randomize_order: false,
    timeline_variables: full_stim_shuffle.slice(43,86),
    // randomize_order: true
  }
  
  timeline.push(welcome)
  timeline.push(procedureInstructions)
  timeline.push(first_procedure) //Object oriented.
  timeline.push(rest);
  timeline.push(second_procedure);
  timeline.push(save_data);
  timeline.push(end);
  