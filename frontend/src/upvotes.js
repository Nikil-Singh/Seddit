// Written by Nikil Singh (z5209322)

// Generates the upvotes modal.
function genUpvotes(item, postID) {
    if (item == "generate") {
        createUpvotesModal();
    } else if (item == "showVotes") {
        refreshUpvotes();
        showVotes(postID);
    } else if (item == "addVote") {
        changeVote(postID, "PUT");
    } else if (item == "removeVote") {
        changeVote(postID, "DELETE");
    }
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

    // Creates header for list.
    let header = document.createElement("h4");
    header.innerText = "Up Voters"

    // Creates the unordered list.
    let ul = document.createElement("ul");
    ul.id = "upvotes-list";

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(header);
    contentBox.appendChild(ul);
    box.appendChild(contentBox);
    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates the close button for the upvotes and sets required attributes.
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

        // The url for accessing user of particular ID.
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
    userLi.classList.add("upvotes-modal-list");
    let name = document.createElement("p");
    name.innerText = user.username;
    userLi.appendChild(name);

    let ulElement = document.getElementById("upvotes-list");
    ulElement.appendChild(userLi);
}

// Adds an upvote to the post.
function changeVote(postID, method) {
    // Gets the element for the upvote arrow.
    let arrow = document.getElementById(postID);
    arrow.classList.toggle("post-arrow-click");

    // Extracts the post ID.
    let id = postID.substring(12, postID.length);

    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }

    // The url for changing an upvote to a post.
    let upVote = localStorage.getItem("api") + "/post/vote/?id=" + id;
    // Fetches the post, to add upvote.
    fetch(upVote, options)
        .then(response => response.json())
        .then(response => {
            // Gets the element for vote number for post.
            let numVotes = document.getElementById("vote-" + id);
            // If adding a vote.
            if (method == "PUT") {
                numVotes.innerText = Number(numVotes.innerText) + 1;
            // If removing a vote.
            } else {
                numVotes.innerText = Number(numVotes.innerText) - 1;
            }
        });
}

// Refreshes the upvote modal by removing previous upvotes on modal.
function refreshUpvotes() {
    // Gets the parent modal.
    let modal = document.getElementById("upvotes-content-modal");
    // Gets the unordered list to be removed.
    let ul = document.getElementById("upvotes-list");
    // Gets rid of all previous upvotes displayed.
    modal.removeChild(ul);

    // Creates a new unordered list.
    let newUl = document.createElement("ul");
    newUl.id = "upvotes-list";

    // Append new unordered list to modal.
    modal.appendChild(newUl);
}

export default genUpvotes;
