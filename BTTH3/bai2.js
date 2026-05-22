const btnOpenForm = document.getElementById('btn-open-form');
const btnCloseForm = document.getElementById('btn-close-form');
const formPopup = document.getElementById('form-popup');
const taskForm = document.getElementById('task-form');
const taskListContainer = document.getElementById('task-list');
const toastNotification = document.getElementById('toast-notification');
const inputId = document.getElementById('task-id');
const inputTitle = document.getElementById('task-title');
const inputDesc = document.getElementById('task-desc');
const inputDeadline = document.getElementById('task-deadline');
const inputPriority = document.getElementById('task-priority');
const formTitle = document.getElementById('form-title');

const totalTasksEl = document.getElementById('total-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');

let tasks = JSON.parse(localStorage.getItem('my_tasks')) || [];
let isEditMode = false; 

function saveToLocalStorage() {
    localStorage.setItem('my_tasks', JSON.stringify(tasks));
}

function showToast(message) {
    toastNotification.textContent = message;
    toastNotification.classList.add('success');
    toastNotification.classList.remove('hidden');
    
    setTimeout(() => {
        toastNotification.classList.add('hidden');
    }, 3000);
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

function openPopup(mode = 'add') {
    formPopup.classList.remove('hidden');
    if (mode === 'add') {
        isEditMode = false;
        formTitle.textContent = "Thêm Công Việc Mới";
        taskForm.reset();
        inputId.value = '';
    } else {
        isEditMode = true;
        formTitle.textContent = "Cập Nhật Công Việc";
    }
}

function closePopup() {
    formPopup.classList.add('hidden');
    taskForm.reset();
}

function renderTasks() {
    if (tasks.length === 0) {
        taskListContainer.innerHTML = `<div class="empty-state">Hiện tại bạn chưa có công việc nào cần làm. Hãy thêm mới!</div>`;
        updateStatistics();
        return;
    }

    let htmlContent = '';
    tasks.forEach(task => {
        const priorityClass = `priority-${task.priority.replace(' ', '-')}`;
        const completedClass = task.isCompleted ? 'is-completed' : '';

        htmlContent += `
            <div class="task-card ${priorityClass} ${completedClass}" data-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.isCompleted ? 'checked' : ''}>
                
                <div class="task-info">
                    <div class="task-title-text">${task.title}</div>
                    <div class="task-desc-text">${task.desc || '<i>Không có mô tả</i>'}</div>
                    <div class="task-meta">
                        <span>📅 Hạn: <b>${task.deadline}</b></span>
                        <span class="badge badge-priority">Ưu tiên: ${task.priority}</span>
                    </div>
                </div>

                <div class="task-actions">
                    <button class="btn btn-secondary btn-sm btn-edit">Sửa</button>
                    <button class="btn btn-danger btn-sm btn-delete">Xóa</button>
                </div>
            </div>
        `;
    });

    taskListContainer.innerHTML = htmlContent;
    updateStatistics(); 
}
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const titleValue = inputTitle.value.trim();
    const descValue = inputDesc.value.trim();
    const deadlineValue = inputDeadline.value;
    const priorityValue = inputPriority.value;

    if (!isEditMode) {
        const newTask = {
            id: 'task_' + Date.now(), 
            title: titleValue,
            desc: descValue,
            deadline: deadlineValue,
            priority: priorityValue,
            isCompleted: false 
        };

        tasks.push(newTask);
        showToast("Thêm mới công việc thành công!");
    } else {
        const idToUpdate = inputId.value;
        const taskIndex = tasks.findIndex(t => t.id === idToUpdate);
        
        if (taskIndex !== -1) {
            tasks[taskIndex].title = titleValue;
            tasks[taskIndex].desc = descValue;
            tasks[taskIndex].deadline = deadlineValue;
            tasks[taskIndex].priority = priorityValue;
            showToast("Cập nhật công việc thành công!");
        }
    }

    saveToLocalStorage(); 
    renderTasks();        
    closePopup();        
});

taskListContainer.addEventListener('click', function(e) {
    const taskCard = e.target.closest('.task-card');
    if (!taskCard) return;
    const taskId = taskCard.dataset.id;

    if (e.target.classList.contains('task-checkbox')) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isCompleted = e.target.checked;
            
            if (task.isCompleted) {
                taskCard.classList.add('is-completed');
            } else {
                taskCard.classList.remove('is-completed');
            }
            
            saveToLocalStorage();
            updateStatistics();
            showToast("Đã thay đổi trạng thái công việc!");
        }
    }

    if (e.target.classList.contains('btn-edit')) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            inputId.value = task.id;
            inputTitle.value = task.title;
            inputDesc.value = task.desc;
            inputDeadline.value = task.deadline;
            inputPriority.value = task.priority;
            
            openPopup('edit');
        }
    }

    if (e.target.classList.contains('btn-delete')) {
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
        if (confirmDelete) {
            tasks = tasks.filter(t => t.id !== taskId); 
            
            saveToLocalStorage();
            renderTasks(); // Render lại danh sách
            showToast("Xóa công việc thành công!");
        }
    }
});

btnOpenForm.addEventListener('click', () => openPopup('add')); 
btnCloseForm.addEventListener('click', closePopup);          

document.addEventListener('DOMContentLoaded', renderTasks);