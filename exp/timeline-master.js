"use strict";

let timeline = [];

/* Define welcome message trial */
let welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<h2 style="color:white;">Welcome to the experiment!</h2>' +
            '<p style="color:white;"><i>Press any key to begin.</i></p>'
};

/* Define instructions trials */
let instructions_1 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<h3 style="color:white;">At the beginning of each trial, you will see a black and white image.</h3>' +
            '<h3 style="color:white;">If you believe the image is a <u>face</u>, please press the <u>1</u> key on your keyboard.</h3>' +
            '<h3 style="color:white;">If you believe the image is <u>not a face</u>, please press the <u>0</u> key on your keyboard.</h3>' +
            '<p style="color:white;"><i>Press either response key to continue.</i></p>',
  choices: ['1', '0']
};

let instructions_2 = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<h3 style="color:white;">Please respond as quickly as possible while maintaining a high level of confidence in your choice.</h3>' +
            '<p style="color:white;"><i>Press the spacebar when you are ready to begin the experiment.<i></p>',
  choices: [' ']
};

/* Define first_half and second_half trials */
function createStimulusTrial() {
  return {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      var html = "<img class='center' style='height: 225px; width: 225px; margin-left: 50px;' src='" +
                 jsPsych.timelineVariable('stimulus', true) + "'>" +
                 "<p style='color:white;'><b>Face</b> (press 1)&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <b>Not a Face</b> (press 0)</p>";
      return html;
    },
    choices: ['1', '0'],
    trial_duration: 5000,
    stimulus_height: 225,
    stimulus_width: 225,
    data: jsPsych.timelineVariable('data'),
    on_finish: function(data) {
      data.subjectkey = GUID;
      data.src_subject_id = workerId;
      data.site = siteNumber;
      data.interview_date = today;
      data.interview_age = ageAtAssessment;
      data.sex = sexAtBirth;
      data.phenotype = groupStatus;
      data.handedness = handedness;
      data.index = experimentIterator;
      experimentIterator++;
      data.response_face = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press);

      // Check for accuracy based on response
      if (data.key_press === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response)) {
        data.accuracy_face = true;
      } else if (data.key_press === jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.incorrect_response)) {
        data.accuracy_face = false;
      } else {
        data.accuracy_face = null;
      }
    }
  };
}

let first_half = createStimulusTrial();
let second_half = createStimulusTrial();

/* Define fixation trial */
let fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div style="color:white; font-size:30px;">+</div>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
  data: { test_part: 'fixation' }
};

/* Define break trial */
let breaking = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<h3 style="color:white;">You are now on a halfway break.</h3>' +
            '<p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>',
  choices: [' ']
};

/* Define data saving trial */
let save_data = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='color:white;'>Data saving...</p>" +
            '<div class="sk-cube-grid">' +
            '<div class="sk-cube sk-cube1"></div>' +
            '<div class="sk-cube sk-cube2"></div>' +
            '<div class="sk-cube sk-cube3"></div>' +
            '<div class="sk-cube sk-cube4"></div>' +
            '<div class="sk-cube sk-cube5"></div>' +
            '<div class="sk-cube sk-cube6"></div>' +
            '<div class="sk-cube sk-cube7"></div>' +
            '<div class="sk-cube sk-cube8"></div>' +
            '<div class="sk-cube sk-cube9"></div>' +
            '</div>' +
            "<p style='color:white;'>Do not close this window until the text disappears.</p>",
  choices: jsPsych.NO_KEYS,
  trial_duration: 5000,
  on_finish: function() {
    saveData("mooney_" + workerId, jsPsych.data.get().csv());
    document.getElementById("unload").onbeforeunload = '';
    $("body").addClass("showCursor"); // Return cursor functionality
  }
};

/* Define end of experiment trial */
let end = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p style='color:white;'>Thank you!</p>" +
            "<p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>" +
            "<p style='color:white;'>To leave feedback on this task, please click the following link:</p>" +
            "<p style='color:white;'><a href='" + feedbackLink + "'>Leave Task Feedback!</a></p>" +
            "<p style='color:white;'><i>You may now close the experiment window at any time.</i></p>",
  choices: jsPsych.NO_KEYS
};

// Load the main experiment setup
$.getScript("exp/main.js");
