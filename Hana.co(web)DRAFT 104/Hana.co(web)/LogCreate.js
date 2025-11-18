// Function to show the Signup form and hide the Login form
function showSignup() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('image1').style.display = 'block';
    document.getElementById('image2').style.display = 'none';
}

// Function to show the Login form and hide the Signup form
function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('image2').style.display = 'block';
    document.getElementById('image1').style.display = 'none';
}

// Function to handle signup logic
function signup() {
    // Get the email and password entered in the signup form
    const fname = document.getElementById('fname').value;
    const email = document.getElementById('signup-email').value;
    const contact = document.getElementById('contact').value;
    const password = document.getElementById('signup-password').value;
    const conpass = document.getElementById('confirm-password').value;

    // Check if password and confirm password match
    if (password !== conpass) {
        alert('Password Incorrect, Please Input the right password');
        return;
    }

    // Check if name is empty
    if (!fname) {
        alert('Please fill out your name');
        return;
    }

    // Validate if email and password are not empty
    if (!email || !password) {
        alert('Please fill out both fields');
        return;
    }

    // Check if a user with this email already exists in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert('This email is already registered!');
        return;
    }

    // Create a new user object and save it to localStorage
    const newUser = { fname, email, contact, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Signup successful! You can now login.');
    showLogin(); // Switch to login form after successful signup
}

// Function to handle login logic
function login() {
    // Get the email and password entered in the login form
    const fname = document.getElementById('fname').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Validate if email and password are not empty
    if (!email || !password) {
        alert('Please fill out both fields');
        return;
    }

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user with the matching email or name
    const user = users.find(user => user.email === email || user.fname === fname);

    if (!user) {
        alert('No user found with this email!');
        return;
    }

    // Check if the password matches
    if (user.password !== password) {
        alert('Incorrect password!');
        return;
    }

    // Successful login
    alert('Login successful! Welcome ' + user.email);

    // Optionally, store the logged-in user data to indicate the user is logged in
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = "Main.html"; // Redirect to home page after successful login (optional)
}

// Handle form display based on URL hash
window.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash;

    if (hash === "#signup-form") {
        showSignup();
    } else if (hash === "#login-form") {
        showLogin();
    } else {
        // default
        showSignup(); // or showLogin()
    }
});
