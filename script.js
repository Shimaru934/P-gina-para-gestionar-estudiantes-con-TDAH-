// Función para cargar los alumnos desde localStorage y mostrar en la tabla
function loadStudentTable() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const tableBody = document.querySelector('.table-container tbody');
    tableBody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevos registros

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade}</td>
            <td>${student.tdahType}</td>
            <td>${student.diagnosisDate}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Cargar la tabla cuando la página se carga
document.addEventListener('DOMContentLoaded', loadStudentTable);

// Función para manejar el formulario y guardar los datos en localStorage
document.getElementById('student-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('student-name').value;
    const grade = document.getElementById('student-grade').value;
    const tdahType = document.getElementById('tdah-type').value;

    // Validar si los campos están completos
    if (!name || !grade || !tdahType) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }

    // Crear un objeto con los datos del alumno
    const newStudent = {
        id: Date.now(),  // Usamos el timestamp como ID único
        name,
        grade,
        tdahType,
        diagnosisDate: new Date().toLocaleDateString(),  // Fecha actual
    };

    // Obtener los datos de alumnos desde localStorage (si existen)
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Agregar el nuevo alumno al arreglo
    students.push(newStudent);

    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('students', JSON.stringify(students));

    // Limpiar el formulario
    this.reset();

    // Actualizar la tabla de alumnos
    loadStudentTable();
});
