document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = form.querySelector(".email input").value;
        const username = form.querySelector(".username input").value;
        const password = form.querySelector(".password input").value;

        // Send signup data to the server
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        })
        .then(response => {
            if (response.ok) {
                // Redirect or show success message
                window.location.href = 'login.html'; // Redirect to login page after successful signup
            } else {
                // Handle error
                console.error('Failed to create account');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

window.addEventListener("load",function(){
    data=window.localStorage.getItem("user");
    console.log(data);
    if(data){
        data=JSON.parse(data);
        document.getElementById("username").innerText=data.username;
    }
})

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve profile picture data from localStorage
    const profilePictureData = localStorage.getItem('profilePicture');

    // Set profile picture src attribute
    const profilePictureElement = document.getElementById('profile-picture');

    // Check if profile picture data exists
    if (profilePictureData) {
        profilePictureElement.src = profilePictureData;
    } else {
        // Set default profile picture (replace 'default.jpg' with your default image file)
        profilePictureElement.src = 'default.jpg';
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const socialLinksContainer = document.getElementById('social-links');
    const addSocialLinkButton = document.getElementById('add-social-link');
    const saveSocialLinksButton = document.getElementById('save-social-links');

    let socialLinks = []; // Array to store social media links

    // Mapping of social media platforms to their icon classes
    const platformIcons = {
        'facebook.com': 'fa-facebook-square',
        'twitter.com': 'fa-twitter-square',
        'linkedin.com': 'fa-linkedin',
        'instagram.com': 'fa-instagram-square',
        'github.com': 'fa-github-square'
        // Add more mappings as needed
    };

    // Function to add input fields for social media links
    function addSocialLinkInput() {
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('social-link-input');

        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Enter social media URL';
        inputContainer.appendChild(urlInput);

        socialLinksContainer.appendChild(inputContainer);
    }

    // Event listener for adding social media link input fields
    addSocialLinkButton.addEventListener('click', function() {
        addSocialLinkInput();
    });

    // Event listener for saving social media links
    saveSocialLinksButton.addEventListener('click', function() {
        socialLinks = []; // Clear existing social links array
        // Iterate over input fields and push entered links to socialLinks array
        const inputContainers = document.querySelectorAll('.social-link-input');
        inputContainers.forEach(container => {
            const urlInput = container.querySelector('input[type="text"]:nth-child(1)');
            const url = urlInput.value.trim();
            if (url) {
                const icon = getIconClass(url);
                socialLinks.push({ url, icon });
            }
        });

        // Save social links to localStorage
        localStorage.setItem('socialLinks', JSON.stringify(socialLinks));

        // Clear input fields after saving
        socialLinksContainer.innerHTML = '';

        // Display social media icons
        displaySocialMediaIcons();
    });

    // Function to display social media icons
    function displaySocialMediaIcons() {
        socialLinksContainer.innerHTML = ''; // Clear existing content
        socialLinks.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'media-link';
            const iconElement = document.createElement('i');
            iconElement.className = `fab ${link.icon}`;
            linkElement.appendChild(iconElement);
            socialLinksContainer.appendChild(linkElement);
        });
    }

    // Load saved social media links from localStorage on page load
    const savedSocialLinks = JSON.parse(localStorage.getItem('socialLinks'));
    if (savedSocialLinks) {
        socialLinks = savedSocialLinks;
        displaySocialMediaIcons();
    }

    // Function to get icon class based on social media URL
    function getIconClass(url) {
        for (const platform in platformIcons) {
            if (url.includes(platform)) {
                return platformIcons[platform];
            }
        }
        // Default icon class if platform is not recognized
        return 'fa-question';
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const editBioButton = document.querySelector('.edit-bio');
    const uploadImageButton = document.querySelector('.upload-image');
    const bioText = document.querySelector('.bio-text');
    const profilePictureElement = document.getElementById('profile-picture');

    // Event listener for the edit bio button
    editBioButton.addEventListener('click', function() {
        const newBio = prompt('Enter your new bio:');
        if (newBio !== null) {
            // Update the UI
            bioText.textContent = newBio;
            // Update the database
            updateBio(newBio);
        }
    });

    // Event listener for the upload image button
    uploadImageButton.addEventListener('click', function() {
        // Create a file input element
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Accept only image files

        // Trigger the file input click event
        fileInput.click();

        // Event listener for file input change
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                // Read the selected file as a data URL
                const reader = new FileReader();
                reader.onload = function() {
                    const newProfilePicture = reader.result;
                    // Update the UI
                    profilePictureElement.src = newProfilePicture;
                    // Update the database
                    updateProfilePicture(newProfilePicture);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Function to update the bio in the database
    function updateBio(newBio) {
        // You need to implement a fetch request to your server endpoint to update the bio
        // Example:
        fetch('http://localhost:3000/updateBio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newBio })
        })
        .then(response => {
            if (response.ok) {
                console.log('Bio updated successfully');
            } else {
                console.error('Failed to update bio');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Function to update the profile picture in the database
    function updateProfilePicture(newProfilePicture) {
        // You need to implement a fetch request to your server endpoint to update the profile picture
        // Example:
        fetch('http://localhost:3000/updateProfilePicture', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newProfilePicture })
        })
        .then(response => {
            if (response.ok) {
                console.log('Profile picture updated successfully');
            } else {
                console.error('Failed to update profile picture');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});