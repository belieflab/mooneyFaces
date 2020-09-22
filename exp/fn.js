function saveData(name, data){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: name, filedata: data}));
}

/* start the experiment */
function startExperiment(){
jsPsych.init({
    timeline: timeline,
    show_progress_bar: true,
    preload_images: [original_stimuli, inverted_stimuli],
    on_finish: function(){ saveData("mooney-faces_" + workerId, jsPsych.data.get().csv()); }
    //on_finish: function(){
    //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
        //jsPsych.data.displayData(); 
    //}
});
}

//let this_seed = new Date().getTime();
    //Math.seedrandom(this_seed);

    //let randNum = Math.random() * 1000
    //let randNumRounded = Math.floor(randNum+1)
    // function getParamFromURL(name)
    // {
    //   name = name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
    //   let regexS = "[\?&]"+name+"=([^&#]*)";
    //   let regex = new RegExp( regexS );
    //   let results = regex.exec( window.location.href );
    //   if( results == null )
    //     return "";
    //   else
    //     return results[1];
    // }
   