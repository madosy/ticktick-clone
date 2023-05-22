function updateTodo(todoObject) {
  const todoID = todoObject.id;
  localStorage.setItem(todoID, JSON.stringify(todoObject));
  console.log("todo was updated:" + todoObject);
}

export default updateTodo;
