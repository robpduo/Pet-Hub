//create event listener from signup.handlebars
//add async/await it makes the code more readable no need of then or catch 
async function createPetFormHandler(event) {
    event.preventDefault();
    //create the user in a POST method using the login.handlebars page 
    const name = document.querySelector('#pet-name').value.trim();
    const pet_type = document.querySelector('#pet-type').value.trim();
    const age = document.querySelector('#pet-age').value.trim();
    const gender = document.querySelector('#pet-gender').value.trim();
    const picture_url = document.querySelector('#pet-picture-url').value.trim();
    
    const response = await fetch('/api/pets', {
        method: 'POST',
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
    });
  
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.pet-form').addEventListener('submit', createPetFormHandler);