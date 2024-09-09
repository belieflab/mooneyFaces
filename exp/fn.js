// Function to save data via a POST request
function saveData(name, data) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "index.php"); // Adjust if you have a specific PHP file like 'write_data.php'
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

// Function to start the experiment
function startExperiment(timeline) {
    // Preload images using jsPsych 7 preload plugin
    let preload = {
        type: jsPsychPreload,
        images: [upright_stimuli, inverted_stimuli] // Ensure upright_stimuli and inverted_stimuli are defined
    };

    // Combine preload with the main timeline
    let full_timeline = [preload].concat(timeline);

    // Initialize jsPsych
    jsPsych.init({
        timeline: full_timeline,
        show_progress_bar: true,
        on_finish: function() {
            // Handle the end of the experiment, e.g., redirect or store data
            console.log('Experiment complete');
        }
    });
}