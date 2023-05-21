import userSession from "../../data/userSession";

const generateFolder = (id) => {
  const folderRecord = JSON.parse(localStorage.getItem(id));

  const item = document.createElement("div");
  item.classList.add("folder");
  item.dataset.id = folderRecord.id;
  item.innerHTML = `
    <span class="material-symbols-outlined"></span>
    <span class="title">${folderRecord.name}</span>
    <span class="count">${folderRecord.count}</span>`;

  item.addEventListener("click", () => {
    userSession.setActiveProjectId(folderRecord.id);
  });
  return item;
};

export { generateFolder };
