const API_URL = "http://localhost:3001/students";

// Load all students on page load
window.onload = () => {
    fetchStudents();
};

// Fetch & display students
function fetchStudents() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#studentsTable tbody");
            tbody.innerHTML = "";

            data.forEach(student => {
                tbody.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.section}</td>
                    <td>${student.marks}</td>
                    <td>
                        <button onclick="editStudent(${student.id}, '${student.name}', '${student.section}', ${student.marks})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
                `;
            });
        });
}

// Add or Update student
function createOrUpdateStudent() {
    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const section = document.getElementById("section").value;
    const marks = document.getElementById("marks").value;

    const studentData = { name, section, marks: Number(marks) };

    if (id) {
        // Update
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
            .then(() => {
                alert("Student Updated!");
                resetForm();
                fetchStudents();
            });

    } else {
        // Create
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData)
        })
            .then(() => {
                alert("Student Added!");
                resetForm();
                fetchStudents();
            });
    }
}

// Load student data into form
function editStudent(id, name, section, marks) {
    document.getElementById("studentId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("section").value = section;
    document.getElementById("marks").value = marks;
}

// Delete student
function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;

    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            alert("Student Deleted!");
            fetchStudents();
        });
}

// Clear form
function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("section").value = "";
    document.getElementById("marks").value = "";
}
