   /* start the experiment */
   function startExperiment(){
    jsPsych.init({
      timeline: timeline,
      show_progress_bar: true,
      preload_images: [original_stimuli, inverted_stimuli],
      on_finish: function(){ saveData("mooney-faces_" + workerID, jsPsych.data.get().csv()); }
      //on_finish: function(){
        //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
          //jsPsych.data.displayData(); 
      //}
    });
}
