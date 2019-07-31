// Written by Nikil Singh (z5209322)

// Generates the signup button.
function genSignup(apiUrl) {
    const signup = createSignup();
    createSignupModal();
    let modal = document.getElementById("signup-modal");
    const close = document.getElementById("signup-modal-close");
    const register = document.getElementById("signup-submit");

    // Event listener for signup button.
    signup.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
    });

    // Event listener for closing register form modal.
    close.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
    })

    // Event listener for register in button on signup form modal.
    register.addEventListener('click', function(e) {
        e.preventDefault();
        verifyRegister(apiUrl);
    })
}

function createSignup() {
    // Creates the button.
    let btn = document.createElement("button");
    let text = document.createTextNode("Signup");
    btn.id = "signup-btn";
    btn.setAttribute("data-id-signup","");
    btn.appendChild(text);
    btn.classList.add("button", "button-secondary", "nav-item");

    // Appends signup button to list in header.
    let element = document.getElementById("signup-li");
    element.appendChild(btn);

    return btn;
}


// Creates the modal for signup form.
function createSignupModal() {
    // Creates the main modal box.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "signup-modal";

    // Creates the section wihin modal with actual content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "signup-content-modal";

    // Creates the username and password signup boxes along with form.
    let form = document.createElement("form");
    form.id = "signup-form";
    let username = createInputTextbox("username");
    let password = createInputTextbox("password");
    let email = createInputTextbox("email");
    let name = createInputTextbox("name");
    let registerBTN = createRegisterBTN();

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for signup modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Register");
    headerElement.appendChild(text);

    // Appends required elements to different elements.
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

// Creates the close button for the signup modal.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "signup-modal-close";
    return closeBTN
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

function verifyRegister(apiUrl) {
    // Gets values stored for username and password.
    const username = document.getElementById("signup-username");
    const password = document.getElementById("signup-password");
    const email = document.getElementById("signup-email");
    const name = document.getElementById("signup-name");

    let authenticate = 1;

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

    if (authenticate == 0) return;
    document.getElementById("signup-error-username").innerText = "";
    document.getElementById("signup-error-password").innerText = "";
    document.getElementById("signup-error-email").innerText = "";
    document.getElementById("signup-error-name").innerText = "";

    signupUser(username.value, password.value, email.value, name.value, apiUrl);
}

// Call the backend to signup the user.
function signupUser(username, password, email, name, apiUrl) {
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
    let signupAuth = apiUrl + "/auth/signup"

    // Attempts to signup through the backend and handles any errors that return.
    fetch(signupAuth, options)
        .then(response => errors(response))
        .then(response => response.json())
        .then(response => {
            console.log(response);
        })
        .catch(event => {
            console.log(event.message);
        });
}

// Handles any errors sent back from backend.
function errors(response) {
    if (response.status == "400") {
        // Malinformed request.
    } else if (response.status == "409") {
        // Username Taken.
    }
    return response;
}

export default genSignup;
