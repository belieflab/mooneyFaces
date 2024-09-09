<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mooney Faces</title>

    <!-- Include jsPsych CSS -->
    <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="css/exp.css">

    <script src="js/jquery-3.5.1.min.js"></script>

    <!-- Load jsPsych and initialize it -->
    <script type="module">
        import { initJsPsych } from "https://cdn.jsdelivr.net/npm/jspsych@7.3.3";
        import { jsPsychHtmlKeyboardResponse } from "https://cdn.jsdelivr.net/npm/jspsych@7.3.3/plugins/jspsych-html-keyboard-response.js";
        
        const jsPsych = initJsPsych();

        // Now dynamically load var-silverstein.js
        import { setupExperiment } from './exp/var-silverstein.js';
        setupExperiment(jsPsych);
    </script>
</head>

<body id='unload' onbeforeunload="return areYouSure()" style="background-color:grey;">
    <?php
      if (isset($_GET["workerId"])) {
        include_once "include/con.php";
      } else if (isset($_GET["src_subject_id"])) {
        include_once "include/nda.php";
      } else {
        include_once "include/intake.php";
      }
    ?>
</body>

<footer>
    <!-- Experiment-specific scripts -->
    <script type="text/javascript" src="./wrap/lib/redirect.js"></script>
    <script type="text/javascript" src="./exp/conf.js"></script>
    <script type="text/javascript" src="./wrap/lib/fn.js"></script>
    <script type="text/javascript" src="./exp/fn.js"></script>
    <script type="text/javascript" src="./exp/var.js"></script>
    <script type="text/javascript" src="./exp/timeline.js"></script>
</footer>
</html>
