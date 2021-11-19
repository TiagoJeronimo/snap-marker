// inject-script.js

const foreground_entry_point = document.createElement("div");
let reactJS_script = document.createElement("script");

foreground_entry_point.id = "root";

foreground_entry_point.appendChild(reactJS_script);
document.querySelector("body").appendChild(foreground_entry_point);
