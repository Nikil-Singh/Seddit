// Written by Nikil Singh (z5209322)

// Imported scripts.
import refreshPage from './refresh.js'

// Generates the login and logout buttons.
function genLogin() {
    // Generates the login and gets the button element for it.
    const login = createLogin();
    // Generates the logout and gets the button element for it.
    const logout = createLogout();
    // Creates the modal for displaying the login form.
    createLoginModal();

    // Gets all clickable elements from login modal form.
    const modal = document.getElementById("login-modal");
    const close = document.getElementById("login-modal-close");
    const signIn = document.getElementById("login-submit");

    // Checks if a token is stored in local storage (checks if user is logged
    // in and then displays required buttons.)
    if (localStorage.getItem("token") === null) {
        login.classList.toggle("button-display");
    } else {
        logout.classList.toggle("button-display");
    }

    // Event listener for if logout button is clicked.
    logout.addEventListener('click', function() {
        // Clears token and user ID from local storage since the user is
        // logging out.
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        // Refreshes the navigation bar.
        refreshPage("nav");
        // Refreshes the feed.
        refreshPage("feed");
    })

    // Event listener for if login button is clicked.
    login.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
    });

    // Event listener for closing login form modal.
    close.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
        // Gets rid of any error messages.
        clearErrorMessages();
    })

    // Event listener for sign in button on login form modal.
    signIn.addEventListener('click', function(e) {
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Checks if sign in data is correct.
        verifySignIn();
    })

}

// Creates the login button.
function createLogin() {
    // Creates the button and sets required attributes.
    let btn = document.createElement("button");
    let text = document.createTextNode("Sign In");
    btn.id = "login-btn";
    btn.setAttribute("data-id-login","");
    btn.appendChild(text);
    btn.classList.add("button", "button-primary", "nav-item", "button-display");

    // Appends login button to list in header.
    let element = document.getElementById("login-li");
    element.appendChild(btn);

    return btn;
}

// Creates the logout button.
function createLogout() {
    // Creates the button and sets required attributes..
    let btn = document.createElement("button");
    let text = document.createTextNode("Logout");
    btn.id = "logout-btn";
    btn.appendChild(text);
    btn.classList.add("button", "button-primary", "nav-item", "button-display");

    // Appends login button to list in header.
    let element = document.getElementById("logout-li");
    element.appendChild(btn);

    return btn;
}

// Creates the modal for login form.
function createLoginModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "login-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "login-content-modal";

    // Creates the username and password login boxes along with form.
    let form = document.createElement("form");
    form.id = "login-form";
    let username = createInputTextbox("username");
    let password = createInputTextbox("password");

    // Creates the sign in button.
    let signInBTN = createSignInBTN();

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for login modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Sign In");
    headerElement.appendChild(text);

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(username);
    contentBox.appendChild(password);
    contentBox.appendChild(signInBTN);
    box.appendChild(contentBox);
    form.appendChild(box)
    let element = document.getElementById("root");
    element.appendChild(form);
}

// Creates the close button for the login modal and sets required attributes.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "login-modal-close";
    return closeBTN
}

// Creates the textbox inputs for the modal and sets required attributes.
function createInputTextbox(itemName) {
    // Creates textbox with section for error messages.
    let element = document.createElement("input");
    element.id = "login-" + itemName;
    element.classList.add("modal-textbox");
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "login-error-" + itemName;

    // Determines placeholder text and type based on item name.
    if (itemName == "password") {
        element.placeholder = "Password";
        element.type = "password";
    } else {
        element.placeholder = "Username";
    }

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("modal-content-items");
    div.appendChild(element);
    div.appendChild(errorText);
    return div;
}

// Creates the sign in button for the modal and sets required attributes..
function createSignInBTN() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Sign In");
    button.id = "login-submit";
    button.classList.add("button", "button-secondary");
    button.appendChild(text);
    btnDiv.classList.add("modal-content-items");
    btnDiv.appendChild(button);
    return btnDiv;
}

// Checks if login details are correct and display error messages if needed.
function verifySignIn(token) {
    // Gets values stored for username and password.
    const username = document.getElementById("login-username");
    const password = document.getElementById("login-password");

    // Variable to determine if any errors were found.
    let authenticate = 1;

    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if no username or password were given in form.
    if (username.value === '') {
        let element = document.getElementById("login-error-username");
        element.innerText = "Username must have more than 0 characters";
        authenticate = 0;
    } else if (password.value === '') {
        let element = document.getElementById("login-error-password");
        element.innerText = "Password must have more than 0 characters";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();

    return loginUser(username.value, password.value);
}

// Gets rid of prior error messages if there no more errors.
function clearErrorMessages() {
    document.getElementById("login-error-username").innerText = "";
    document.getElementById("login-error-password").innerText = "";
}

// Calls the backend to check if username and password is valid.
function loginUser(username, password) {
    // Holds the parameters needed to call backend for login.
    const payload = {
        username: username,
        password: password
    }

    // Compiles all the parameters.
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    // Is the URL for fetching login.
    let loginAuth = localStorage.getItem("api") + "/auth/login";

    // Attempts to login through the backend and handles any errors that return.
    fetch(loginAuth, options)
        .then(response => errors(response))
        .then(data => data.json())
        .then(data => {
            // Logs the user in.
            successfulLogin(data);
        })
        .catch(error => {
            // Lets user attempt to login in again.
            failedLogin(error);
        });
}

// Handles any errors sent back from backend.
function errors(response) {
    // If there is an error.
    if (!response.ok) {
        throw (response);
    }
    // Otherwise return the response.
    return response;
}

// Handles a failed login along with errors.
function failedLogin(error) {
    // First removes any prior error messages.
    let usernameError = document.getElementById("login-error-username");
    document.getElementById("login-error-password").innerText = "";

    // Checks if error status was 403, so invalid username or password.
    if (error.status == "403") {
        usernameError.innerText = "Invalid username or password";
    // Checks if error status was 400, so missing username or password.
    } else if (error.status == "400") {
        usernameError.innerText = "Missing username or password";
    }
}

// Handles a successful login.
function successfulLogin(data) {
    // Closes modal.
    let modal = document.getElementById("login-modal");
    modal.classList.toggle("show-modal");

    // Saves token for user in local storage.
    localStorage.setItem("token", data.token);

    // Gets and saves current user ID in local storage.
    getCurrentUserID();

    // Refreshes the navigation bar, feed, login and signup modals.
    refreshPage("nav");
    refreshPage("feed");
    refreshPage("login/signup");
}

// Gets the current user's ID.
function getCurrentUserID() {
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

export default genLogin;
