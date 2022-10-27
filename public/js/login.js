const resetWarnings = ()=>{
    const emailLoginField = document.querySelector('#email-login');
    emailLoginField.classList.remove("is-danger");

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

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

