// Written by Nikil Singh (z5209322)

// Imports scripts
import genFeed from './feed.js'

// Creates the required links and modal to display user pages.
function genPages(command, item) {
    if (command == "generate") {
        // Creates the modal to view users page.
        createUserModal();
    } else if (command == "populate") {
        // Populate user page with user information.
        populateUserPageModal(item);
    } else if (command == "refreshPost") {
        // Removes all previous posts placed on user pages modal.
        refreshPosts();
    }
}

// Creates the modal to display the user information and posts.
function createUserModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "user-page-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "user-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton("user-modal-");

    // Creates the follow/unfollow button.
    let followBTN = createFollowButton();

    // Creates heading for profile modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("User Page");
    headerElement.appendChild(text);

    // Creates a section for the username.
    let username = userInfoPara("Username: ", "username");
    // Creates a section for the name.
    let name = userInfoPara("Name: ", "name");
    // Creates a section for the number of posts.
    let numPosts = userInfoPara("Total Number of Posts: ", "numPosts");
    // Creates a section for the number of total upvotes.
    let totalUpvotes = userInfoPara("Total Number of Up Votes: ", "totalUpvotes");
    // Creates a section for the number of followers.
    let followers = userInfoPara("Total Number of Followers: ", "followers");
    // Creates a section for the number of people following.
    let following = userInfoPara("Total Number of People Following: ", "following");

    // Creates a division to display posts.
    let postBox = document.createElement("div");
    postBox.classList.add("user-posts");
    postBox.id = "user-posts-div";

    // Creates a text element.
    let p = document.createElement("p");
    p.innerText = "User Posts";
    p.classList.add("bold-text");
    let ul = document.createElement("ul");
    ul.id = "user-page-posts";

    // Appends required elements to each other.
    postBox.appendChild(ul);

    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(followBTN);
    contentBox.appendChild(username);
    contentBox.appendChild(name);
    contentBox.appendChild(numPosts);
    contentBox.appendChild(totalUpvotes);
    contentBox.appendChild(followers);
    contentBox.appendChild(following);
    contentBox.appendChild(p);
    contentBox.appendChild(postBox);
    box.appendChild(contentBox);

    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates the close button for the login modal and sets required attributes.
function createCloseButton(item) {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = item + "close";
    return closeBTN
}

// Creates a button to follow or unfollow that user.
function createFollowButton() {
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary", "follow-button");
    btn.id = "follow-btn";
    let btnText = document.createTextNode("Follow");
    btn.appendChild(btnText);

    return btn;
}

// Creates a paragraph section for information on profile.
function userInfoPara(message, id) {
    let div = document.createElement("div");
    let info = document.createElement("p");
    info.innerText = message;
    info.classList.add("profile-attributes")
    let data = document.createElement("p");
    data.innerText = "";
    data.id = "user-" + id;
    data.classList.add("profile-attributes", "profile-data")

    div.appendChild(info);
    div.appendChild(data);
    return div;
}

// Populates the user pages modal.
function populateUserPageModal(item) {
    console.log("Populating User Pages Modal");
    let username = item.replace("Posted by @", "");
    localStorage.setItem("userPageUsername", username);
    // Sets options to get certain details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }

    // The url for accessing user of particular ID.
    let user = localStorage.getItem("api") + "/user/?username=" + username;
    fetch(user, options)
        .then(response => response.json())
        .then(data => {
            // Adds the data to profile attributes.
            document.getElementById("user-username").innerText = " " + data.username;
            document.getElementById("user-name").innerText = " " + data.name;
            document.getElementById("user-numPosts").innerText = " " + data.posts.length;
            document.getElementById("user-followers").innerText = " " + data.followed_num;
            document.getElementById("user-following").innerText = " " + data.following.length;

            // Changes follow/unfollow button based on whether user follows the
            // users page being followed.
            let currUser = localStorage.getItem("api") + "/user/";
            fetch(currUser, options)
                .then(reply => reply.json())
                .then(newData => {
                    if (newData.following.includes(data.id)) {
                        // If user is followed.
                        document.getElementById("follow-btn").innerText = "Unfollow";
                    } else {
                        // If user is not followed.
                        document.getElementById("follow-btn").innerText = "Follow";
                    }
                });

            let upvote = document.getElementById("user-totalUpvotes");
            upvote.innerText = "0";
            // Gets the total upvotes.
            let post = "";
            let ul = document.getElementById("user-page-posts");
            // Cycles through all posts that the user has made.
            for (let i = 0; i < data.posts.length; i++) {
                let total = 0;
                // Fetches the post.
                post = localStorage.getItem("api") + "/post/?id=" + data.posts[i];
                fetch(post, options)
                    .then(response => response.json())
                    .then(data => {
                        // Increments total upvotes straight to modal.
                        upvote.innerText = Number(upvote.innerText) + data.meta.upvotes.length;
                        ul.appendChild(genFeed("returnPost", data));
                    });
            }
        });
}

// Refreshes the posts stored on user pages.
function refreshPosts() {
    let div = document.getElementById("user-posts-div");
    let ul = document.getElementById("user-page-posts");

    div.removeChild(ul);

    let newUl = document.createElement("ul");
    newUl.id = "user-page-posts";

    div.appendChild(newUl);
}

export default genPages;
