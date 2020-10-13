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
    <title>Mooney Faces</title>
    <script src="db/submit.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/style.css">
  </head>
  <body onbeforeunload="return areYouSure()" style="background-color:grey;"> 
    <?php include_once 'include/intake.php';?>
  </body>
  <footer>
    <script src="js/jquery-git.js"></script>
    <script src="exp/fn.js"></script>
    <script src="exp/var.js"></script>
    <script src="exp/timeline.js"></script>
  </footer>
</html>