// Written by Nikil Singh (z5209322)

// Generates the sign in button.
function genLogin() {
    const login = createLogin();
    createLoginModal();
    let modal = document.getElementById("login-modal");
    const close = document.getElementById("login-modal-close");
    const signIn = document.getElementById("login-submit");

    // Event listener for login button.
    login.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
    });

    // Event listener for closing login form modal.
    close.addEventListener('click', function() {
        modal.classList.toggle("show-modal");
    })

    // Event listener for sign in button on login form modal.
    signIn.addEventListener('click', function(e) {
        e.preventDefault();
        verifySignIn();
        console.log("YEET");
    })
}

// Creates the login button.
function createLogin() {
    // Creates the button.
    let btn = document.createElement("button");
    let text = document.createTextNode("Sign In");
    btn.id = "login-btn";
    btn.setAttribute("data-id-login","");
    btn.appendChild(text);
    btn.classList.add("button", "button-primary", "nav-item");

    // Appends login button to list in header.
    let element = document.getElementById("login-li");
    element.appendChild(btn);

    return btn;
}

// Creates the modal for login form.
function createLoginModal() {
    // Creates the main modal box.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "login-modal";

    // Creates the section wihin modal with actual content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "login-content-modal";

    // Creates the username and password login boxes along with form.
    let form = document.createElement("form");
    form.id = "login-form";
    let username = createInputTextbox("username");
    let password = createInputTextbox("password");
    let signInBTN = createSignInBTN();

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for login modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("Sign In");
    headerElement.appendChild(text);

    // Appends required elements to different elements.
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

// Creates the close button for the login modal.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "login-modal-close";
    return closeBTN
}

// Creates the textbox inputs for the modal.
function createInputTextbox(itemName) {
    let element = document.createElement("input");
    element.id = "login-" + itemName;
    element.classList.add("modal-textbox");
    let errorText = document.createElement("p");
    let text = document.createTextNode("Authentication Failed");
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

// Creats the sign in button for the modal.
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

function verifySignIn() {
    // Gets values stored for username and password.
    const username = document.getElementById("login-username");
    const password = document.getElementById("login-password");

    if (username.value === '') {
        username.classList.toggle("textbox-glow");
        let element = document.getElementById("login-error-username");
        element.classList.toggle("textbox-error");
    } else if (password.value === '') {
        password.classList.toggle("textbox-glow");
        let element = document.getElementById("login-error-password");
        element.classList.toggle("textbox-error");
    }
}

export default genLogin;
