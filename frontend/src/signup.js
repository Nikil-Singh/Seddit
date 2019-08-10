// Written by Nikil Singh (z5209322)

// Imports in scripts
import genFeed from './feed.js'

// Generates the signup button.
function genSignup(item) {
    if (item == "generate") {
        // Generates the signup and gets the button element for it.
        createSignup();
        // Creates the modal for displaying the signup form.
        createSignupModal();
    } else if (item == "verifyRegister") {
        // Checks if details in signup are correct, and if so then logs the user
        // in as well as signing the user up.
        verifyRegister();
    } else if (item == "clearErrors") {
        // Gets rid of any error messages.
        clearErrorMessages();
    }
}

// Creates the signup button.
function createSignup() {
    // Creates the button and sets required attributes.
    let btn = document.createElement("button");
    let text = document.createTextNode("Signup");
    btn.id = "signup-btn";
    btn.setAttribute("data-id-signup","");
    btn.appendChild(text);
    btn.classList.add("button", "button-secondary", "nav-item", "button-display");

    // Appends signup button to list in header.
    let element = document.getElementById("signup-li");
    element.appendChild(btn);
}

// Creates the modal for signup form.
function createSignupModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "signup-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "signup-content-modal";

    // Creates the username, password, email and name, signup boxes along
    // with form.
    let form = document.createElement("form");
    form.id = "signup-form";
    let username = createInputTextbox("username");
    let password = createInputTextbox("password");
    let email = createInputTextbox("email");
    let name = createInputTextbox("name");

    // Creates the register button.
    let registerBTN = createRegisterBTN();

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for signup modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Register");
    headerElement.appendChild(text);

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(username);
    contentBox.appendChild(password);
    contentBox.appendChild(email);
    contentBox.appendChild(name);
    contentBox.appendChild(registerBTN);
    box.appendChild(contentBox);
    form.appendChild(box)
    let element = document.getElementById("root");
    element.appendChild(form);
}

// Creats the sign in button for the modal.
function createRegisterBTN() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Register");
    button.id = "signup-submit";
    button.classList.add("button", "button-secondary");
    button.appendChild(text);
    btnDiv.classList.add("modal-content-items");
    btnDiv.appendChild(button);
    return btnDiv;
}

// Creates the textbox inputs for the modal.
function createInputTextbox(itemName) {
    let element = document.createElement("input");
    element.id = "signup-" + itemName;
    element.classList.add("modal-textbox");
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "signup-error-" + itemName;

    // Determines placeholder text and type based on item name.
    if (itemName == "password") {
        element.placeholder = "Password";
        element.type = "password";
    } else if (itemName == "username") {
        element.placeholder = "Username";
    } else if (itemName == "email") {
        element.placeholder = "Email";
    } else {
        element.placeholder = "Name";
    }

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("modal-content-items");
    div.appendChild(element);
    div.appendChild(errorText);
    return div;
}

// Creates the close button for the signup modal.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "signup-modal-close";
    return closeBTN
}

// Checks if register details are correct and display error messages if needed.
function verifyRegister() {
    // Gets values stored for username and password.
    const username = document.getElementById("signup-username");
    const password = document.getElementById("signup-password");
    const email = document.getElementById("signup-email");
    const name = document.getElementById("signup-name");

    // Variable to determine if any errors were found.
    let authenticate = 1;

    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if username, password, email or name were not given in form.
    if (username.value === '') {
        let element = document.getElementById("signup-error-username");
        element.innerText = "Username must have more than 0 characters";
        authenticate = 0;
    } else if (password.value === '') {
        let element = document.getElementById("signup-error-password");
        element.innerText = "Password must have more than 0 characters";
        authenticate = 0;
    } else if (email.value === '') {
        let element = document.getElementById("signup-error-email");
        element.innerText = "Email must have more than 0 characters";
        authenticate = 0;
    } else if (name.value === '') {
        let element = document.getElementById("signup-error-name");
        element.innerText = "Name must have more than 0 characters";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();
    // Signs the user up.
    signupUser(username.value, password.value, email.value, name.value);
}

// Gets rid of prior error messages if there no more errors.
function clearErrorMessages() {
    document.getElementById("signup-error-username").innerText = "";
    document.getElementById("signup-error-password").innerText = "";
    document.getElementById("signup-error-email").innerText = "";
    document.getElementById("signup-error-name").innerText = "";
}

// Call the check if the signup details for user are valid.
function signupUser(username, password, email, name) {
    // Holds the parameters needed to call backend for signup.
    const payload = {
        username: username,
        password: password,
        email: email,
        name: name
    }

    // Compiles all the parameters.
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    // Is the URL for fetching signup.
    let signupAuth = localStorage.getItem("api") + "/auth/signup"

    // Attempts to signup through the backend and handles any errors that return.
    fetch(signupAuth, options)
        .then(response => errors(response))
        .then(data => data.json())
        .then(data => {
            // Signs the user up.
            successfulSignup(data);
        })
        .catch(error => {
            // Lets the user attempt to signup again.
            failedSignup(error);
        });
}

// Handles any errors sent back from backend.
function errors(response) {
    // If there is an error.
    if (!response.ok) {
        console.log("Register Fetch Error");
        throw (response);
    }
    return response;
}

// Handles successful signup.
function successfulSignup(data) {
    console.log("Successful Register");
    // Closes modal.
    let modal = document.getElementById("signup-modal");
    modal.classList.toggle("show-modal");

    // Saves token for user in local storage.
    localStorage.setItem("token", data.token);

    // Gets and saves current user ID in local storage.
    getCurrentUserID();

    // Refreshes the navigation bar, feed, login and signup modals.
    // Toggles button display.
    document.getElementById("login-btn").classList.toggle("button-display");
    document.getElementById("logout-btn").classList.toggle("button-display");
    document.getElementById("signup-btn").classList.toggle("button-display");
    document.getElementById("profile-view").classList.toggle("button-display");
    // Sets value of signup modal to be empty string.
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-name").value = "";
    // Removes the previous feed and adds a new logged in feed.
    console.log("Removing Previous Feed");
    genFeed("removeCurrentFeed");
    document.getElementById("post-open-modal").classList.toggle("button-display");
    console.log("Getting New Feed");
    genFeed("morePrivate");
}

// Handles a failed signup.
function failedSignup(error) {
    console.log("Failed Register");
    // First removes any prior error messages.
    let usernameError = document.getElementById("signup-error-username");
    document.getElementById("login-error-password").innerText = "";

    // Checks if error status was 409, so username is already taken.
    if (error.status == "409") {
        usernameError.innerText = "Username already taken";
    }
}

// Gets the current user's ID.
function getCurrentUserID() {
    console.log("Adding current user id to local storage.")
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
            // Saves the user ID in local storage.
            localStorage.setItem("userID", data.id);
        });
}

export default genSignup;
