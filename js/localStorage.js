let storage = [];

window.onload = () => {
  Object.entries(localStorage).forEach((storedNote) => {
    const id = storedNote[0];
    const { task, description, date } = JSON.parse(storedNote[1]);
    createNote(task, description, date, id);
    storage.push({ [id]: { task, description, date } });
  });
};

function randomizeNum() {
  return Math.floor(Math.random() * 1e6);
}

function addToLocalStorage(data) {
  const id = randomizeNum();
  localStorage.setItem(id, JSON.stringify(data));
  storage.push({ [id]: data });
  return id;
}

function removeFromLocalStorage(id) {
  localStorage.removeItem(id);
  storage = storage.filter(note => Object.keys(note)[0] !== id);
}
