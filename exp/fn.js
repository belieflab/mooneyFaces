// Function to save data via a POST request
function saveData(name, data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php"); // Adjust if you have a specific PHP file like 'write_data.php'
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

/* start the experiment */
function startExperiment(){
    const jsPsych = initJsPsych({
        timeline: timeline,
        show_progress_bar: true,
        preload_images: [original_stimuli, inverted_stimuli],
    });

    // jsPsych.run(timeline);
}

startExperiment();