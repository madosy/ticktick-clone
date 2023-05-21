const displayContextMenu = (e) => {
  const id = e.target.closest(".project").dataset.id;
  if (id == getInboxFolder().id) {
    return;
  }

  const existingMenu = document.body.querySelector(".contextmenu");
  if (existingMenu) existingMenu.remove();
  const x = e.x + "px";
  const y = e.y + "px";

  const contextmenu = document.createElement("div");
  contextmenu.classList.add("contextmenu");
  contextmenu.style.left = x;
  contextmenu.style.top = y;

  const modify_button = document.createElement("button");
  modify_button.textContent = "Modify";
  modify_button.addEventListener("click", () => {
    pubsub.publish("request_proj_modify", [id]);
  });
  const delete_button = document.createElement("button");
  delete_button.textContent = "Delete";
  delete_button.addEventListener("click", () => {
    pubsub.publish("display_proj_delete_prompt", [id]);
  });

  contextmenu.appendChild(modify_button);
  contextmenu.appendChild(delete_button);

  document.body.addEventListener("click", () => contextmenu.remove());
  document.body.appendChild(contextmenu);
};
