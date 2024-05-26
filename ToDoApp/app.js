document.addEventListener('DOMContentLoaded', loadNotes);

const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

addNoteBtn.addEventListener('click', addNote);
searchBtn.addEventListener('click', searchNotes);

function addNote() {
    const note = createNoteElement({
        title: '',
        description: '',
        color: getRandomColor(),
        completed: false,
        priority: 'medium',
        dueDate: ''
    });
    notesContainer.appendChild(note);
    saveNotes();
}

function createNoteElement(noteData) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.style.backgroundColor = noteData.color;
    if (noteData.completed) {
        note.classList.add('completed');
    }
    note.classList.add('collapsed');
    note.innerHTML = `
        <input type="text" class="note-title" value="${noteData.title}" placeholder="Título" readonly>
        <textarea class="note-description" readonly>${noteData.description}</textarea>
        <div class="note-details">
            <label>Prioridad: 
                <select class="note-priority" ${noteData.completed ? 'disabled' : ''}>
                    <option value="low" ${noteData.priority === 'low' ? 'selected' : ''}>Baja</option>
                    <option value="medium" ${noteData.priority === 'medium' ? 'selected' : ''}>Media</option>
                    <option value="high" ${noteData.priority === 'high' ? 'selected' : ''}>Alta</option>
                </select>
            </label>
            <label>Vencimiento: 
                <input type="date" class="note-due-date" value="${noteData.dueDate}" ${noteData.completed ? 'disabled' : ''}>
            </label>
        </div>
        <div class="note-controls">
            <button class="complete-note-btn">${noteData.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="edit-note-btn">Editar</button>
            <button class="delete-note-btn">Eliminar</button>
            <button class="expand-note-btn">Expandir</button>
        </div>
    `;
    return note;
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteData => {
        const note = createNoteElement(noteData);
        notesContainer.appendChild(note);
    });
}

function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note').forEach(note => {
        const title = note.querySelector('.note-title').value;
        const description = note.querySelector('.note-description').value;
        const color = note.style.backgroundColor;
        const completed = note.classList.contains('completed');
        const priority = note.querySelector('.note-priority').value;
        const dueDate = note.querySelector('.note-due-date').value;
        notes.push({ title, description, color, completed, priority, dueDate });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function searchNotes() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const notes = document.querySelectorAll('.note');
    notes.forEach(note => {
        const title = note.querySelector('.note-title').value.toLowerCase();
        const description = note.querySelector('.note-description').value.toLowerCase();
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            note.style.display = 'block';
        } else {
            note.style.display = 'none';
        }
    });
}

notesContainer.addEventListener('click', (e) => {
    const target = e.target;
    const note = target.closest('.note');
    if (target.classList.contains('complete-note-btn')) {
        note.classList.toggle('completed');
        target.textContent = note.classList.contains('completed') ? 'Desmarcar' : 'Completar';
        saveNotes();
    } else if (target.classList.contains('edit-note-btn')) {
        const isEditing = target.textContent === 'Guardar';
        note.querySelectorAll('.note-title, .note-description, .note-priority, .note-due-date').forEach(element => {
            element.readOnly = !isEditing;
            element.disabled = !isEditing;
        });
        target.textContent = isEditing ? 'Editar' : 'Guardar';
        if (isEditing) {
            saveNotes();
        }
    } else if (target.classList.contains('delete-note-btn')) {
        note.remove();
        saveNotes();
    } else if (target.classList.contains('expand-note-btn')) {
        note.classList.toggle('collapsed');
        target.textContent = note.classList.contains('collapsed') ? 'Expandir' : 'Comprimir';
    }
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function createNoteElement(noteData) {
    const note = document.createElement('div');
    note.classList.add('note');
    note.style.backgroundColor = noteData.color;
    if (noteData.completed) {
        note.classList.add('completed');
    }
    note.classList.add('collapsed'); // Agregamos la clase 'collapsed' por defecto
    note.innerHTML = `
        <input type="text" class="note-title" value="${noteData.title}" placeholder="Título" readonly>
        <textarea class="note-description" readonly>${noteData.description}</textarea>
        <div class="note-details">
            <label>Prioridad: 
                <select class="note-priority" ${noteData.completed ? 'disabled' : ''}>
                    <option value="low" ${noteData.priority === 'low' ? 'selected' : ''}>Baja</option>
                    <option value="medium" ${noteData.priority === 'medium' ? 'selected' : ''}>Media</option>
                    <option value="high" ${noteData.priority === 'high' ? 'selected' : ''}>Alta</option>
                </select>
            </label>
            <label>Vencimiento: 
                <input type="date" class="note-due-date" value="${noteData.dueDate}" ${noteData.completed ? 'disabled' : ''}>
            </label>
        </div>
        <div class="note-controls">
            <button class="complete-note-btn">${noteData.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="edit-note-btn">Editar</button>
            <button class="delete-note-btn">Eliminar</button>
            <button class="toggle-collapse-btn">Comprimir</button> <!-- Agregamos este botón -->
        </div>
    `;
    return note;
}

notesContainer.addEventListener('click', (e) => {
    const target = e.target;
    const note = target.closest('.note');
    if (target.classList.contains('toggle-collapse-btn')) { // Si se hizo clic en el botón de comprimir
        note.classList.toggle('collapsed'); // Alternamos la clase 'collapsed' en la nota
        target.textContent = note.classList.contains('collapsed') ? 'Expandir' : 'Comprimir'; // Cambiamos el texto del botón
    }
    // Resto del código para completar notas, editar notas, eliminar notas, etc.
});
const themeSwitch = document.getElementById('theme-switch');

themeSwitch.addEventListener('change', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
