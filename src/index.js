import "./styles/index.scss";
import model from "./model";

const sampleDiv = document.createElement("div");
sampleDiv.textContent = "hello world!";
document.body.querySelector(".app-container").appendChild(sampleDiv);

console.log("I'm called from index.js");
