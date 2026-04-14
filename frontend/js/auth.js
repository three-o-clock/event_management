const API = 'http://localhost:3000/api/auth';

// ─── REGISTER ────────────────────────────────────────────────
async function registerUser(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        year: document.getElementById('year').value,
        role: document.getElementById('role').value
    };

    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();
    const errorMsg = document.getElementById('error-msg');

    if (res.ok) {
        alert('Registered successfully! Please login.');
        window.location.href = 'login.html';
    } else {
        const err = document.getElementById('error-msg');
        err.textContent = result.message;
        err.classList.add('show');
    }
}

// ─── LOGIN ───────────────────────────────────────────────────
async function loginUser(event) {
    event.preventDefault();

    const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = 'profile.html';
    } else {
        const err = document.getElementById('error-msg');
        err.textContent = result.message;
        err.classList.add('show');
    }
}

// ─── GOOGLE LOGIN ─────────────────────────────────────────────
async function handleGoogleLogin(response) {
    const res = await fetch(`${API}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    });

    const result = await res.json();

    if (res.ok) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        window.location.href = 'profile.html';
    } else {
        alert(result.message);
    }
}

// ─── LOGOUT ──────────────────────────────────────────────────
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// ─── LOAD PROFILE ────────────────────────────────────────────
async function loadProfile() {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const res = await fetch(`${API}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
        logout();
        return;
    }

    const user = await res.json();

    document.getElementById('profile-name').textContent = user.name;
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    document.getElementById('avatar').textContent = initials;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-phone').textContent = user.phone || 'N/A';
    document.getElementById('profile-department').textContent = user.department || 'N/A';
    document.getElementById('profile-year').textContent = user.year || 'N/A';
    document.getElementById('profile-role').textContent = user.role || 'N/A';
}