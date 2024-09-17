"use strict";

  console.log("Starting createOriginalTimeline function");

    let welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions[0]
    };

    let instructions_1 = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions[1],
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
        trial_duration: trialDuration,
        data: () => jsPsych.timelineVariable("data"),
        on_finish: (data) => {
            writeCandidateKeys(data);
            data.index = trialIterator;
            trialIterator++;
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

// original
let originalTimeline = [
    welcome,
    instructions_1,
    instructions_2,
    first_procedure,
    breaking,
    second_procedure,
    dataSave,
    end
];

$.getScript("exp/main.js");

  // Add console.log statements for debugging
  console.log("Creating Original Timeline");
  console.log("Returning timeline:", timeline);