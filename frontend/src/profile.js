// Written by Nikil Singh (z5209322)

// Creates the required links and modal to display user profiles.
function genProfile(command) {
    if (command == "generate") {
        // Creates the button to view modal of users own profile.
        createProfileBTN();
        // Creates the modal for viewing the users own profile.
        createProfileModal();
        // Creates the modal for updating users own profile.
        createUpdateProfileModal();
    } else if (command == "populate") {
        // Populates the modal with the current users details.
        populateProfileModal();
    } else if (command == "refresh") {
        // Removes all data from profile modal.
        refreshProfileModal()
    } else if (command == "populateProfileModal") {
        // Populates the modal with users pre-existing date.
        populateUpdateModal();
    } else if (command == "clearErrors") {
        // Removes all previous error messages on modal.
        clearErrorMessages();
    } else if (command == "verifyUpdate") {
        // Checks if details given are correct and if so then updates the users
        // profile.
        verifyUpdate();
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
    let closeBTN = createCloseButton("profile-modal-");

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
    // Creates a button for updating profile.
    let button = updateProfileButton();

    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(username);
    contentBox.appendChild(name);
    contentBox.appendChild(numPosts);
    contentBox.appendChild(totalUpvotes);
    contentBox.appendChild(followers);
    contentBox.appendChild(following);
    contentBox.appendChild(button);
    box.appendChild(contentBox);

    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates the modal for updating the user profile.
function createUpdateProfileModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "update-profile-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "update-profile-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton("update-profile-modal-");

    // Creates heading for profile modal.
    let form = document.createElement("form");
    form.id = "update-profile-form";
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Update Profile");
    headerElement.appendChild(text);

    // Creates the textboxes to update profile.
    let email = createInputTextbox("email");
    let name = createInputTextbox("name");
    let password = createInputTextbox("password");

    // Creates the button to confirm update.
    let confirmUpdate = updateProfileSubmit();

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(email);
    contentBox.appendChild(name);
    contentBox.appendChild(password);
    contentBox.appendChild(confirmUpdate);
    box.appendChild(contentBox);
    form.appendChild(box);

    let element = document.getElementById("root");
    element.appendChild(form);
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

// Creates the profile button for the modal and sets required attributes.
function updateProfileButton() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Update Profile");
    button.id = "profile-update";
    button.classList.add("button", "button-secondary");
    button.appendChild(text);
    btnDiv.classList.add("modal-content-items");
    btnDiv.appendChild(button);
    return btnDiv;
}

// Creates the profile button for the modal and sets required attributes.
function updateProfileSubmit() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Confirm Updates");
    button.id = "profile-update-submit";
    button.classList.add("button", "button-secondary");
    button.appendChild(text);
    btnDiv.classList.add("modal-content-items");
    btnDiv.appendChild(button);
    return btnDiv;
}

// Creates the textbox inputs for the modal and sets required attributes.
function createInputTextbox(itemName) {
    // Creates the title for textbox.
    let title = document.createElement("p");
    title.innerText = itemName.substr(0,1).toUpperCase()
        + itemName.substr(1, itemName.length);

    // Creates textbox with section for error messages.
    let element = document.createElement("input");
    element.id = "profile-update-" + itemName;
    element.classList.add("modal-textbox");
    if (itemName == "password") element.type = "password";
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "profile-error-" + itemName;

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("modal-content-items");
    div.appendChild(title);
    div.appendChild(element);
    div.appendChild(errorText);
    return div;
}

// Populates the profile modal with required user information.
function populateProfileModal() {
    console.log("Populating Profile Modal");
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

// Adds the current users details to update modal for changing.
function populateUpdateModal() {
    console.log("Populating the update profile modal");
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
            // Sets the values inside text boxes on update profile modal.
            document.getElementById("profile-update-email").value = data.email;
            document.getElementById("profile-update-name").value = data.name;
        });
}

// Checks if the user inputted data for updating profile is correct and if so
// then updates the user's profile.
function verifyUpdate() {
    console.log("Verifying update");
    // Gets values stored for email, name and password.
    const email = document.getElementById("profile-update-email").value;
    const name = document.getElementById("profile-update-name").value;
    const password = document.getElementById("profile-update-password").value;

    // Variable to determine if any errors were found.
    let authenticate = 1;

    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if no username or password were given in form.
    if (email === '') {
        let element = document.getElementById("profile-error-email");
        element.innerText = "Email must have more than 0 characters";
        authenticate = 0;
    } else if (name === '') {
        let element = document.getElementById("profile-error-name");
        element.innerText = "Name must have more than 0 characters";
        authenticate = 0;
    } else if (password === '') {
        let element = document.getElementById("profile-error-password");
        element.innerText = "Password must have more than 0 characters";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();

    // Updates the user profile.
    updateProfile(email, name, password);
}

// Updates the user profile with submitted information.
function updateProfile(email, name, password) {
    console.log("Updating User Profile");
    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;

    // Holds the parameters needed to call backend for updating profile data.
    const payload = {
        email: email,
        name: name,
        password: password
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

    // Is the URL for fetching login.
    let profileAuth = localStorage.getItem("api") + "/user/";

    // Attempts to login through the backend and handles any errors that return.
    fetch(profileAuth, options)
        .then(data => data.json())
        .then(data => {
            let modal = document.getElementById("update-profile-modal");
            modal.classList.toggle("show-modal");
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

// Refreshes the update profile modal.
function clearErrorMessages() {
    // Removes all previous error messages.
    document.getElementById("profile-error-email").innerText = "";
    document.getElementById("profile-error-name").innerText = "";
    document.getElementById("profile-error-password").innerText = "";
}

export default genProfile;
