rootFolder.addChild(myOtherFolder);
rootFolder.children[0].addChild(myTodo);

const listPanel = document.body.querySelector(".list-panel");
rootFolder.returnParentAndChildren((input) => {
  const itemToAppend = placeFolderOrder(input);
  listPanel.appendChild(itemToAppend);
});

export default function giveRootFolder() {
  return rootFolder;
}
