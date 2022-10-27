const resetWarnings = ()=>{
    const passwordField = document.querySelector('#password-signup');
    passwordField.classList.remove('is-danger');

    const passwordSection = document.querySelector('#password-section');
    if(document.getElementById("password-warning-tag")) passwordSection.removeChild(document.getElementById("password-warning-tag"));

    const emailField = document.querySelector('#email-signup');
    emailField.classList.remove("is-danger");

    const emailSection = document.querySelector('#email-section');
    if (document.getElementById("email-warning-tag")) emailSection.removeChild(document.getElementById("email-warning-tag"))
}

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
    resetWarnings();
    if (password.length < 8) {
        const passwordField = document.querySelector('#password-signup');
        passwordField.classList.add("is-danger");
        const passwordSection = document.querySelector('#password-section');
        if (!document.getElementById("password-warning-tag")) {
            const warningTag = document.createElement('p');
            warningTag.innerText = "Password must be at least 8 characters";
            warningTag.id = "password-warning-tag";
            warningTag.className = "help is-danger";
            passwordSection.appendChild(warningTag);
        }
    }

    if (email && password) {
        const response = await fetch('/user/signup', {
            method: 'POST',
            body: JSON.stringify({name, email, password}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/')
        } else {
            const {message} = await response.json();
            if (message === 'User with that email already exists') {
                const emailField = document.querySelector('#email-signup');
                emailField.classList.add("is-danger");
                const emailSection = document.querySelector('#email-section');
                if (!document.getElementById("email-warning-tag")) {
                    const warningTag = document.createElement('p');
                    warningTag.innerText = "Please use a unique email";
                    warningTag.id = "email-warning-tag";
                    warningTag.className = "help is-danger";
                    emailSection.appendChild(warningTag);
                }
            }
        }
    }
}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
