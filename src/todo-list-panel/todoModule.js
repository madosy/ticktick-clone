import displayController from "./todoListPanel_displayController";

const todoListModule = (() => {
  function update() {
    displayController.render();
  }

  return { update };
})();

export default todoListModule;
