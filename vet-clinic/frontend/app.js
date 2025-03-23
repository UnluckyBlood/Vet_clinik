fetch('http://localhost:5000/users/veterinarians')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('vets-list');
        data.forEach(vet => {
            const div = document.createElement('div');
            div.innerHTML = `<h3>${vet.name}</h3>`;
            list.appendChild(div);
        });
    });
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, role })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Успешный вход!');
        window.location.href = '/dashboard.html'; // Переход на страницу пользователя
    } else {
        alert(data.message);
    }
});
