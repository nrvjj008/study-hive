const form = document.querySelector('form');
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');
const confirmPassword = document.querySelector('#login-confirmpassword');
const phone = document.querySelector('#login-phone');
const name = document.querySelector('#login-name');
if(!loggedInUser) {
    window.location.href = "login.html";
}
else{
    const user = JSON.parse(loggedInUser);
    email.value = user.email;
    name.value = user.name;
    phone.value = user.phone;
    password.value = user.password;
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailError = document.querySelector('#email-error');
    const passwordError = document.querySelector('#password-error');
    const nameError = document.querySelector('#name-error');
    const phoneError = document.querySelector('#phone-error');

    let valid = true; // Set a flag to check if all fields are valid

    // Check if email is not blank and is valid
    if (email.value === '') {
        emailError ? emailError.remove() : null;
        email.insertAdjacentHTML('afterend', '<p id="email-error" style="color:red">Please enter your email</p>');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError ? emailError.remove() : null;
        email.insertAdjacentHTML('afterend', '<p id="email-error" style="color:red">Please enter a valid email address</p>');
        valid = false;
    } else {
        emailError ? emailError.remove() : null;
    }

    // Check if password is not blank
    if (password.value === '') {
        passwordError ? passwordError.remove() : null;
        password.insertAdjacentHTML('afterend', '<p id="password-error" style="color:red">Please enter your password</p>');
        valid = false;
    } else {
        passwordError ? passwordError.remove() : null;
    }

    // Check if phone is not blank and is valid
    if (phone.value === '') {
        phoneError ? phoneError.remove() : null;
        phone.insertAdjacentHTML('afterend', '<p id="phone-error" style="color:red">Please enter your phone number</p>');
        valid = false;
    } else if (!/^\d{10}$/.test(phone.value)) {
        phoneError ? phoneError.remove() : null;
        phone.insertAdjacentHTML('afterend', '<p id="phone-error" style="color:red">Please enter a valid 10-digit phone number</p>');
        valid = false;
    } else {
        phoneError ? phoneError.remove() : null;
    }

    // Check if name is not blank
    if (name.value === '') {
        nameError ? nameError.remove() : null;
        name.insertAdjacentHTML('afterend', '<p id="name-error" style="color:red">Please enter your name</p>');
        valid = false;
    } else {
        nameError ? nameError.remove() : null;
    }

    if (valid) {

        // Add the user to the localStorage
        let updatedUser = {
            email: email.value,
            password: password.value,
            name: name.value,
            phone: phone.value
        };
        let existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        let localStorageUser = existingUsers.find(u => u.email === email.value);
        if (localStorageUser) {
            // The email address already exists in the localStorage, so we need to check if it belongs to the user being edited
            if (localStorageUser.email === updatedUser.email) {
                // The email address belongs to the user being edited, so we can update their details
                existingUsers = existingUsers.map(u => {
                    if (u.email === updatedUser.email) {
                        return updatedUser;
                    } else {
                        return u;
                    }
                });
                localStorage.setItem('users', JSON.stringify(existingUsers));
                localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
                window.location.href = 'courses-explore.html';

            } else {
                confirmPassword.insertAdjacentHTML('afterend', '<p id="confirmpassword-error" style="color:red">Email already exists</p>');
            }
        }
    }
})