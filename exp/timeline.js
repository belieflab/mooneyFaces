// handle the timeline for the experiment

// Handle the timeline for the experiment directly based on the version
switch (version) {
  case "master":
      $.getScript("exp/timeline-master.js");
      break;
  case "silverstein":
      $.getScript("exp/timeline-silverstein.js");
      break;
}