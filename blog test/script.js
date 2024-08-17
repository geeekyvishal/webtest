document.addEventListener("DOMContentLoaded", function() {
    const blogPostsContainer = document.getElementById("blog-posts");
    const writeBlogButton = document.querySelector("nav ul li:nth-child(2) a");
    const modal = document.getElementById("blog-modal");
    const closeButton = document.querySelector(".close");
    const submitButton = document.getElementById("submit-blog");

    // Sample data for initial blog posts
    let posts = [
        { title: "Post 1", content: "This is the content of post 1." },
        { title: "Post 2", content: "This is the content of post 2." },
        { title: "Post 3", content: "This is the content of post 3." }
    ];

    // Function to display blog posts
    function displayPosts() {
        blogPostsContainer.innerHTML = "";
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            const titleElement = document.createElement("h2");
            titleElement.textContent = post.title;

            const contentElement = document.createElement("p");
            contentElement.textContent = post.content;

            postElement.appendChild(titleElement);
            postElement.appendChild(contentElement);

            blogPostsContainer.appendChild(postElement);
        });
    }

    // Display initial posts
    displayPosts();

    // Event listener for opening modal to write a blog
    writeBlogButton.addEventListener("click", function() {
        modal.style.display = "block";
    });

    // Event listener for closing the modal
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Event listener for submitting a blog
    submitButton.addEventListener("click", function() {
        const title = document.getElementById("blog-title").value;
        const content = document.getElementById("blog-content").value;
        if (title && content) {
            const newPost = { title, content };
            posts.push(newPost);
            displayPosts();
            modal.style.display = "none";
        } else {
            alert("Please enter both title and content for the blog.");
        }
    });
});
