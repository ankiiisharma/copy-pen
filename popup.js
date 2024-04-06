const notesContainer = document.getElementById("notes-container");
const noteInput = document.getElementById("note-input");
const addNoteBtn = document.getElementById("add-note-btn");
let notes = JSON.parse(localStorage.getItem("notes")) || [];

function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const noteText = document.createElement("span");
    noteText.textContent = note;
    noteText.classList.add("note-text");
    noteDiv.appendChild(noteText);

    const noteActions = document.createElement("div");
    noteActions.classList.add("note-actions");

    const copyButton = document.createElement("button");
    const copyIcon = document.createElement("img");
    copyIcon.src = "./icons/copy.png";
    copyIcon.alt = "Copy";
    copyIcon.style.padding = "0px";
    copyIcon.style.height = "15px";
    copyIcon.style.width = "15px";
    copyButton.appendChild(copyIcon);
    copyButton.addEventListener("click", () => {
      copyNoteToClipboard(note);
    });
    noteActions.appendChild(copyButton);

    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./icons/delete.png";
    deleteIcon.alt = "Delete";

    deleteIcon.style.padding = "0px";
    deleteIcon.style.height = "15px";
    deleteIcon.style.width = "15px";
    deleteButton.appendChild(deleteIcon);
    deleteButton.addEventListener("click", () => {
      removeNoteAtIndex(index);
    });
    noteActions.appendChild(deleteButton);

    noteDiv.appendChild(noteActions);
    notesContainer.appendChild(noteDiv);
  });
}

function removeNoteAtIndex(index) {
  if (index >= 0 && index < notes.length) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    showNotification("Note deleted!", "delete");
  }
}

function copyNoteToClipboard(note) {
  navigator.clipboard.writeText(note);
  showNotification("Note copied to clipboard!", "copy");
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.classList.add("notification");
  if (type === "copy") {
    notification.classList.add("copy");
  } else if (type === "delete") {
    notification.classList.add("delete");
  }
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 2000);
}

renderNotes();

function addNote() {
  const newNote = noteInput.value.trim();
  if (newNote) {
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    renderNotes();
    noteInput.value = "";
    showNotification("Note added!", "copy");
  }
}

addNoteBtn.addEventListener("click", addNote);

noteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNote();
  }
});
