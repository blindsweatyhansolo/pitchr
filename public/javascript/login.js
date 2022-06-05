// LOGIC FOR LOGIN/SIGNUP
async function loginFormHandler(event) {
    event.preventDefault();

    // pull data from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    

    // verify fields have values
    if (email && password) {
        // POST request to login route with captured form values
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-type': 'application/json'}
        });

        // check response, redirect to dashboard on success
        if (response.ok) {
            document.location.replace('/');
        } else {
            // CHANGE TO MODAL!! //
        }
    }
};

async function signupFormHandler(event) {
    event.preventDefault();

    // pull data from signup form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const github = document.querySelector('#github-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    

    // verify fields have values, perform POST request
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                github,
                password
            }),
            headers: { 'Content-type': 'application/json' }
        });

        // check the response status, redirect to dashboard on success
        if (response.ok) {
            document.location.replace('/')
        } else {
            // CHANGE TO MODAL!! //
        }
    }
    
};


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);