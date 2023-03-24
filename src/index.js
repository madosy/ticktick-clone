import "./styles/index.scss";
import "./styles/todo.scss";
import { getData, getPanelList } from "./model";

console.log("I'm called from index.js");

let mydoc = document.querySelector(".todo-desc");
let observer = new MutationObserver(() => console.log(new Date()));
observer.observe(mydoc, {
  childList: true,
  attributes: true,
  characterData: true,
  subtree: true,
});

console.log(getPanelList());
console.log(getPanelList("1a"));
