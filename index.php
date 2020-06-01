<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);
?>


<!DOCTYPE html>
<html>
  <head>
    <title>Self-Deception Task</title>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body  style="background-color:grey;">  
  
  <div class="loading centeredDiv">
    <h1 class="loading">Loading...</h1>
  </div>
  <div id="consentHolder" class="consent centeredDiv">
  <h3 id="consentPreamble" class="consent" style="color:white;">In order for us to conduct this test online, we need to include the standard consent form below. <br /> <br /> </h3>
  <div id="consentForm" class="consent consent-box"> 
    <h2 id="consentHeading" class="consent">
      CONSENT FOR PARTICIPATION IN A RESERCH PROJECT 200 FR. 1 (2016-2)
      <br>
      YALE UNIVERSITY SCHOOL OF MEDICINE CONNECTICUT MENTAL HEALTH CENTER
    </h2> 

    <h2>
      
    </h2>
    <p id="consentInstructions" class="consent">
      <b>Study Title:</b> Computerized Assessment of Psychosis Risk
      <br><br>
      <b>Principal Investigator:</b> Philip R. Corlett, PhD
      <br><br>
      <b>Funding Source:</b> department funds
      <br><br>
      <u><b>Invitation to Participate and Description of Project</b></u>
      <br>
      You are invited to participate in a research study that concerns psychological processes related to beliefs, perceptions, decisions, and personality traits. Due to the nature of psychology experiments, we cannot explain the precise purpose of the experiment until after the session is over. Afterwards, the experimenter will be happy to answer any questions you might have about the purpose of the study.
      <br><br>
      <u><b>Description of Procedures</b></u>
      <br>
      If you agree to participate in this study, this Human Intelligence Task (HIT) will require you to (1) play a computer game using the computer mouse or keys on your keyboard and (2) answer simple questions about your demographics, health (including mental health), beliefs, and personality through an interactive web survey. You will never be asked for personally identifiable information such as your name, address, or date of birth. 
      <br>
      The experiment is designed to take approximately 1 hour. You will have up to six hours to complete the experiment and submit codes for credit. 
      <br><br>
      <u><b>Risks and Inconveniences</b></u>
      <br>
      There are little to no risks associated with this study. Some individuals may experience mild boredom. 
      <br><br>
      <u><b>Economic Considerations</b></u>
      <br>
      You will receive the reward specified on the Mechanical-Turk HIT for completing both the game and the questionnaire. Payment for completion of the HIT is $6.00 with up to a $2.00 bonus based on task performance and a further $40 bonus to individuals who score in the top 1%. Upon finishing the game and submitting the questionnaire, you will receive code numbers. Please record these two code numbers and submit them for payment. 
      <br><br>
      <u><b>Confidentiality</b></u>
      <br>
      We will never ask for your name, birth date, email or any other identifying piece of information. Your data will be pooled with those of others, and your responses will be completely anonymous. We will keep this data indefinitely for possible use in scientific publications and presentations. 
      <br>
      The researcher will not know your name, and no identifying information will be connected to your survey answers in any way. The survey is therefore anonymous. However, your account is associated with an mTurk number that the researcher has to be able to see in order to pay you, and in some cases these numbers are associated with public profiles which could, in theory, be searched. For this reason, though the researcher will not be looking at anyone’s public profiles, the fact of your participation in the research (as opposed to your actual survey responses) is technically considered “confidential” rather than truly anonymous.
      <br><br>
      <u><b>Voluntary Participation</b></u>
      <br>
      Your participation in this study is completely voluntary. You are free to decline to participate or to end participation at any time by simply closing your browser window. However, please note that you must submit both the computer game and questionnaire in order to receive payment. You may decline answering any question by selecting the designated alternative response (e.g., “I do not wish to answer”). Declining questions will not affect payment.
      <br><br>
      <u><b>Questions or Concerns</b></u>
      <br>
      If you have any questions or concerns regarding the experiment, you may contact us here at the lab by emailing BLAMLabRequester@gmail.com If you have general questions about your rights as a research participant, you may contact the Yale University Human Investigation Committee at 203-785-4688 or human.subjects@yale.edu (HSC# 2000026290).

    </p>
  </div>


</div>
<div id="attritionHolder" class="attrition centeredDiv"> 
  <p id="attritionInstructions" class="attrition"></p>
  <input required type="text" id="attritionAns" class="attrition" size="60" style="width:inherit; height:17px; font-size:15px; margin: 0 auto;" />
</div>
<div id="errorMessageHolder" class="error centeredDiv">
  <p id="mobileBrowserErrorMessage">You cannot access this test from a mobile browser. Please use a desktop computer to complete the task.</p>
  <p id="workerIDErrorMessage">You are ineligible for this task, since your worker ID has been recorded as participating in this task already. 
    Please return the HIT.</p>
</div>



  <div id="nextButtonHolder" class="buttonHolder">
  <button id="nextButton" onclick="startExperiment()">CONSENT/NEXT</button>
</div>
</body>
  
  <script>
    /* create timeline */
    let timeline = [];

    /* define welcome message trial */
    let welcome = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">Welcome to the experiment! Press any key to begin.</p>'
    };
    timeline.push(welcome);

    /* define instructions trial */
    let instructions_1 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">At the begning of each trial, you will see a black and white image.</p>' +
        '<p style="color:white;">If you believe the image is a <strong>face</strong>, please press the <strong>1</strong> key on your keyboard.</p>' +
        '<p style="color:white;">If you believe the image <strong>is not</strong> a face, please press the <strong>0</strong> key on your keyboard.</p>' +
        '<p style="color:white;">Press either response keys to continue.</p>',
      choices: ['1', '0'],
    };
    timeline.push(instructions_1);

    let instructions_2 = {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">This experiment will take approximately 8 minutes with a break in between.</p>' +
          '<p style="color:white;">Press the space bar when you are ready to begin the experiment.</p>',
      choices: [32],
    };
    timeline.push(instructions_2);

    /* START TRAINING TRIAL FOR PARTICIPANTS */

    const original = ['26.2', '45.2', '19.2', '24.2', '9.2', '20.2', '41.2', '39.2', '43.2', '22.2', '44.2', '25.2', '18.2', '27.2', '46.2', '42.2', '23.2', '21.2', '8.2', '38.2', '40.2', '34.2', '4.2', '10.2', '12.2', '6.2', '36.2', '32.2', '16.2', '14.2', '29.2', '30.2', '13.2', '7.2', '37.2', '35.2', '5.2', '11.2', '28.2', '15.2', '31.2', '33.2', '17.2']
    const inverted = ['26.3', '24.3', '19.3', '45.3', '39.3', '41.3', '20.3', '9.3', '22.3', '43.3', '18.3', '46.3.1', '25.3', '44.3', '27.3', '23.3', '42.3', '40.3', '38.3', '8.3', '21.3', '10.3', '4.3', '34.3', '36.3', '6.3', '12.3', '16.3', '32.3', '30.3', '29.3', '14.3', '37.3', '7.3', '13.3', '11.3', '5.3', '35.3', '31.3', '15.3', '28.3', '17.3', '33.3']

    let original_stimuli = [];
    for (let i = 0; i < original.length ; i++){
      original_stimuli.push("stimuli/original/my_bitmap" + original[i] + ".jpg");
      // console.log(original_stimuli[i]);
    }

    let inverted_stimuli = [];
    for (let i = 0; i < inverted.length ; i++){
      inverted_stimuli.push("stimuli/inverted/my_bitmap" + inverted[i] + ".jpg");
      // console.log(inverted_stimuli[i]);
    }


    let full_stim = [

      {stimulus: original_stimuli[0], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[1], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[2], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[3], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[4], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[5], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[6], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[7], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[8], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[9], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[10], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[11], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[12], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[13], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[14], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[15], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[16], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[17], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[18], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[19], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[20], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[21], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[22], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[23], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[24], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[25], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[26], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[27], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[28], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[29], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[30], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[31], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[32], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[33], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[34], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[35], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[36], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[37], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[38], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[39], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[40], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[41], data: {test_part: 'original', correct_response: '1'}},
      {stimulus: original_stimuli[42], data: {test_part: 'original', correct_response: '1'}},

      {stimulus: inverted_stimuli[0], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[1], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[2], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[3], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[4], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[5], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[6], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[7], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[8], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[9], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[10], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[11], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[12], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[13], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[14], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[15], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[16], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[17], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[18], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[19], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[20], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[21], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[22], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[23], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[24], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[25], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[26], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[27], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[28], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[29], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[30], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[31], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[32], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[33], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[34], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[35], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[36], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[37], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[38], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[39], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[40], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[41], data: {test_part: 'inverted', correct_response: '0'}},
      {stimulus: inverted_stimuli[42], data: {test_part: 'inverted', correct_response: '0'}},

    ]

    let full_stim_shuffle = jsPsych.randomization.repeat(full_stim, 1); //shuffled array no repeats

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
      // on_finish: function(data){
      //   if(data.key_press == 32) { // 32 = spacebar
      //     jsPsych.pauseExperiment();
      //     setTimeout(jsPsych.resumeExperiment, 30000);
      //   }
      // }
    }

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

    let first_procedure = {
      timeline: [fixation, first_half],
      timeline_variables: full_stim_shuffle.slice(0,43),
      // randomize_order: true
    }

    let rest = {
      timeline: [breaking],
    }

    let second_procedure = {
      timeline: [fixation, second_half],
      timeline_variables: full_stim_shuffle.slice(43,86),
      // randomize_order: true
    }

    timeline.push(first_procedure);
    timeline.push(rest);
    timeline.push(second_procedure);
    

    /* END EXPERIMENT FOR PARTICIPANTS */

    

    // COMPLETION MESSAGE: Completed Classification Phase
    // let link = "https://survey.az1.qualtrics.com/SE/?SID=SV_9uARDX1aXEXq1pP&Q_JFE=0&workerId="
    let completion= {
      type: "html-keyboard-response",
      stimulus: '<p style="color:white;">You have now completed the task.</p> ' +
          '<p style="color:white;">Thank you!</p> ',
      choices: jsPsych.NO_KEYS,
      trial_duration: 5000
    };
    timeline.push(completion);



    /* END PHASE II OF TASK: CLASSIFICATION and ANTICIPATION PHASE */

