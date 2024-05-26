document.addEventListener('DOMContentLoaded', loadCalendar);

const addNoteBtn = document.getElementById('add-note-btn');

addNoteBtn.addEventListener('click', addNote);

function loadCalendar() {
    const calendar = document.getElementById('calendar');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Obtener el primer y último día del mes actual
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Obtener el número de días en el mes y el día de la semana del primer día del mes
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Domingo) a 6 (Sábado)

    // Crear el calendario
    let dayOfWeekCounter = 0;
    for (let i = 1; i <= daysInMonth; i++) {
        // Crear un nuevo elemento para cada día del mes
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerHTML = `<h3>${i}</h3>`;
        
        // Añadir notas para este día (si las hay)
        const notesForDay = notes.filter(note => {
            const noteDate = new Date(note.dueDate);
            return noteDate.getDate() === i;
        });

        // Mostrar las notas como una lista debajo del día
        notesForDay.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('calendar-note');
            noteElement.textContent = note.title;
            dayElement.appendChild(noteElement);
        });

        // Agregar espacios en blanco para los días antes del primer día del mes
        if (dayOfWeekCounter < startingDayOfWeek) {
            dayElement.style.visibility = 'hidden';
            dayOfWeekCounter++;
        }

        calendar.appendChild(dayElement);
    }
}

function addNote() {
    const title = prompt('Ingrese el título de la nota:');
    const description = prompt('Ingrese la descripción de la nota:');
    const dueDate = prompt('Ingrese la fecha de vencimiento (YYYY-MM-DD):');
    
    const newNote = {
        title,
        description,
        color: getRandomColor(),
        completed: false,
        priority: 'medium',
        dueDate
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    window.location.reload();
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
