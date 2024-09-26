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
        stimulus: instructions[2],
        choices: [' ']
    };

    let fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="color:white; font-size:30px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: fixationDuration,
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
            data.response_face = data.response || ""; // Use empty string if no response
            if (["upright", "inverted"].includes(data.test_part)) {
                data.accuracy_face = data.response ? (data.response === data.correct_response) : "";
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
        stimulus: instructions[3],
        choices: [' ']
    };

    let end = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: instructions[4],
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