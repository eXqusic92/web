const registerForm = document.getElementById('register-form');
const server = 'http://127.0.0.1:5000';

function clearTokenAndId() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
}

function closeErrorMessage() {
    document.querySelector('.alert').style.display = 'none';
    document.querySelector('.objectholder').style.display = 'block';
}

function showErrorMessage(error) {
    const errorMessage = document.querySelector('.alert');
    errorMessage.innerHTML = `<span class="closebtn">&times;</span> 
                            <strong>Error!</strong> ${error}`;
    errorMessage.style.display = 'block';
    document.querySelector('.objectholder').style.display = 'none';
    document.querySelector('.closebtn').addEventListener('click', closeErrorMessage);
}

function registerIntoPlayer() {
    fetch(`${server}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: registerForm.username.value,
            password: registerForm.passwordOne.value,
            email: registerForm.email.value,
        }),
    })
        .then((response) => {
            if (response.status > 300 && (response.status < 400 || response.status > 410)) {
                throw Error(response.statusText);
            } else if (!response.ok) {
                response.json().then((data) => {
                    showErrorMessage(data.message);
                });
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (Object.prototype.hasOwnProperty.call(data, 'token')) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                window.location.replace('./index.html');
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('id');
            }
        })
        .catch((error) => {
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            showErrorMessage(error);
        });
}

document.querySelector('.enter').addEventListener('click', registerIntoPlayer);
clearTokenAndId();
