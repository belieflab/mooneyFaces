/* create timeline */
let timeline = [];

/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<h1 style="color:white;">Welcome to the experiment!</h1>'+
  '<p style="color:white;">Press any key to begin.</p>'
};


/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white;">At the begining of each trial, you will see a black and white image.</h2>' +
    '<h3 style="color:white;">If you believe the image <u>is a face</u>, please press the <u>1</u> key on your keyboard.</h3>' +
    '<h3 style="color:white;">If you believe the image <u>is not a face</u>, please press the <u>0</u> key on your keyboard.</h3>' +
    '<p style="color:white;">Press either response keys to continue.</p>',
  choices: ['1', '0'],
};


let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white;">If you do not respond within 5 seconds, the next picture will be displayed.</h2>' +
      '<p style="color:white;">Press the spacebar when you are ready to begin the experiment.</p>',
  choices: [32],
};

let first_half = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'), //train_stimuli_array, //jsPsych.timelineVariable('stimulus'),
  choices: ['1', '0'],
  trial_duration: 5000,
  stimulus_height: 225,
  stimulus_width: 225,
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.subject_key = 'GUID';
    data.src_subject_id = workerId;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.trial = experimentIterator;
    experimentIterator++;
    data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);
    // data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response)){
      data.correct_face = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    } else if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.incorrect_response)){
      data.correct_face = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    } else {
      data.correct_face = '';
    }
  }
}



let second_half = {
  type: "image-keyboard-response",
  stimulus: jsPsych.timelineVariable('stimulus'), //train_stimuli_array, //jsPsych.timelineVariable('stimulus'),
  choices: ['1', '0'],
  trial_duration: 5000,
  stimulus_height: 225,
  stimulus_width: 225,
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.subjectKey = 'GUID';
    data.src_subject_id = workerId;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.trial = experimentIterator;
    experimentIterator++;
    data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
    // data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response)){
      data.accuracy_face = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    } else if (data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.incorrect_response)){
      data.accuracy_face = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    } else {
      data.accuracy_face = '';
    }
  }
}

let fixation = {
  type: 'html-keyboard-response',
  stimulus: '<div style="color:white; font-size:60px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  data: {test_part: 'fixation'}
}

let breaking = {
  type: 'html-keyboard-response',
  stimulus: '<h2 style="color:white;">You are now on a halfway break.</h2>'+
  '<p style="color:white;">Press the spacebar when you are ready to continue.</p>',
  choices: [32],
  // trial_duration: 30000
}

let completion = {
  type: "html-keyboard-response",
  stimulus: "<p style='color:white;'>You have completed this task. Please wait for the experimenter to continue.</p>"+
  "<p style='color:white;'>Data Saving...Do not close this window until the text dissapears.”</p>",
  choices: jsPsych.NO_KEYS,
  trial_duration: 10000,
};





 





