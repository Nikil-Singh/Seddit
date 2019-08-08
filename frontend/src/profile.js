// Written by Nikil Singh (z5209322)

// Creates the required links and modal to display user profiles.
function genProfile(command) {
    if (command == "generate") {
        // Creates the button to view modal of users own profile.
        createProfileBTN();
        // Creates the modal for viewing the users own profile.
        createProfileModal();
    } else if (command == "populate") {
        // Populates the modal with the current users details.
        populateProfileModal();
    } else if (command == "refresh") {
        // Removes all data from profile modal.
        refreshProfileModal()
    }
}

// Creates the sign in button for the modal and sets required attributes.
function createProfileBTN() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Profile");
    button.id = "profile-view";
    button.classList.add("button", "button-secondary", "nav-item", "button-display");
    button.appendChild(text);
    btnDiv.appendChild(button);

    // Appends required elements to the appropriate slots.
    let element = document.getElementById("user-profile-li");
    element.appendChild(button);
}

// Creates the modal to display user profile.
function createProfileModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "profile-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "profile-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for profile modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Profile");
    headerElement.appendChild(text);

    // Creates a section for the username.
    let username = profileInfoPara("Username: ", "username");
    // Creates a section for the name.
    let name = profileInfoPara("Name: ", "name");
    // Creates a section for the number of posts.
    let numPosts = profileInfoPara("Total Number of Posts: ", "numPosts");
    // Creates a section for the number of total upvotes.
    let totalUpvotes = profileInfoPara("Total Number of Up Votes: ", "totalUpvotes");
    // Creates a section for the number of followers.
    let followers = profileInfoPara("Total Number of Followers: ", "followers");
    // Creates a section for the number of people following.
    let following = profileInfoPara("Total Number of People Following: ", "following");

    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(username);
    contentBox.appendChild(name);
    contentBox.appendChild(numPosts);
    contentBox.appendChild(totalUpvotes);
    contentBox.appendChild(followers);
    contentBox.appendChild(following);
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
    closeBTN.id = "profile-modal-close";
    return closeBTN
}

// Creates a paragraph section for information on profile.
function profileInfoPara(message, id) {
    let div = document.createElement("div");
    let info = document.createElement("p");
    info.innerText = message;
    info.classList.add("profile-attributes")
    let data = document.createElement("p");
    data.innerText = "";
    data.id = "profile-" + id;
    data.classList.add("profile-attributes", "profile-data")

    div.appendChild(info);
    div.appendChild(data);
    return div;
}

// Populates the profile modal with required user information.
function populateProfileModal() {
    console.log("Populating Profile Modal");
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
    let user = localStorage.getItem("api") + "/user/";
    fetch(user, options)
        .then(response => response.json())
        .then(data => {
            // Adds the data to profile attributes.
            document.getElementById("profile-username").innerText = " " + data.username;
            document.getElementById("profile-name").innerText = " " + data.name;
            document.getElementById("profile-numPosts").innerText = " " + data.posts.length;
            document.getElementById("profile-followers").innerText = " " + data.followed_num;
            document.getElementById("profile-following").innerText = " " + data.following.length;

            let upvote = document.getElementById("profile-totalUpvotes");
            upvote.innerText = "0";
            // Gets the total upvotes.
            let post = "";
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
                    });
            }
        });
}

// Refreshes the profile modal of all previous data.
function refreshProfileModal() {
    document.getElementById("profile-username").innerText = "";
    document.getElementById("profile-name").innerText = "";
    document.getElementById("profile-numPosts").innerText = "";
    document.getElementById("profile-followers").innerText = "";
    document.getElementById("profile-following").innerText = "";
    document.getElementById("profile-totalUpvotes").innerText = "";
}

export default genProfile;
