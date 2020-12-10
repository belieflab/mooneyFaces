<?php
$post_data = json_decode(file_get_contents('php://input'), true); 
// the directory "data" must be writable by the server
$name = "data/".$post_data['filename'].".csv"; 
$data = $post_data['filedata'];
// write the file to disk
file_put_contents($name, $data);

include_once ("db/config.php");

$studyId = $_GET["studyId"];
$candidateId = $_GET["candidateId"];
if (isset($candidateId)) {
  $query = "SELECT GUID from phi where sub_id = $candidateId";
  $prepare = $db_connection->prepare($query);
  $prepare->execute();
  $result = $prepare->get_result();
  $row = $result->fetch_assoc();
  $guid = $row["GUID"];
  $prepare->close();
  } else {
}
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
  <body id='unload' onbeforeunload="return areYouSure()" style="background-color:grey;"> 
    <?php include_once 'include/intake.php';?>
  </body>
  <footer>
    <script src="js/jquery-git.js"></script>
    <script src="exp/fn.js"></script>
    <script src="exp/var.js"></script>
    <script type="text/javascript">
    let feedbackLink = "https://omnibus.sh/eCRFs/feedback/tasks/mooney.php?candidateId=<?php echo $candidateId?>&studyId=<?php echo $studyId?>";
    </script>
  </footer>
</html>