function saveData(name, data){
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'index.php'); // 'write_data.php' is the path to the php file described above.
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({filename: name, filedata: data}));
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
    let workerID = prompt( 'enter subID' );

    /* start the experiment */
    function startExperiment(){
      jsPsych.init({
        timeline: timeline,
        show_progress_bar: true,
        on_finish: function(){ saveData("mooney-faces_" + workerID, jsPsych.data.get().csv()); }
        //on_finish: function(){
          //jsPsych.data.get().filter([{test_part: 'test'},{test_part: 'prediction'},{test_part: 'c2_test'}]).localSave("csv", `test-self-deception-data.csv`);
            //jsPsych.data.displayData(); 
        //}
      });
    }
  </script>

<footer>

<!-- <script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/Timeout.js"></script> -->
<!-- <script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/lodash.js"></script> -->
<!-- <script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/seedrandom.js"></script> -->
<script type="text/javascript" src="//code.jquery.com/jquery-git.js"></script>
<!-- <script type="text/javascript" src="https://perceptionexperiments.net/SDU/Libraries/jquery.csv.js"></script> -->

<script>
// show page when loaded 
window.onload = function() {
  $(".loading").css({display: "none"});
  $(".consent").css({display: "block"});
  $(".buttonHolder").css({display: "block"});
};
</script>
</footer>
  </html>
