// Written by Nikil Singh (z5209322)

// Generates the comments modal.
function genComments(item, postID) {
    if (item == "generate") {
        // Creates the comments modal.
        createCommentsModal();
    } else if (item == "showComments") {
        // Refreshes the comment modal and loads new comments.
        refreshComments()
        showComments(postID);
    } else if (item == "makeComment") {
        // Checks comment to make is valid and submits it.
        verifyComment();
    } else if (item == "clearErrors") {
        // Clears error messages on modal.
        clearErrorMessages();
    }
}

// Creates the modal to display comments.
function createCommentsModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "comments-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "comments-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates header for list.
    let header = document.createElement("h4");
    header.innerText = "Comments"

    // Creates the unordered list.
    let ul = document.createElement("ul");
    ul.id = "comments-list";
    ul.classList.add("comment-list");

    // Gets the div for comment texttbox and button.
    let comment = commentTextBox();

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(header);
    contentBox.appendChild(ul);
    contentBox.appendChild(comment);
    box.appendChild(contentBox);
    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates the close button for the comments modal and sets required attributes.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "comments-modal-close";
    return closeBTN
}

// Creates a textbox to input comments.
function commentTextBox() {
    // Creates textbox with section for error messages.
    let element = document.createElement("input");
    element.id = "comment-textbox";
    element.classList.add("modal-textbox", "comment-text-button");
    element.placeholder = "Enter Comment Here";

    // Creates a section for error messages.
    let errorText = document.createElement("p");
    let errorT = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(errorT);
    errorText.id = "comments-error";

    // Creates a button to submit comment.
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary", "comment-text-button");
    btn.id = "comment-submit";
    let text = document.createTextNode("Comment");
    btn.appendChild(text);

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("comment-content-item");
    div.id = "comment-submit-items";
    div.appendChild(element);
    div.appendChild(btn);
    div.appendChild(errorText);
    return div;
}

// Gets the ID's of users who commented on the post.
function showComments(postID) {

    // Extracts the posts ID from postID string.
    postID = postID.substring(14, postID.length);

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
    let comments = localStorage.getItem("api") + "/post/?id=" + postID;
    // Fetches the post, and sends them off to be displayed.
    fetch(comments, options)
        .then(response => response.json())
        .then(data => {
            // Displays the comments on modal.
            displayComments(data.comments);
        });

    // Displays comments modal if comments modal isn't already displayed.
    let commentModal = document.getElementById("comments-modal");
    if (!commentModal.classList.contains("show-modal")) {
        commentModal.classList.toggle("show-modal");
    }
}

// Cycles through commenter IDs and adds them to modal to be displayed.
function displayComments(commenters) {
    let ul = document.getElementById("comments-list")
    // Cycles through all commenters.
    for (let i = 0; i < commenters.length; i++) {
        let userLi = createComment(commenters[i]);
        // Appends user comment to list of comments.
        ul.appendChild(userLi);
    }
}

// Create a comment.
function createComment(commenter) {
    // Creates the list for hold the comment.
    let userLi = document.createElement("li");
    userLi.classList.add("comments-modal-list");

    // Holds the name of the commenter.
    let name = document.createElement("p");
    name.innerText = commenter.author;
    name.classList.add("comments-modal-text");

    // Holds the actual comment.
    let comment = document.createElement("p");
    comment.innerText = commenter.comment;
    comment.classList.add("comments-modal-text");

    // Holds the date.
    let timestamp = getDate(new Date(commenter.published * 1000));
    let time = document.createElement("p");
    time.innerText = timestamp;
    time.classList.add("comments-modal-text");

    // Appends all the elements of a user comment to a list.
    userLi.appendChild(name);
    userLi.appendChild(comment);
    userLi.appendChild(time);

    return userLi;
}

// Converts unix date to readable date.
function getDate(unixDate) {
    // Gets the day, month and year in form DD/MM/YYYY.
    let year = unixDate.getFullYear();
    let month = unixDate.getMonth();
    if (month < 10) month = "0" + month;
    let day = unixDate.getDate();
    if (day < 10) day = "0" + day;
    let date = day + "/" + month + "/" + year;

    // Gets the time of post in 24-Hour time.
    let hour = unixDate.getHours();
    if (hour < 10) hour = "0" + hour;
    let minutes = unixDate.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let time = hour + ":" + minutes;

    // Returns the timestamp in form time on date.
    return time + " on " + date;
}

// Refreshes the comments modal by removing list of comments on modal.
function refreshComments() {
    // Gets the parent modal.
    let modal = document.getElementById("comments-content-modal");
    // Gets the unordered list to be removed.
    let ul = document.getElementById("comments-list");
    // Gets rid of all previous upvotes displayed.
    modal.removeChild(ul);

    // Creates the unordered list.
    let newUl = document.createElement("ul");
    newUl.id = "comments-list";
    newUl.classList.add("comment-list");

    // Append new unordered list to modal.
    modal.insertBefore(newUl, modal.childNodes[2]);

    // Clears any error messages.
    clearErrorMessages()
}

// Verifies whether the comment is valid.
function verifyComment() {
    console.log(localStorage.getItem("commentID"));
    // Gets value stored in comments.
    const comment = document.getElementById("comment-textbox").value;

    // Variable to determine if any errors were found.
    let authenticate = 1;

    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if no comment was entered.
    if (comment.trim() === '') {
        let element = document.getElementById("comments-error");
        element.innerText = "Comment must have more than one character";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();

    // Adds the comment.
    addComment(comment);
}

// Gets rid of prior error messages if there no more errors.
function clearErrorMessages() {
    document.getElementById("comments-error").innerText = "";
}

// Adds a comment to a post.
function addComment(comment) {
    console.log("Adding comment");
    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    // Holds the parameters needed to call backend for login.
    const payload = {
        comment: comment
    }

    // Compiles all the parameters.
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
        body: JSON.stringify(payload)
    }
    // Gets the ID for the post to comment on.
    let commentID = localStorage.getItem("commentID");
    commentID = commentID.substring(14, commentID.length);
    // Is the URL for fetching login.
    let commentAuth = localStorage.getItem("api") + "/post/comment/?id=" + commentID;
    // Fetches the comment and adds it.
    fetch(commentAuth, options)
        .then(response => response.json())
        .then(response => {
            // Updates the number of comments on post.
            let numComments = document
                .getElementById("comments-post-" + commentID).innerText;
            let number = numComments.substr(0,numComments.indexOf(' '));
            number = 1 + Number(number);
            document.getElementById("comments-post-" + commentID)
                .innerText = number + " Comments";

            // Updates the comment modal to display comments.
            document.getElementById("comment-textbox").value = "";
            refreshComments()
            showComments("comments-post-" + commentID);
        });

}

export default genComments;
