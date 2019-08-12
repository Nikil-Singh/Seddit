// Written by Nikil Singh (z5209322)

// Imports scripts
import genFeed from './feed.js'

// Generates the search bar and performs required actions.
function genSearch(command, item) {
    if (command == "generate") {
        // Creates the search bar in navigation bar.
        createSearchBar();
        // Create the search button.
        createSearchBTN();
    } else if (command == "search") {
        // Searches posts.
        searchFeed();
    }
}

// Creates the search bar in the navigation bar.
function createSearchBar() {
    let element = document.createElement("input");
    element.id = "search";
    element.setAttribute("data-id-search", "");
    element.placeholder = "Search Seddit";
    element.type = "search";
    element.classList.add("nav-item");

    let navList = document.getElementById("search-li");
    navList.appendChild(element);
}

// Creates the search button to allow for searches.
function createSearchBTN() {
    let button = document.createElement("button");
    button.innerText = "Search";
    button.id = "search-btn";
    button.classList.add("button", "button-secondary", "nav-item");

    let navList = document.getElementById("search-li");
    navList.appendChild(button);
}

// Searches the feed through posts to find any relevant posts.
function searchFeed() {
    let searchRequest = document.getElementById("search").value;
    // If the search result is an empty string
    if (searchRequest.trim() == "") {
        // Empty Search results in original feed reappearing.
        let uList = document.getElementById("feed");
        while (uList.hasChildNodes()) uList.removeChild(uList.firstChild);

        // Refreshes feed after changes made.
        localStorage.setItem("currPost", 0);
        genFeed("morePrivate");
    } else {
        searchPosts(searchRequest);
    }
}

// Searches posts from users that the logged in user follows.
function searchPosts(searchRequest) {
    // Removes previous feed.
    let uList = document.getElementById("feed");
    while (uList.hasChildNodes()) uList.removeChild(uList.firstChild);

    // Sets options to get user details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }

    // The url for accessing user of current user.
    let user = localStorage.getItem("api") + "/user/";
    fetch(user, options)
        .then(response => response.json())
        .then(data => {
            // Cycles through all the followers.
            for (let i = 0; i < data.following.length; i++) {
                searchFollowing(data.following[i], options, searchRequest);
            }
        });
}

// Cycles through all posts from users followed.
function searchFollowing(following, options, searchRequest) {
    // The url for accessing user of a particular id.
    let followAuth = localStorage.getItem("api") + "/user/?id=" + following;
    fetch(followAuth, options)
        .then(response => response.json())
        .then(data => {
            // Cycles through all the users post.
            for (let i = 0; i < data.posts.length; i++) {
                checkPost(data.posts[i], options, searchRequest);
            }
        });
}

// Goes through post to see if it matches search request.
function checkPost(post, options, searchRequest) {
    // The url for accessing a particular post.
    let postAuth = localStorage.getItem("api") + "/post/?id=" + post;
    fetch(postAuth, options)
        .then(response => response.json())
        .then(data => {
            let ul = document.getElementById("feed");
            // Checks if any of the contents of the post contain the search
            // request.
            if (data.text.includes(searchRequest)
                || data.title.includes(searchRequest)
                || data.meta.author.includes(searchRequest)
                || data.meta.subseddit.includes(searchRequest)) {

                // If search request is in text.
                let post = genFeed("returnPost", data);
                ul.appendChild(post);
            }
        });
}

export default genSearch;
