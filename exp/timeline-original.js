"use strict";

window.createOriginalTimeline = function() {
  console.log("Starting createOriginalTimeline function");

  const { full_stim_shuffle } = window.shared_vars;
    
  let experimentIterator = 1;  // Initialize locally

    let welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<h2 style="color:white;">Welcome to the experiment!</h2>' +
                  '<p style="color:white;"><i>Press any key to begin.</i></p>'
    };

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

    let fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="color:white; font-size:30px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
        data: { test_part: 'fixation' }
    };

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
            // data.site = siteNumber;
            // data.interview_date = today;
            // data.interview_age = ageAtAssessment;
            // data.sex = sexAtBirth;
            // data.phenotype = groupStatus;
            // data.handedness = handedness;
            data.index = experimentIterator;
            experimentIterator++;
            data.response_face = String.fromCharCode(data.key_press);
            if (["upright", "inverted", "catch"].includes(data.test_part)) {
                const keyChar = String.fromCharCode(data.key_press);
                data.accuracy_face = keyChar === data.correct_response;
            }
        },
    };

    // Add gender and age trials here, similar to Silverstein timeline

    let first_procedure = {
      timeline: [fixation, faces],
      timeline_variables: full_stim_shuffle.slice(0, Math.floor(full_stim_shuffle.length / 2)),
      repetitions: getRepetitions()
  };
  
  let second_procedure = {
      timeline: [fixation, faces],
      timeline_variables: full_stim_shuffle.slice(Math.floor(full_stim_shuffle.length / 2))
  };

    let breaking = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<h3 style="color:white;">You are now on a halfway break.</h3>' +
                  '<p style="color:white;"><i>Press the spacebar when you are ready to continue.</i></p>',
        choices: [' ']
    };

    let end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "<p style='color:white;'>Thank you!</p>" +
                  "<p style='color:white;'>You have successfully completed the experiment and your data has been saved.</p>" +
                  "<p style='color:white;'>To leave feedback on this task, please click the following link:</p>" +
                  "<p style='color:white;'><a href='" + feedbackLink + "'>Leave Task Feedback!</a></p>" +
                  "<p style='color:white;'><i>You may now close the experiment window at any time.</i></p>",
        choices: "NO_KEYS"
    };

     // Create the timeline array
     let timeline = [
      welcome,
      instructions_1,
      instructions_2,
      first_procedure,
      breaking,
      second_procedure,
      window.dataSave,
      end
  ];

  // Update the shared experimentIterator
  window.shared_vars.experimentIterator = experimentIterator;

  // Add console.log statements for debugging
  console.log("Creating Original Timeline");
  console.log("Returning timeline:", timeline);

  // Return the timeline array
  return timeline;
};