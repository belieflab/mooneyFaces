// Handle the timeline for the experiment based on the version
switch (version) {
    case "silverstein":
        $.getScript("exp/timeline-silverstein.js");
        break;
    case "master":
        $.getScript("exp/timeline-master.js");
        break;
}
  