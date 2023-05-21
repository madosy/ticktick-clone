import { generateFolder } from "./component-generators/generateFolder";

const generateSmartFolderList = () => {
  const container = document.createElement("div");
  container.classList.add("smart-folder");
  const inbox = generateFolder("tictoc.inbox");
  inbox.querySelector(".material-symbols-outlined").innerText = "inbox";
  container.appendChild(inbox);
  return container;
};

export { generateSmartFolderList };
