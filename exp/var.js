"use strict";

let version

switch (version) {
    case "silverstein":
        $.getScript("exp/var-silverstein.js");
        break;

    case "master":
        $.getScript("exp/var-master.js");
        break;
}