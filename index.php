<?php
  require_once 'db/data.php';
  require_once 'db/config.php';
?>



<!DOCTYPE html>
<html>
  <head>
    <title>Mooney Faces</title>
    <script src="db/validate.js"></script>
    <script src="js/jquery-3.5.1.min.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <script src="jsPsych/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jsPsych/plugins/jspsych-image-keyboard-response.js"></script>
    <script src="jsPsych/jspsych.js"></script>
    <link rel="stylesheet" href="jsPsych/css/jspsych.css">
    <link href="jsPsych/css/jspsych.css" rel="stylesheet" type="text/css"></link>
    <link rel="stylesheet" type="text/css" href="css/exp.css">

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
    <script src="exp/conf.js"></script>
    <script src="exp/fn.js"></script>
    <script src="exp/var.php"></script>
    <script type="text/javascript">
      // declare NDA required variables
      let GUID;
      let subjectID;
      let sexAtBirth;
      let siteNumber;
      let ageAtAssessment;
      let groupStatus;
      let feedbackLink;

      if (db_connection === false) {
        GUID = "";
        subjectID = "";
        sexAtBirth = "";
        siteNumber = "";
        ageAtAssessment = "";
        groupStatus = "";
        feedbackLink = "";
      } else if (db_connection === true) {
        GUID = "<?php echo $subjectKey?>";
        subjectID = "<?php echo $consortId?>";
        sexAtBirth = "<?php echo $sexAtBirth?>";
        siteNumber = "<?php echo $institutionAlias?>";
        ageAtAssessment = "<?php echo $ageInMonths?>";
        groupStatus = "<?php echo $groupStatus?>";
        feedbackLink = "https://belieflab.yale.edu/omnibus/eCRFs/feedback/tasks/mooney.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
      }
    </script>
  </footer>
</html>
