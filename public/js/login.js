const resetWarnings = ()=>{
    const passwordField = document.querySelector('#password-signup');
    passwordField.classList.remove('is-danger');

    const passwordSection = document.querySelector('#password-signup-section');
    if(document.getElementById("password-warning-tag")) passwordSection.removeChild(document.getElementById("password-warning-tag"));

    const emailSignupField = document.querySelector('#email-signup');
    emailSignupField.classList.remove("is-danger");

    const emailLoginField = document.querySelector('#email-login');
    emailLoginField.classList.remove("is-danger");

    const emailSignupSection = document.querySelector('#email-signup-section');
    if (document.querySelector("#email-signup-warning-tag")) emailSignupSection.removeChild(document.getElementById("email-signup-warning-tag"));

    const emailLoginSection = document.querySelector('#email-login-section');
    if (document.querySelector("#email-login-warning-tag")) emailLoginSection.removeChild(document.getElementById("email-login-warning-tag"));
}

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    resetWarnings();

    if (email && password) {
        const response = await fetch('/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            const emailField = document.querySelector('#email-login');
            emailField.classList.add("is-danger");
            const emailSection = document.querySelector('#email-login-section');
            if (!document.getElementById("email-login-warning-tag")) {
                const warningTag = document.createElement('p');
                warningTag.innerText = "Email or password is incorrect";
                warningTag.id = "email-login-warning-tag";
                warningTag.className = "help is-danger";
                emailSection.appendChild(warningTag);
            }
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
        const passwordSection = document.querySelector('#password-signup-section');
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
                const emailSection = document.querySelector('#email-signup-section');
                if (!document.getElementById("email-signup-warning-tag")) {
                    const warningTag = document.createElement('p');
                    warningTag.innerText = "Please use a unique email";
                    warningTag.id = "email-signup-warning-tag";
                    warningTag.className = "help is-danger";
                    emailSection.appendChild(warningTag);
                }
            }
        }
    }
}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
