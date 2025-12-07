// ユーザー管理と認証
let currentUser = null;
let users = [];
let todos = {};

// DOM要素の変数
let authContainer, appContainer, loginForm, registerForm;
let loginButton, registerButton, showRegister, showLogin;
let loginEmail, loginPassword, registerName, registerEmail, registerPassword, registerPasswordConfirm;
let loginError, registerError, userName, logoutButton;
let todoInput, deadlineInput, imageInput, addButton, todoList;

// ローカルストレージからデータを読み込む
// ローカルストレージからデータを読み込む
function loadData() {
    const savedUsers = localStorage.getItem('users');
    const savedTodos = localStorage.getItem('todos');
    const savedCurrentUser = localStorage.getItem('currentUser');
    
    try {
        if (savedUsers) {
            const parsed = JSON.parse(savedUsers);
            users = Array.isArray(parsed) ? parsed : [];
        } else {
            users = [];
        }
    } catch (e) {
        console.error('ユーザーデータの読み込みエラー:', e);
        users = [];
    }
    
    try {
        if (savedTodos) {
            const parsed = JSON.parse(savedTodos);
            todos = typeof parsed === 'object' && parsed !== null ? parsed : {};
        } else {
            todos = {};
        }
    } catch (e) {
        console.error('TODOデータの読み込みエラー:', e);
        todos = {};
// ユーザー登録
function register() {
    try {
        // usersが配列でない場合は初期化
        if (!Array.isArray(users)) {
            users = [];
        }
        
        const name = registerName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPassword.value;
        const passwordConfirm = registerPasswordConfirm.value;
        
        if (registerError) {
            registerError.textContent = '';
        }
        
        // バリデーション
        if (!name) {
            const msg = 'お名前を入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (!email) {
            const msg = 'メールアドレスを入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (password.length < 6) {
            const msg = 'パスワードは6文字以上で入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (password !== passwordConfirm) {
            const msg = 'パスワードが一致しません。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        
        // 既存ユーザーチェック
        if (users.find(u => u.email === email)) {
        if (!name) {
            const msg = 'お名前を入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (!email) {
            const msg = 'メールアドレスを入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (password.length < 6) {
            const msg = 'パスワードは6文字以上で入力してください。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        if (password !== passwordConfirm) {
            const msg = 'パスワードが一致しません。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
            return;
        }
        
        // 既存ユーザーチェック
        if (users.find(u => u.email === email)) {
            const msg = 'このメールアドレスは既に登録されています。';
            if (registerError) registerError.textContent = msg;
            else alert(msg);
// ログイン
function login() {
    try {
        // usersが配列でない場合は初期化
        if (!Array.isArray(users)) {
            users = [];
        }
        
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        
        if (loginError) {
            loginError.textContent = '';
        }
        
        if (!email || !password) {
            const msg = 'メールアドレスとパスワードを入力してください。';
            if (loginError) loginError.textContent = msg;
            else alert(msg);
            return;
        }
        
        const user = users.find(u => u.email === email && u.password === password);
        saveData();
        showApp();
    } catch (error) {
        console.error('登録エラー:', error);
        alert('登録中にエラーが発生しました: ' + error.message);
    }
}

// ログイン
function login() {
    try {
        const email = loginEmail.value.trim();
        const password = loginPassword.value;
        
        if (loginError) {
            loginError.textContent = '';
        }
        
        if (!email || !password) {
            const msg = 'メールアドレスとパスワードを入力してください。';
            if (loginError) loginError.textContent = msg;
            else alert(msg);
            return;
        }
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            const msg = 'メールアドレスまたはパスワードが正しくありません。';
            if (loginError) loginError.textContent = msg;
            else alert(msg);
            return;
        }
        
        currentUser = user;
        saveData();
        showApp();
    } catch (error) {
        console.error('ログインエラー:', error);
        alert('ログイン中にエラーが発生しました: ' + error.message);
    }
}

// ログアウト
function logout() {
    currentUser = null;
    saveData();
    showAuth();
    // フォームをリセット
    if (loginEmail) loginEmail.value = '';
    if (loginPassword) loginPassword.value = '';
    if (registerName) registerName.value = '';
    if (registerEmail) registerEmail.value = '';
    if (registerPassword) registerPassword.value = '';
    if (registerPasswordConfirm) registerPasswordConfirm.value = '';
    if (loginError) loginError.textContent = '';
    if (registerError) registerError.textContent = '';
}

// 認証画面を表示
function showAuth() {
    if (authContainer) authContainer.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    if (registerForm) registerForm.style.display = 'none';
}

// アプリ画面を表示
function showApp() {
    if (authContainer) authContainer.style.display = 'none';
    if (appContainer) appContainer.style.display = 'block';
    if (userName && currentUser) {
        userName.textContent = currentUser.name + ' さん';
    }
    
    // ユーザーのTODOを読み込む
    if (currentUser && !todos[currentUser.id]) {
        todos[currentUser.id] = [];
    }
    loadTodos();
}

// ローカルストレージからTODOを読み込む
function loadTodos() {
    if (currentUser && todos[currentUser.id]) {
        renderTodos();
    } else {
        if (todoList) {
            todoList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📝</div>
                    <div>TODOがありません</div>
                </div>
            `;
        }
    }
}

// ローカルストレージにTODOを保存
function saveTodos() {
    if (currentUser) {
        todos[currentUser.id] = todos[currentUser.id] || [];
        saveData();
    }
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
    if (!currentUser) return;
    
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
            todos[currentUser.id].push(todo);
            saveTodos();
            renderTodos();
            resetForm();
        });
    } else {
        todos[currentUser.id].push(todo);
        saveTodos();
        renderTodos();
        resetForm();
    }
}

// フォームをリセット
function resetForm() {
    if (todoInput) todoInput.value = '';
    if (deadlineInput) deadlineInput.value = '';
    if (imageInput) imageInput.value = '';
}

// TODOを削除
function deleteTodo(id) {
    if (!currentUser) return;
    todos[currentUser.id] = todos[currentUser.id].filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// TODOの完了状態を切り替え
function toggleTodo(id) {
    if (!currentUser) return;
    const todo = todos[currentUser.id].find(t => t.id === id);
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
    if (!todoList) return;
    
    if (!currentUser || !todos[currentUser.id] || todos[currentUser.id].length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div>TODOがありません</div>
            </div>
        `;
        return;
    }
    
    todoList.innerHTML = todos[currentUser.id].map(todo => {
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

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    // DOM要素の取得
    authContainer = document.getElementById('authContainer');
    appContainer = document.getElementById('appContainer');
    loginForm = document.getElementById('loginForm');
    registerForm = document.getElementById('registerForm');
    loginButton = document.getElementById('loginButton');
    registerButton = document.getElementById('registerButton');
    showRegister = document.getElementById('showRegister');
    showLogin = document.getElementById('showLogin');
    loginEmail = document.getElementById('loginEmail');
    loginPassword = document.getElementById('loginPassword');
    registerName = document.getElementById('registerName');
    registerEmail = document.getElementById('registerEmail');
    registerPassword = document.getElementById('registerPassword');
    registerPasswordConfirm = document.getElementById('registerPasswordConfirm');
    loginError = document.getElementById('loginError');
    registerError = document.getElementById('registerError');
    userName = document.getElementById('userName');
    logoutButton = document.getElementById('logoutButton');
    todoInput = document.getElementById('todoInput');
    deadlineInput = document.getElementById('deadlineInput');
    imageInput = document.getElementById('imageInput');
    addButton = document.getElementById('addButton');
    todoList = document.getElementById('todoList');
    
    // イベントリスナー
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }
    if (registerButton) {
        registerButton.addEventListener('click', register);
    }
    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (loginForm) loginForm.style.display = 'none';
            if (registerForm) registerForm.style.display = 'block';
            if (loginError) loginError.textContent = '';
            return false;
        });
    }
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (registerForm) registerForm.style.display = 'none';
            if (loginForm) loginForm.style.display = 'block';
            if (registerError) registerError.textContent = '';
            return false;
        });
    }
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
    if (addButton) {
        addButton.addEventListener('click', addTodo);
    }
    if (todoInput) {
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }
    if (loginPassword) {
        loginPassword.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                login();
            }
        });
    }
    if (registerPasswordConfirm) {
        registerPasswordConfirm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                register();
            }
        });
    }
    
    // データ読み込みと画面表示
    loadData();
    if (currentUser) {
        showApp();
    } else {
        showAuth();
    }
});
