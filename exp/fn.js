const dataSave = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: dataSaveAnimation(),
    choices: "NO_KEYS",
    trial_duration: 5000,
    on_finish: () => {
        saveDataPromise(`mooney_${workerId}`, jsPsych.data.get().csv())
            .then((response) => {
                console.log("Data saved successfully.", response);
            })
            .catch((error) => {
                console.log("Failed to save data.", error);
                let errorMessage = error.error || JSON.stringify(error);
                switch (errorMessage) {
                    case '{"success":false}':
                        errorMessage = "The ./data directory does not exist on this server.";
                        break;
                    case "Not Found":
                        errorMessage = "There was an error saving the file to disk.";
                        break;
                    default:
                        errorMessage = "Unknown error.";
                }
                const dataFailure = `
                <div class="error-page">
                    <p>Oh no!</p>
                    <p>An error has occurred and your data has not been saved:</p>
                    <p>${errorMessage}</p>
                    <p>Please wait for the experimenter to continue.</p>
                </div>`;
                document.querySelector("#jspsych-content").innerHTML = dataFailure;
            })
            .finally(() => {
                document.getElementById("unload").onbeforeunload = "";
                $("body").addClass("showCursor");
                closeFullscreen();
            });
    },
};

// Make functions and objects globally accessible
window.dataSave = dataSave;