export const details_component = (() => {
  const details_panel = document.body.querySelector(".detail-panel");
  const initComponent = () => {
    const template = `
    <div class="todo-date">
        <input type="checkbox" name="detail-panel-checkbox" id="detail-panel-checkbox">
        <span class="date">12/1/2023</span>
        <span class="priority">🚩</span>
    </div>
    <div contenteditable class="todo-title">Title is here</div>
    <div contenteditable class="todo-desc">This is some desc about the <b>task</b></div>
    <div class="todo-tools">A</div>`;
    details_panel.innerHTML = template;
  };
  const updateUI = (todo) => {
    details_panel.querySelector("todo-title").textContent = todo.title;
    details_panel.querySelector("todo-desc").innerHTML = todo.details;
  };

  return { updateUI };
})();
