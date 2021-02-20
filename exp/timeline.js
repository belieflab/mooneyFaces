/* create timeline */
let timeline = [];

/* define welcome message trial */
let welcome = {
  type: "html-keyboard-response",
  stimulus: '<h2 style="color:white;">Welcome to the experiment!</h2>'+
  '<p style="color:white;"><i>Press any key to begin.</i></p>'
};


/* define instructions trial */
let instructions_1 = {
  type: "html-keyboard-response",
  stimulus: '<h3 style="color:white;">At the begining of each trial, you will see a black and white image.</h3>' +
    '<h3 style="color:white;">If you believe the image is a <u>face</u>, please press the <u>1</u> key on your keyboard.</h3>' +
    '<h3 style="color:white;">If you believe the image is <u>not a face</u>, please press the <u>0</u> key on your keyboard.</h3>' +
    '<p style="color:white;"><i>Press either response keys to continue.</i></p>',
  choices: ['1', '0'],
};


let instructions_2 = {
  type: "html-keyboard-response",
  stimulus: '<h3 style="color:white;">Please respond as quickly as possible while maintaining a high level of confidence in your choice.</h3>' +
      '<p style="color:white;"><i>Press the spacebar when you are ready to begin the experiment.<i></p>',
  choices: [32],
};

let first_half = {
  type: "html-keyboard-response",
  stimulus: function(){
    var html = "<img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='"+jsPsych.timelineVariable('stimulus', true)+"'>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<p style='color:white;'>Face (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Not a Face (press 0)</p>";
    // "<p style='color:white;'>Press 1 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Press 0</p>";
    return html;
  },
  choices: ['1', '0'],
  trial_duration: 5000,
  stimulus_height: 225,
  stimulus_width: 225,
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.subject_key = GUID;
    data.src_subject_id = workerId;
    data.site = siteNumber;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.phenotype = groupStatus;
    data.handedness = handedness;
    data.index = experimentIterator;
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
  type: "html-keyboard-response",
  stimulus: function(){
    var html = "<img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='"+jsPsych.timelineVariable('stimulus', true)+"'>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<br>"+
    "<p style='color:white;'>Face (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Not a Face (press 0)</p>";
    // "<p style='color:white;'>Press 1 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Press 0</p>";
    return html;
  },
  choices: ['1', '0'],
  trial_duration: 5000,
  stimulus_height: 225,
  stimulus_width: 225,
  data: jsPsych.timelineVariable('data'),
  on_finish: function(data){
    data.subjectKey = GUID;
    data.src_subject_id = workerId;
    data.site = siteNumber;
    data.interview_date = today;
    data.interview_age = ageAtAssessment;
    data.sex = sexAtBirth;
    data.index = experimentIterator;
    data.handedness = handedness;
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
  stimulus: '<div style="color:white; font-size:30px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  data: {test_part: 'fixation'}
}

let breaking = {
  type: 'html-keyboard-response',
  stimulus: '<h3 style="color:white;">You are now on a halfway break.</h3>'+
  '<p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>',
  choices: [32],
  // trial_duration: 30000
}

let save_data = {
  type: "html-keyboard-response",
  stimulus: "<p style='color:white;'>Data saving...</p>"+
  '<div class="sk-cube-grid">'+
'<div class="sk-cube sk-cube1"></div>'+
'<div class="sk-cube sk-cube2"></div>'+
'<div class="sk-cube sk-cube3"></div>'+
'<div class="sk-cube sk-cube4"></div>'+
'<div class="sk-cube sk-cube5"></div>'+
'<div class="sk-cube sk-cube6"></div>'+
'<div class="sk-cube sk-cube7"></div>'+
'<div class="sk-cube sk-cube8"></div>'+
'<div class="sk-cube sk-cube9"></div>'+
'</div>'+
  "<p style='color:white;'>Do not close this window until the text dissapears.</p>",

  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
  on_finish: function(){
    saveData("mooney_" + workerId, jsPsych.data.get().csv());
    document.getElementById("unload").onbeforeunload='';
    $(document).ready(function(){
    $("body").addClass("showCursor"); // returns cursor functionality
});
  }
};

let end = {
  type: "html-keyboard-response",
  stimulus:   "<p style='color:white'>Thank you!</p>"+
  "<p style='color:white'>You have successfully completed the experiment and your data has been saved.</p>"+
  "<p style='color:white'>To leave feedback on this task, please click the following link:</p>"+
  "<p style='color:white;'><a href="+feedbackLink+">Leave Task Feedback!</a></p>"+
  // "<p>Please wait for the experimenter to continue.</p>"+
  "<p style='color:white'><i>You may now close the expriment window at anytime.</i></p>",
  choices: jsPsych.NO_KEYS,
};

// call main
$.getScript("exp/main.js");








 





