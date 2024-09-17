const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: writeCsvRedirect
};

// Make functions and objects globally accessible
//window.dataSave = dataSave;