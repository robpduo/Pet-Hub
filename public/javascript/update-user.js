async function updateUserHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#user-username').value.trim();
    const city = document.querySelector('#user-city').value.trim();

    const formData = new FormData();
    const image = document.querySelector('input[type="file"]');
    formData.append('username', username);
    formData.append('city', city);
    formData.append('image', image.files[0]);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: formData
    })

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', updateUserHandler);