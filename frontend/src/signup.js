// Written by Nikil Singh (z5209322)

// Generates the signup button.
function genSignup() {
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
        verifyRegister();
        console.log("YEET");
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
    let text = document.createTextNode("Authentication Failed");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "signup-error-" + itemName;
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

function verifyRegister() {
    // Gets values stored for username and password.
    const username = document.getElementById("signup-username");
    const password = document.getElementById("signup-password");

    if (username.value === '') {
        username.classList.toggle("textbox-glow");
        let element = document.getElementById("signup-error-username");
        element.classList.toggle("textbox-error");
    } else if (password.value === '') {
        password.classList.toggle("textbox-glow");
        let element = document.getElementById("signup-error-password");
        element.classList.toggle("textbox-error");
    }
}

export default genSignup;
