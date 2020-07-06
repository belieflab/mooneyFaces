    /* create timeline */
    let timeline = [];

    /* define welcome message trial */
    let welcome = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">Welcome to the experiment! Press any key to begin.</p>'
    };
    

    /* define instructions trial */
    let instructions_1 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">At the begning of each trial, you will see a black and white image.</p>' +
        '<p style="color:white;">If you believe the image is a <strong>face</strong>, please press the <strong>1</strong> key on your keyboard.</p>' +
        '<p style="color:white;">If you believe the image <strong>is not</strong> a face, please press the <strong>0</strong> key on your keyboard.</p>' +
        '<p style="color:white;">Press either response keys to continue.</p>',
      choices: ['1', '0'],
    };
    

    let instructions_2 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">This experiment will take approximately 8 minutes with a break in between.</p>' +
          '<p style="color:white;">Press the space bar when you are ready to begin the experiment.</p>',
      choices: [32],
    };
   
    let first_half = {
        type: "image-keyboard-response",
        stimulus: jsPsych.timelineVariable('stimulus'), //train_stimuli_array, //jsPsych.timelineVariable('stimulus'),
        choices: ['1', '0'],
        trial_duration: 5000,
        stimulus_height: 225,
        stimulus_width: 225,
        data: jsPsych.timelineVariable('data'),
        on_finish: function(data){
          data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
          data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
          
        }
      }
  
      let second_half = {
        type: "image-keyboard-response",
        stimulus: jsPsych.timelineVariable('stimulus'), //train_stimuli_array, //jsPsych.timelineVariable('stimulus'),
        choices: ['1', '0'],
        trial_duration: 5000,
        stimulus_height: 225,
        stimulus_width: 225,
        data: jsPsych.timelineVariable('data'),
        on_finish: function(data){
          data.response = jsPsych.pluginAPI.convertKeyCodeToKeyCharacter(data.key_press)
          data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
          
        }
      }
   
    let fixation = {
      type: 'html-keyboard-response',
      stimulus: '<div style="color:white; font-size:60px;">+</div>',
      choices: jsPsych.NO_KEYS,
      trial_duration: 1000,
      data: {test_part: 'fixation'}
    }

    let breaking = {
      type: 'html-keyboard-response',
      stimulus: '<p style="color:white;">You may rest for a up to a 30 second break.<br><br>Otherwise, press the spacebar to continue immediately.</p>',
      choices: [32],
      trial_duration: 30000
    
    }
    
    let completion= {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">You have now completed the task.</p> ' +
          '<p style="color:white;">Thank you!</p> ',
      choices: jsPsych.NO_KEYS,
      trial_duration: 5000
    };
  


    /* END PHASE II OF TASK: CLASSIFICATION and ANTICIPATION PHASE */



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
   

 





