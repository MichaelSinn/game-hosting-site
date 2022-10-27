const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const name = document.querySelector('#name-signup').value.trim();

    if (email && password) {
        const response = await fetch('/user/signup', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok){
            document.location.replace('/')
        }else{
            const {message} = await response.json();
            alert(message);
        }
    }
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
