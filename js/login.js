const form = document.querySelector('form');
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');

    if (email.value === '' || password.value === '') {
        if (email.value === '') {
            emailError ? emailError.remove() : null;
            email.insertAdjacentHTML('afterend', '<p id="email-error" style="color:red">Please enter your email</p>');
        }
        if (password.value === '') {
            passwordError ? passwordError.remove() : null;
            password.insertAdjacentHTML('afterend', '<p id="password-error" style="color:red">Please enter your password</p>');
        }
    } else {
        // Retrieve the array from local storage
        let users = JSON.parse(localStorage.getItem('users'));
        if (users == null)
            users = []

// Check if email and password exist
        const user = users.find(u => u.email === email.value);
        if (user && user.password === password.value) {
            console.log('Email and password exist');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'products.html';

        } else {
            console.log('Email and/or password do not exist');
            password.insertAdjacentHTML('afterend', '<p id="password-error" style="color:red">User does not exist</p>');

        }
    }
});