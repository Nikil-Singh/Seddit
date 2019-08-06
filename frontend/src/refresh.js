// Written by Nikil Singh (z5209322)

// Imports in scripts.
import genFeed from './feed.js'

// Resets page to reflect any changes.
function refreshPage(item) {
    // Checks element to refresh is feed.
    if (item == "feed") {
        refreshFeed();
    // Checks element to refresh is navigation bar.
    } else if (item == "nav") {
        refreshNav();
    // Checks element to refresh is the upvotes modal.
    } else if (item == "upvotes") {
        refreshUpvotes();
    // Checks element to refresh is the comments modal.
    } else if (item == "comments") {
        refreshComments();
    // Checks element to refresh is login and signup modal.
    } else if (item == "login/signup") {
        refreshLoginSignup();
    }
}

// Refreshes the feed.
function refreshFeed() {
    let root = document.getElementById("root");
    let main = document.getElementById("main");

    // Gets rid of previous feed.
    root.removeChild(main);

    // Updates the feed.
    genFeed();
}

// Refreshes the navigation bar, by showing logout and hiding signup and login.
function refreshNav() {
    // Gets elements from the navigation bar that need their visibility altered.
    let login = document.getElementById("login-btn");
    let signup = document.getElementById("signup-btn");
    let logout = document.getElementById("logout-btn");

    // Changes visibility of the following buttons.
    login.classList.toggle("button-display");
    signup.classList.toggle("button-display");
    logout.classList.toggle("button-display");
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
    modal.appendChild(newUl);
}

// Refreshes the login and signup modal by setting value of text boxes to be
// empty strings.
function refreshLoginSignup() {
    // Sets all the textboxes to refreshed by changing their value to empty
    // string.
    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-name").value = "";
}

export default refreshPage;
