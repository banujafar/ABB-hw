// Select elements
const root = document.querySelector('.root');

// Function to display loading animation
const displayLoading = (parentElement) => {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.style.display = "block";
    for (let i = 1; i <= 4; i++) {
        const span = document.createElement("span");
        loader.appendChild(span);
    }
    parentElement.appendChild(loader);
};

// Function to hide loading animation
const hideLoading = (parentElement) => {
    const loader = parentElement.querySelector(".loader");
    if (loader) {
        loader.style.display = "none";
    }
};

// Fetch users
const fetchUsers = () => {
    return fetch('https://ajax.test-danit.com/api/json/users')
        .then(res => res.json())
        .catch(err => console.log(err));
};

// Fetch posts
const fetchPosts = () => {
    return fetch('https://ajax.test-danit.com/api/json/posts')
        .then(res => res.json())
        .catch(err => console.log(err));
};

// Delete post
const deletePost = (postId) => {
    return fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
        method: 'DELETE',
    })
        .then(response => response);
};

// Send post
const sendPost = (userId, title, body) => {
    return fetch("https://ajax.test-danit.com/api/json/posts", {
        method: 'POST',
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data);
};

//Edit post
const editPost = (postId, userId, title, body) => {
    return fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: userId,
            title: title,
            body: body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to update post.');
        })
        .catch(error => console.log(error));
};
displayLoading(root);
class Card {
    constructor(title, text, userName, userEmail, userUserName) {
        this.title = title;
        this.text = text;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userUserName = userUserName;
    }

    createPostCard() {
        const card = document.createElement('div');

        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title')
        cardTitle.textContent = this.title;

        const cardBody = document.createElement('p');
        cardBody.classList.add('card-body')
        cardBody.textContent = this.text;

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');

        const userProfile = document.createElement('div');
        userProfile.classList.add('user-profile');
        const userNameArr = this.userName.split(' ');
        const profilePic = userNameArr.map(userName => userName[0]).join('');
        userProfile.textContent = profilePic;

        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info')

        const userNameElement = document.createElement('h2');
        userNameElement.textContent = this.userName;

        const userUsername = document.createElement('p');
        userUsername.textContent = `${this.userEmail}`;

        const delButton = document.createElement('button');
        delButton.classList.add('delete')
        delButton.innerHTML = '<i class="fas fa-trash"></i>';

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '<i class="fas fa-pen"></i>'

        userInfo.appendChild(userNameElement);
        userInfo.appendChild(userUsername);

        cardHeader.appendChild(userProfile);
        cardHeader.appendChild(userInfo);

        card.classList.add('card');

        card.appendChild(cardHeader);
        card.appendChild(cardTitle);
        card.appendChild(cardBody);
        card.appendChild(delButton);
        card.appendChild(editButton);

        return card;
    }
}

// Create modal element
const modal = document.createElement('div');
modal.classList.add('modal');

// Create modal content
const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');

const title = document.createElement('input');
title.classList.add('input-title')
const body = document.createElement('input');
body.classList.add('input-body')

const sendBtn = document.createElement('button');
// Create close button
const closeButton = document.createElement('div');
closeButton.classList.add('close');
closeButton.innerHTML = '&times;';

// Add close button to modal content
modalContent.appendChild(closeButton);
modalContent.appendChild(title);
modalContent.appendChild(body);
modalContent.appendChild(sendBtn);
sendBtn.textContent = `Send`;

// Add modal content to modal
modal.appendChild(modalContent);

const openModal = () => {
    modal.style.display = 'block';
};

// Function to close the modal
const closeModal = () => {
    modal.style.display = 'none';
};

// Event listener for close button click
closeButton.addEventListener('click', closeModal);

// Append modal to the document body
root.appendChild(modal);

// Display data as Card
Promise.all([fetchUsers(), fetchPosts()])
    .then(([users, posts]) => {
        hideLoading(root);
        users.forEach(user => {
            const cardContainer = document.createElement('div');
            const createPostBtn = document.createElement('button');
            createPostBtn.classList.add('send');
            createPostBtn.textContent = 'Create post';
            cardContainer.classList.add('card-container');
            cardContainer.appendChild(createPostBtn);

            posts.forEach(post => {
                if (post.userId === user.id) {
                    const cardPosts = new Card(post.title, post.body, user.name, user.email, user.username);
                    const cardElement = cardPosts.createPostCard();
                    cardContainer.appendChild(cardElement);

                    const deleteButton = cardElement.querySelector('.delete');
                    deleteButton.addEventListener('click', () => {
                        deletePost(post.id);
                        cardElement.remove();
                    });
                    const editButton = cardElement.querySelector('.edit');
                    editButton.addEventListener('click', () => {
                        openModal();
                        // Set the input values to the existing post's data


                        const updatePostHandler = () => {
                            const inputTitle = document.querySelector('.input-title');
                            const inputBody = document.querySelector('.input-body');
                            console.log(inputTitle.value)
                            editPost(post.id, user.id, inputTitle.value, inputBody.value)
                                .then(data => {
                                    // Update the card with the new post data
                                    cardElement.querySelector('.card-title').textContent = data.title;
                                    cardElement.querySelector('.card-body').textContent = data.body;
                                    closeModal();
                                    // Remove the event listener after it has been used once
                                    sendBtn.removeEventListener('click', updatePostHandler);
                                })
                                .catch(error => console.error(error));
                        };

                        sendBtn.addEventListener('click', updatePostHandler);
                    });

                }
            });

            createPostBtn.addEventListener('click', () => {
                const selectedPost = posts.find(post => post.userId === user.id);
                if (selectedPost) {
                    openModal();

                    const sendPostHandler = () => {
                        const userId = selectedPost.userId;
                        const postTitle = title.value;
                        const postBody = body.value;

                        sendPost(userId, postTitle, postBody)
                            .then(data => {
                                const newCardPosts = new Card(data.title, data.body, user.name, user.email, user.username);
                                const newCardElement = newCardPosts.createPostCard();
                                cardContainer.insertBefore(newCardElement, createPostBtn.nextSibling);
                                closeModal();

                                // Remove the event listener after it has been used once
                                sendBtn.removeEventListener('click', sendPostHandler);
                            })
                            .catch(error => console.error(error));
                    };

                    sendBtn.addEventListener('click', sendPostHandler);
                }
            });

            root.appendChild(cardContainer);
        });
    })
    .catch((error) => console.error(error));
