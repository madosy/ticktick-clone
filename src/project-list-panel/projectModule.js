import displayController from "./project_displayController";

const projectModule = (() => {
  function update() {
    displayController.render();
  }

  return { update };
})();

export default projectModule;
