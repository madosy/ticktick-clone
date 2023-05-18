import displayController from "./project_displayController";

const projectModule = (() => {
  function update() {
    console.log("projects updated!");
  }

  return { update };
})();

export default projectModule;
