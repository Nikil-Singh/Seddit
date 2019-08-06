// Written by Nikil Singh (z5209322)

// Imported scripts.
import refreshPage from './refresh.js'

// Generates the comments modal.
function genComments(item, postID) {
    if (item == "generate") {
        createCommentsModal();
    } else if (item == "showComments") {
        refreshPage("comments");
        showComments(postID);
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

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(header);
    contentBox.appendChild(ul);
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

// Gets the ID's of users who commented on the post.
function showComments(postID) {

    // Extracts the posts ID from postID string.
    postID = postID.substring(9, postID.length);

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
            displayComments(data.comments);
        });
    let commentModal = document.getElementById("comments-modal");
    commentModal.classList.toggle("show-modal");
}

// Cycles through commenter IDs and adds them to modal to be displayed.
function displayComments(commenters) {
    console.log(commenters);
    let ul = document.getElementById("comments-list")
    // Cycles through all commenters.
    for (let i = 0; i < commenters.length; i++) {
        // Creates the list for hold the comment.
        let userLi = document.createElement("li");
        userLi.classList.add("comments-modal-list");

        // Holds the name of the commenter.
        let name = document.createElement("p");
        name.innerText = commenters[i].author;
        name.classList.add("comments-modal-text");

        // Holds the actual comment.
        let comment = document.createElement("p");
        comment.innerText = commenters[i].comment;
        comment.classList.add("comments-modal-text");

        // Holds the date.
        let timestamp = getDate(new Date(commenters[i].published * 1000));
        let time = document.createElement("p");
        time.innerText = timestamp;
        time.classList.add("comments-modal-text");

        // Appends all the elements of a user comment to a list.
        userLi.appendChild(name);
        userLi.appendChild(comment);
        userLi.appendChild(time);

        // Appends user comment to list of comments.
        ul.appendChild(userLi);
    }

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

export default genComments;
