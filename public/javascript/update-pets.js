async function updatePetFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#pet-name').value;
    const pet_type = document.querySelector('#pet-type').value.trim();
    const age = document.querySelector('#pet-age').value.trim();
    const gender = document.querySelector('#pet-gender').value.trim();

    const formData = new FormData();
    const picture_url = document.querySelector('input[type="file"]');
    formData.append('name', name);
    formData.append('pet_type', pet_type);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('picture_url', picture_url.files[0]);
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        body: formData
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', updatePetFormHandler);