
const form = document.querySelector("form");
const eField = form.querySelector(".email");
const eInput = eField.querySelector("input");
const pField = form.querySelector(".password");
const pInput = pField.querySelector("input");

form.onsubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are provided
    if (eInput.value.trim() === "" || pInput.value.trim() === "") {
        // Display error message if email or password is blank
        console.error('Email and password are required.');
        return;
    }

    try {
        const loginDetails = {
            email: eInput.value,
            password: pInput.value
        };

        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        });

        if (response.ok) {
            response = await response.json();
            let storedProfile = window.localStorage.getItem("newProfile");
            if (!storedProfile) {
                // If no profile data is stored, redirect to profile page
                window.location.href = 'profile.html'; // Redirect to profile page
            } else {
                window.localStorage.setItem("user", JSON.stringify(response.user));
                window.location.href = 'social_home.html'; // Redirect to dashboard page
            }
        } else if (response.status === 404) {
            // User does not have an account, display error message
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'User does not have an account.';
            errorMessage.style.display = 'block'; // Show the error message
        } else {
            // Handle other errors
            console.error('Failed to login:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


