import displayController from "./todoDetail_displayController";

const todoDetailModule = (() => {
  displayController.render();

  const update = () => {
    displayController.render();
  };

  return { update };
})();

export default todoDetailModule;
