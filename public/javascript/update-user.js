async function updateUserHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const city = document.querySelector('#city-signup').value.trim();

    const formData = new FormData();
    const image = document.querySelector('input[type="file"]');
    formData.append('username', username);
    formData.append('email', email);
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
        document.location.replace('/Dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.update-btn').addEventListener('submit', updateUserHandler);