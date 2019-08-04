// Written by Nikil Singh (z5209322)

// Imports in scripts.
import genFeed from './feed.js'

// Resets page to reflect any changes.
function refreshPage(apiUrl, item) {
    // Checks element to refresh is feed.
    if (item == "feed") {
        refreshFeed(apiUrl);
    // Checks element to refresh is navigation bar.
    } else if (item == "nav") {
        refreshNav();
    }
}

// Refreshes the feed.
function refreshFeed(apiUrl) {
    let root = document.getElementById("root");
    let main = document.getElementById("main");

    // Gets rid of previous feed.
    root.removeChild(main);

    // Updates the feed.
    genFeed(apiUrl);
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
export default refreshPage;
