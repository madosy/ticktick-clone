import default_image from "../assets/detail-panel-default.png";

function generateDefaultMessage() {
  const message = document.createElement("p");
  message.textContent = "Click task title to view the detail";

  const myImage = document.createElement("img");
  myImage.src = default_image;

  const div = document.createElement("div");
  div.classList.add("default-template");
  div.appendChild(myImage);
  div.appendChild(message);

  return div;
}

export default generateDefaultMessage;
