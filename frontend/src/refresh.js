// Written by Nikil Singh (z5209322)

// Imports in scripts.
import genFeed from './feed.js'

// Resets page to reflect any changes.
function refreshPage(apiUrl, item) {
    if (item == "feed") {
        refreshFeed(apiUrl);
    } else if (item == "nav") {
        refreshNav();
    }
}

// Refreshes the feed.
function refreshFeed(apiUrl) {
    let root = document.getElementById("root");
    let main = document.getElementById("main");

    root.removeChild(main);
    genFeed(apiUrl);
}

// Refreshes the navigation bar, by showing logout and hiding signup and login.
function refreshNav() {
    let login = document.getElementById("login-btn");
    let signup = document.getElementById("signup-btn");
    let logout = document.getElementById("logout-btn");

    login.classList.toggle("button-display");
    signup.classList.toggle("button-display");
    logout.classList.toggle("button-display");
}
export default refreshPage;
