const projectFactory = (inputText) => {
  function generateId(text) {
    return `${text}.${Date.now()}`;
  }

  const template = {
    id: generateId("ticktickclone.project"),
    name: `${inputText}`,
    children: [],
    count: 0,
  };

  localStorage.setItem(template.id, JSON.stringify(template));
};
