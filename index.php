<?php
  require_once './wrap/lib/ids.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mooney Faces</title>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <!-- jsPsych CDN (content delivery network) libraries -->
    <script src="https://unpkg.com/jspsych@7.3.3"></script>
    <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css"/>
    <!-- loads in jspsych plugins -->
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2"></script>
    <script src="https://unpkg.com/@jspsych/plugin-audio-keyboard-response@1.1.3"></script>  
    <script src="https://unpkg.com/@jspsych/plugin-preload@1.1.3"></script>
   

    <script src="https://cdn.jsdelivr.net/npm/jspsych@7.3.3/build/jspsych.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jspsych@7.3.3/plugins/jspsych-html-keyboard-response.js"></script>
    <!-- Include jsPsych CSS -->
    <link href="https://unpkg.com/jspsych@7.3.3/css/jspsych.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" type="text/css" href="css/exp.css">
    <script src="js/jquery-3.5.1.min.js"></script>
</head>

<body id='unload' onbeforeunload="return areYouSure()" style="background-color:grey;">
    <?php
      if (isset($_GET["workerId"])) {
        include_once "./wrap/include/start.php";
      } else if (isset($_GET["src_subject_id"])) {
        include_once "./wrap/include/nda.php";
      } else {
        include_once "./wrap/include/intake.php";
      }
    ?>
</body>

<footer>
    <!-- Experiment-specific scripts -->
    <script src="./wrap/jspsych/jspsych.js"></script>
    <script src="./wrap/plugins/plugin-html-keyboard-response.js"></script>
    <!-- <script type="text/javascript" src="./wrap/plugins/plugin-html-keyboard-response.js"></script> -->
    <script type="text/javascript" src="./exp/conf.js"></script>
    <script type="text/javascript" src="./exp/var.js"></script>
    <script type="text/javascript" src="./wrap/lib/fn.js"></script>
    <script src="./exp/var-master.js"></script>
    <script src="./exp/var-silverstein.js"></script>
    <script type="text/javascript" src="./exp/timeline-silverstein.js"></script>
    <script type="text/javascript" src="./exp/timeline-master.js"></script>
    <script type="text/javascript" src="./exp/main.js"></script>
    <script type="text/javascript" src="./exp/timeline.js"></script>
</footer>
</html>
