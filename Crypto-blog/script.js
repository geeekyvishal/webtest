document.addEventListener('DOMContentLoaded', function() {
    const addBlogBtn = document.getElementById('add-blog-btn');
    const addBlogForm = document.getElementById('add-blog-form');
    const blogsSection = document.getElementById('blogs');

    addBlogBtn.addEventListener('click', function() {
        addBlogForm.style.display = 'block';
    });

    const submitBlogBtn = document.getElementById('submit-blog-btn');

    submitBlogBtn.addEventListener('click', function() {
        const blogTitle = document.getElementById('blog-title').value;
        const blogContent = document.getElementById('blog-content').value;
        const blogImage = document.getElementById('blog-image').files[0];

        // For demonstration, let's display the blog on the page
        displayBlog(blogTitle, blogContent, blogImage);

        // Reset form
        document.getElementById('blog-title').value = '';
        document.getElementById('blog-content').value = '';
        document.getElementById('blog-image').value = '';
    });

    function displayBlog(title, content, image) {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const contentElement = document.createElement('p');
        contentElement.textContent = content;

        blogDiv.appendChild(titleElement);
        blogDiv.appendChild(contentElement);

        if (image) {
            const imageElement = document.createElement('img');
            imageElement.src = URL.createObjectURL(image);
            blogDiv.appendChild(imageElement);
        }

        blogsSection.appendChild(blogDiv);
    }
});
