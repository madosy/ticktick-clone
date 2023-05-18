const todoModule = (() => {
  function update() {
    console.log("updated todo list");
  }

  return { update };
})();

export default todoModule;
