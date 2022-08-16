async function updatePetFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#pet-name').value;
    const pet_type = document.querySelector('#pet-type').value.trim();
    const age = document.querySelector('#pet-age').value.trim();
    const gender = document.querySelector('#pet-gender').value.trim();
    const picture_url = document.querySelector('input[type="file"]').value.trim();

    console.log(picture_url);
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            pet_type,
            age,
            gender,
            picture_url
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/Dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', updatePetFormHandler);