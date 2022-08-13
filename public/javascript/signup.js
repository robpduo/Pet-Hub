//create event listener from signup.handlebars
//add async/await it makes the code more readable no need of then or catch 
async function signupFormHandler(event) {
    event.preventDefault();
    //create the user in a POST method using the login.handlebars page 
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const city = document.querySelector('#city-signup').value.trim();
    
    const formData = new FormData();
    const image = document.querySelector('input[type="file"]');
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('city', city);
    formData.append('image', image.files[0]);

    //await fetch('/api/users', { //assign the result into a variable
    if (username && email && password) {
        
        const response = await fetch('/api/users/test', {
            method: 'POST',
            body: image,
            body: formData
        })
        if(response.ok){
            console.log('success');
            document.location.replace('/');
        } else {
            alert(response.statusText  + 'Please give proper files format to upload jpg|jpeg|png|gif');
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);