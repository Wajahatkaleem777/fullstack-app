const API_URL = '/api/tasks';

const form = document.getElementById('task-form');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const taskList = document.getElementById('task-list');
const emptyState = document.getElementById('empty-state');
const errorBox = document.getElementById('error');

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
  setTimeout(() => errorBox.classList.add('hidden'), 4000);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  emptyState.classList.toggle('hidden', tasks.length > 0);

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.is_done ? ' done' : '');

    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.is_done ? 'checked' : ''} />
      <div class="task-content">
        <div class="task-title"></div>
        ${task.description ? '<div class="task-description"></div>' : ''}
        <div class="task-meta"></div>
      </div>
      <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.task-title').textContent = task.title;
    if (task.description) {
      li.querySelector('.task-description').textContent = task.description;
    }
    li.querySelector('.task-meta').textContent = `Created ${formatDate(task.created_at)}`;

    li.querySelector('.task-checkbox').addEventListener('change', (e) => {
      toggleTask(task.id, e.target.checked);
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskList.appendChild(li);
  });
}

async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to load tasks');
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    showError(err.message);
  }
}

async function createTask(title, description) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to create task');
    }
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
}

async function toggleTask(id, is_done) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_done }),
    });
    if (!res.ok) throw new Error('Failed to update task');
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
}

async function deleteTask(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete task');
    await loadTasks();
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  if (!title) return;
  createTask(title, description);
  titleInput.value = '';
  descriptionInput.value = '';
});

loadTasks();
