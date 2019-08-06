// Written by Nikil Singh (z5209322)

// Imported scripts.
import refreshPage from './refresh.js'

// Generates the post modal.
function genPost(item, postID) {
    if (item == "generate") {
        createPostModal();
    } else if (item == "makePost") {
        verifyPost();
    } else if (item == "clearErrors") {
        clearErrorMessages();
    }
}

// Creates the modal to display post form.
function createPostModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "post-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "post-content-modal";

    // Creates the username and password post boxes along with form.
    let form = document.createElement("form");
    form.id = "post-form";
    let title = createInputTextbox("title");
    let text = createInputTextbox("text");
    let subseddit = createInputTextbox("subseddit");

    // Creates option to upload image file.
    let image = createImageSubmit();

    // Creates the sign in button.
    let postBTN = createPostBTN();

    // Creates the close button.
    let closeBTN = createCloseButton();

    // Creates heading for post modal.
    let headerElement = document.createElement("h3");
    let postHeader = document.createTextNode("Make Post");
    headerElement.appendChild(postHeader);

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(title);
    contentBox.appendChild(text);
    contentBox.appendChild(subseddit);
    contentBox.appendChild(image);
    contentBox.appendChild(postBTN);
    box.appendChild(contentBox);
    form.appendChild(box)
    let element = document.getElementById("root");
    element.appendChild(form);
}

// Creates the textbox inputs for the modal and sets required attributes.
function createInputTextbox(itemName) {
    // Creates textbox with section for error messages.
    let element = document.createElement("input");
    element.id = "post-" + itemName;
    element.classList.add("modal-textbox");
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "post-error-" + itemName;

    // Determines placeholder text and type based on item name. Also changes
    // the first letter to upper case for aesthics.
    element.placeholder = itemName.substring(0,1).toUpperCase()
        + itemName.substring(1,itemName.length);

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("modal-content-items");
    div.appendChild(element);
    div.appendChild(errorText);
    return div;
}

// Creates the sign in button for the modal and sets required attributes..
function createPostBTN() {
    let button = document.createElement("button");
    let btnDiv = document.createElement("div");
    let text = document.createTextNode("Post");
    button.id = "post-submit";
    button.classList.add("button", "button-secondary");
    button.appendChild(text);
    btnDiv.classList.add("modal-content-items");
    btnDiv.appendChild(button);
    return btnDiv;
}

// Creates the close button for the login modal and sets required attributes.
function createCloseButton() {
    let closeBTN = document.createElement("span");
    let closeSym = document.createTextNode("x");
    closeBTN.appendChild(closeSym);
    closeBTN.classList.add("close-button");
    closeBTN.id = "post-modal-close";
    return closeBTN
}

// Creates a div to hold the inputting images.
function createImageSubmit() {
    let div = document.createElement("div");

    let image = document.createElement("INPUT");
    image.setAttribute("type", "file");
    image.id = "post-image";

    let imageText = document.createElement("p");
    imageText.innerText = "(Optional) Select Image to Upload"

    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "post-error-image";

    div.appendChild(imageText);
    div.appendChild(image);
    div.appendChild(errorText);
    return div;
}

// Checks if all the post data are correct and then display error messages if
// needed.
function verifyPost() {
    // Gets values stored for title, text, subseddit and image.
    const title = document.getElementById("post-title");
    const text = document.getElementById("post-text");
    const subseddit = document.getElementById("post-subseddit");
    const image = document.getElementById("post-image");

    // Variable to determine if any errors were found.
    let authenticate = 1;
    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if no username or password were given in form.
    if (title.value === '') {
        let element = document.getElementById("post-error-title");
        element.innerText = "Title must have more than 0 characters";
        authenticate = 0;
    } else if (text.value === '') {
        let element = document.getElementById("post-error-text");
        element.innerText = "Text must have more than 0 characters";
        authenticate = 0;
    } else if (subseddit.value === '') {
        let element = document.getElementById("post-error-subseddit");
        element.innerText = "Subseddit must have more than 0 characters";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();

    // If there is an image.
    if (image.value != "") {
        // Gets the file
        let file = document.querySelector('input[type=file]').files[0];
        // Sets up the reader.
        let reader = new FileReader();
        // Converts the file into base64.
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            // Extracts the base64 string of image.
            let imageResult = reader.result.replace("data:image/png;base64,", "");
            uploadPost(title.value, text.value, subseddit.value, imageResult);
        };
    // If there is no image.
    } else {
        uploadPost(title.value, text.value, subseddit.value, "");
    }
}

// Gets rid of prior error messages if there no more errors.
function clearErrorMessages() {
    document.getElementById("post-error-title").innerText = "";
    document.getElementById("post-error-text").innerText = "";
    document.getElementById("post-error-subseddit").innerText = "";
    document.getElementById("post-error-image").innerText = "";
}

// Calls the backend to check if post data is valid and then uploads it.
function uploadPost(title, text, subseddit, imageResult) {
    // Holds the parameters needed to call backend for login.
    const payload = {
        title: title,
        text: text,
        subseddit: subseddit,
        image: imageResult
    }

    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
        body: JSON.stringify(payload)
    }

    // The url for fetching post to post.
    let post = localStorage.getItem("api") + "/post/";
    fetch(post, options)
        .then(response => errors(response))
        .then(response => response.json())
        .then(data => {
            // Refreshes feed and resets post modal.
            successfulPost()
        })
        .catch(error => {
            // Lets user try to reupload post again.
            failedPost(error);
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

// Handles a successful post.
function successfulPost() {
    refreshPage("post");
    refreshPage("feed");
    document.getElementById("post-modal").classList.toggle("show-modal");
}

// Handles a failed post along with errors.
function failedPost(error) {
    let imageError = document.getElementById("post-error-image");
    imageError.innerText = "Malformed Request / Image could not be processed";
}


export default genPost;
