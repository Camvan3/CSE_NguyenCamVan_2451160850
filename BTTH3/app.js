let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null; 

const studentList = document.getElementById("student-list");
const studentForm = document.getElementById("student-form");
const studentModal = document.getElementById("student-modal");
const modalTitle = document.getElementById("modal-title");
const btnSubmit = document.getElementById("btn-submit");

const totalStudentsEl = document.getElementById("total-students");
const averageScoreEl = document.getElementById("average-score");

const btnOpenModal = document.getElementById("btn-open-modal");
const btnCloseModal = document.getElementById("btn-close-modal");
const btnCancel = document.getElementById("btn-cancel");

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function updateStatistics() {
    totalStudentsEl.innerText = students.length;

    if (students.length === 0) {
        averageScoreEl.innerText = "0.0";
        return;
    }

    const totalGPA = students.reduce((sum, student) => sum + parseFloat(student.gpa || 0), 0);
    const avg = totalGPA / students.length;
    
    averageScoreEl.innerText = avg.toFixed(1); // Làm tròn 1 chữ số thập phân
}

function renderStudents() {
    studentList.innerHTML = ""; 

    if (students.length === 0) {
        studentList.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #888;">Danh sách trống. Vui lòng thêm sinh viên mới!</td></tr>`;
        updateStatistics();
        return;
    }

    students.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.code}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.class}</td>
            <td>${student.gpa}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn btn-primary" style="padding: 4px 10px; font-size: 12px; margin-right: 5px;" onclick="openEditForm('${student.code}')">Sửa</button>
                <button class="btn btn-danger" style="padding: 4px 10px; font-size: 12px; background-color: var(--danger-color, #ff4d4d); color: white; border: none; border-radius: 4px; cursor: pointer;" onclick="deleteStudent('${student.code}')">Xóa</button>
            </td>
        `;
        studentList.appendChild(row);
    });

    updateStatistics();
}

function resetForm() {
    studentForm.reset();
    document.getElementById("student-code").disabled = false; 
    editId = null;
    modalTitle.innerText = "Thêm sinh viên";
    btnSubmit.innerText = "Lưu";
}

function openModal() {
    studentModal.style.display = "flex"; 
}

// Hàm đóng Modal
function closeModal() {
    studentModal.style.display = "none";
    resetForm(); 
}

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
btnCancel.addEventListener("click", closeModal);

window.addEventListener("click", function(e) {
    if (e.target === studentModal) {
        closeModal();
    }
});

studentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const code = document.getElementById("student-code").value.trim();
    const name = document.getElementById("student-name").value.trim();
    const dob = document.getElementById("student-dob").value;
    const gpa = document.getElementById("student-gpa").value;
    const className = document.getElementById("student-class").value.trim();
    const email = document.getElementById("student-email").value.trim();

    if (editId === null) {
        const isDuplicate = students.some(s => s.code.toLowerCase() === code.toLowerCase());
        if (isDuplicate) {
            alert("Mã sinh viên này đã tồn tại! Vui lòng kiểm tra lại.");
            return;
        }

        const newStudent = { code, name, dob, class: className, gpa, email };
        students.push(newStudent); 
    } else {
        const index = students.findIndex(s => s.code === editId);
        if (index !== -1) {
            students[index] = { code: editId, name, dob, class: className, gpa, email };
        }
    }

    saveStudents();
    renderStudents();
    closeModal();
});

function openEditForm(code) {
    // Tìm object sinh viên theo Mã SV
    const student = students.find(s => s.code === code);
    if (!student) return;

    editId = code; 

    document.getElementById("student-code").value = student.code;
    document.getElementById("student-code").disabled = true; 
    document.getElementById("student-name").value = student.name;
    document.getElementById("student-dob").value = student.dob;
    document.getElementById("student-gpa").value = student.gpa;
    document.getElementById("student-class").value = student.class;
    document.getElementById("student-email").value = student.email;

    modalTitle.innerText = "Cập nhật thông tin sinh viên";
    btnSubmit.innerText = "Cập nhật";

    openModal(); 
}

function deleteStudent(code) {
    const isConfirm = confirm(`Bạn có chắc chắn muốn xóa sinh viên có Mã SV: ${code} không?`);
    if (isConfirm) {
        students = students.filter(student => student.code !== code);
                saveStudents();
        renderStudents();
    }
}
renderStudents();