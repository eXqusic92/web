const server = 'http://127.0.0.1:5000';

function checkIfLogin() {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token || !id) {
        window.location.replace('./login.html');
    }
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

function loadPlaylistForUser() {
    fetch(`${server}/service/users/${localStorage.getItem('id')}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
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
            if (data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], 'id')) {
                let playlists = '';
                for (let i = 0; i < data.length; i += 1) {
                    playlists += `<div class="object">
                                        <div class="squarediv"></div>
                                        <div class="text">
                                            <a href="#play"><span class="name"> ${data[i].title} </span></a>
                                            <span class="artist"> ${data[i].user.username} </span>
                                        </div>
                                    </div>`;
                }
                document.querySelector('.objectholder').innerHTML = playlists;
            }
        })
        .catch((error) => {
            showErrorMessage(error);
        });
}

checkIfLogin();
loadPlaylistForUser();
