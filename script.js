// TODOリストのデータを管理
let todos = [];

// DOM要素の取得
const todoInput = document.getElementById('todoInput');
const deadlineInput = document.getElementById('deadlineInput');
const imageInput = document.getElementById('imageInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');

// ローカルストレージからTODOを読み込む
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

// ローカルストレージにTODOを保存
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 画像をBase64に変換
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

// TODOを追加
function addTodo() {
    const text = todoInput.value.trim();
    const deadline = deadlineInput.value;
    const imageFile = imageInput.files[0];
    
    if (!text) {
        alert('TODOの内容を入力してください。');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        deadline: deadline || null,
        image: null
    };
    
    if (imageFile) {
        convertImageToBase64(imageFile, function(base64) {
            todo.image = base64;
            todos.push(todo);
            saveTodos();
            renderTodos();
            resetForm();
        });
    } else {
        todos.push(todo);
        saveTodos();
        renderTodos();
        resetForm();
    }
}

// フォームをリセット
function resetForm() {
    todoInput.value = '';
    deadlineInput.value = '';
    imageInput.value = '';
}

// TODOを削除
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// TODOの完了状態を切り替え
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// 期限が過ぎているかチェック
function isOverdue(deadline) {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    return deadlineDate < today;
}

// 日付をフォーマット
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// TODOリストを表示
function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div>TODOがありません</div>
            </div>
        `;
        return;
    }
    
    todoList.innerHTML = todos.map(todo => {
        const overdue = todo.deadline && isOverdue(todo.deadline) && !todo.completed;
        return `
            <div class="todo-item">
                <div class="todo-content">
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        ${todo.completed ? 'checked' : ''} 
                        onchange="toggleTodo(${todo.id})"
                    >
                    <div class="todo-text ${todo.completed ? 'completed' : ''}">
                        ${escapeHtml(todo.text)}
                    </div>
                </div>
                ${todo.deadline || todo.image ? `
                    <div class="todo-meta">
                        ${todo.deadline ? `
                            <div class="deadline ${overdue ? 'overdue' : ''}">
                                <svg class="deadline-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                                </svg>
                                <span>期限: ${formatDate(todo.deadline)}</span>
                            </div>
                        ` : ''}
                        ${todo.image ? `
                            <img src="${todo.image}" alt="TODO画像" class="todo-image">
                        ` : ''}
                    </div>
                ` : ''}
                <div class="todo-actions">
                    <button class="delete-button" onclick="deleteTodo(${todo.id})">削除</button>
                </div>
            </div>
        `;
    }).join('');
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// イベントリスナー
addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// ページ読み込み時にTODOを読み込む
loadTodos();
