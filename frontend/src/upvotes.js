// Written by Nikil Singh (z5209322)

// Generates the upvotes modal.
function genUpvotes(item, postID) {
    if (item == "generate") {
        createUpvotesModal();
    } else if (item == "showVotes") {
        showVotes(postID);
    }

    const close = document.getElementById("upvotes-modal-close");

    // Event listener for closing login form modal.
    close.addEventListener('click', function() {
        let modal = document.getElementById("upvotes-modal")
        modal.classList.toggle("show-modal");
        modal.classList.toggle("show-modal");
    })
}

// Creates the modal to display upvotes.
function createUpvotesModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "upvotes-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "upvotes-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates the unordered list.
    let ul = document.createElement("ul");
    ul.id = "upvotes-list";

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(ul);
    box.appendChild(contentBox);
    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates the close button for the login modal and sets required attributes.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "upvotes-modal-close";
    return closeBTN
}

// Gets the ID's of users who upvoted the post.
function showVotes(postID) {
    // Extracts the posts ID from postID string.
    postID = postID.substring(5, postID.length);

    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }

    // The url for accessing post of particular ID.
    let post = localStorage.getItem("api") + "/post/?id=" + postID;

    // Fetches the post, and sends them off to be displayed.
    fetch(post, options)
        .then(response => response.json())
        .then(data => {
            displayVotes(data.meta.upvotes);
        });
    let upvoteModal = document.getElementById("upvotes-modal");
    upvoteModal.classList.toggle("show-modal");
}

// Cycles through voter IDs and adds them to modal to be displayed.
function displayVotes(votersID) {
    // Cycles through all voterID.
    for (let i = 0; i < votersID.length; i++) {
        // Sets options to get post details.
        let tokenString = "Token " + localStorage.token;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': tokenString
            }
        }

        // The url for accessing post of particular ID.
        let user = localStorage.getItem("api") + "/user/?id=" + votersID[i];
        fetch(user, options)
            .then(response => response.json())
            .then(data => {
                addUserNameUpvote(data);
            });
    }
}

// Adds user to modal list of people who upvoted that post.
function addUserNameUpvote(user) {
    let userLi = document.createElement("li");
    let name = document.createElement("p");
    name.innerText = user.username;
    userLi.appendChild(name);

    let ulElement = document.getElementById("upvotes-list");
    ulElement.appendChild(userLi);
}

export default genUpvotes;
