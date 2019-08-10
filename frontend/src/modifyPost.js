// Written by Nikil Singh (z5209322)

// Imports script
import genFeed from './feed.js'
import genPost from './post.js'

// Lets the user view, modify and delete all their posts.
function genModDelPost(command, item) {
    // Generates the modal for selecting, updating or deleting post.
    if (command == "generate") {
        // Creates a modal that displays all posts and with option to update or
        // delete any post.
        createSelectPostModal();
        // Creates a modal to update said post.
        createUpdateModal();
    } else if (command == "populatePostsModal") {
        // Populates the modal with all user posts
        populateViewModal();
    } else if (command == "refreshViewModal") {
        // Refreshes the modal for viewing all posts.
        refreshViewPostsModal();
    } else if (command == "deletePost") {
        // Deletes the post.
        deletePost(item);
    } else if (command == "populateUpdateModal") {
        // Populates the modal to hold data for that post.
        populateUpdateModal(item);
    } else if (command == "updatePost") {
        // Updates the post.
        verifyPost();
    } else if (command == "clearErrorMessages"){
        // Clears error messages from modal.
        clearErrorMessages();
    }
}

// Creates a modal that displays all posts made by user and with options to
// update or delete any post.
function createSelectPostModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "all-posts-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "all-posts-content-modal";

    // Creates the close button.
    let closeBTN = createCloseButton("all-posts-modal-");

    // Creates heading for profile modal.
    let headerElement = document.createElement("h3");
    let text = document.createTextNode("All Posts");
    headerElement.appendChild(text);

    // Creates a list to hold all posts.
    let ul = document.createElement("ul");
    ul.id = "all-posts-list";

    // Appends required elements to required elements.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(ul);
    box.appendChild(contentBox);

    let element = document.getElementById("root");
    element.appendChild(box);
}

// Creates a modal for updating a post.
function createUpdateModal() {
    // Creates the main modal box and sets required attributes.
    let box = document.createElement("div");
    box.classList.add("modal");
    box.id = "update-post-modal";

    // Creates the section wihin modal with actual interactable content.
    let contentBox = document.createElement("div");
    contentBox.classList.add("modal-content");
    contentBox.id = "update-post-content-modal";

    // Creates heading for post modal.
    let headerElement = document.createElement("h3");
    let postHeader = document.createTextNode("Update Post");
    headerElement.appendChild(postHeader);

    // Creates the close button.
    let closeBTN = createCloseButton("update-post-modal-");

    // Creates a button to submit changes made to post.
    let updateBTN = updatePostBTN();

    // Creates the textboxes to update the post.
    let form = document.createElement("form");
    form.id = "update-post-form"
    let title = createInputTextbox("title");
    let text = createInputTextbox("text");

    // Creates a section for image preview if there previously was an image.
    let imgSection = document.createElement("img");
    imgSection.id = "update-post-image-preview";
    imgSection.classList.add("preview-image");

    // Creates a section to submit an image.
    let image = createImageSubmit();

    // Creates a button to remove image if it exists.
    let remImageBTN = removeImageBTN();

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(title);
    contentBox.appendChild(text);
    contentBox.appendChild(image);
    contentBox.appendChild(imgSection);
    contentBox.appendChild(remImageBTN);
    contentBox.appendChild(updateBTN);
    box.appendChild(contentBox);
    form.appendChild(box);
    let element = document.getElementById("root");
    element.appendChild(form);

}

// Creates the submit button for updating post.
function updatePostBTN() {
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary", "update-post-btn");
    btn.id = "update-post-button";
    let btnText = document.createTextNode("Update");
    btn.appendChild(btnText);

    return btn;
}

// Removes any image from update post modal.
function removeImageBTN() {
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary", "update-post-btn");
    btn.id = "update-rem-image-button";
    let btnText = document.createTextNode("Remove Image");
    btn.appendChild(btnText);

    return btn;
}

// Creates a div to hold the inputting images.
function createImageSubmit() {
    // Creates a div to hold image.
    let div = document.createElement("div");

    // Creates section to submit image.
    let image = document.createElement("INPUT");
    image.setAttribute("type", "file");
    image.id = "update-post-image";

    // Creates section for text on details of how to submit.
    let imageText = document.createElement("p");
    imageText.innerText = "(Optional) Select image to upload, if left empty the original will stay"

    // Holds the error text.
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "post-update-error-image";

    // Appends required elements together.
    div.appendChild(imageText);
    div.appendChild(image);
    div.appendChild(errorText);
    return div;
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

// Creates the textbox inputs for the modal and sets required attributes.
function createInputTextbox(itemName) {
    // Creates the title for textbox.
    let title = document.createElement("p");
    title.innerText = itemName.substr(0,1).toUpperCase()
        + itemName.substr(1, itemName.length);

    // Creates textbox with section for error messages.
    let element = document.createElement("input");
    element.id = "post-update-" + itemName;
    element.classList.add("modal-textbox");
    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "post-update-error-" + itemName;

    // Creates div for element so they can stack.
    let div = document.createElement("div");
    div.classList.add("modal-content-items");
    div.appendChild(title);
    div.appendChild(element);
    div.appendChild(errorText);
    return div;
}

// Populates the modal with all user posts, allowing for the option to edit or
// delete any of the posts.
function populateViewModal() {
    console.log("Populating User Posts Modal");
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
            let ul = document.getElementById("all-posts-list");
            // Cycles through all posts that the user has made.
            for (let i = 0; i < data.posts.length; i++) {
                // Fetches the post.
                let post = localStorage.getItem("api") + "/post/?id=" + data.posts[i];
                fetch(post, options)
                    .then(response => response.json())
                    .then(postData => {
                        // Creates the required division to hold a post and
                        // buttons for editing and deleting post.
                        let div = document.createElement("div");
                        div.id = "all-posts-post-" + data.posts[i];
                        div.appendChild(genFeed("returnPost", postData));
                        div.appendChild(buttonMaker("Edit", data.posts[i]));
                        div.appendChild(buttonMaker("Delete", data.posts[i]));
                        ul.appendChild(div);
                    });
            }
        });
}

// Creates a button based on given requirements.
function buttonMaker(item, postID) {
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary");
    btn.id = item.substr(0,1).toLowerCase() + item.substr(1,item.length) + "-posts-btn-" + postID;
    let btnText = document.createTextNode(item);
    btn.appendChild(btnText);

    return btn;
}

// Deletes the required post.
function deletePost(postID) {
    // Extracts the post ID.
    let id = postID.substring(17, postID.length);
    console.log("Deleting Post " + id);
    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }

    // The url for deleting a post.
    let deleteAuth = localStorage.getItem("api") + "/post/?id=" + id;
    // Fetches the post to delete.
    fetch(deleteAuth, options)
        .then(response => response.json())
        .then(response => {
            // Deletes the post from view all posts modal.
            let div = document.getElementById("all-posts-post-" + id);
            let ul = document.getElementById("all-posts-list");
            ul.removeChild(div);

            // Deletes the post from feed if it exists in feed.
            let feedPost = document.getElementById("post-" + id);
            if (feedPost) {
                let feed = document.getElementById("feed");
                feed.removeChild(feedPost);
            }
        });
}

// Populates the update modal for that posts data.
function populateUpdateModal(postID) {
    // Extracts the post ID.
    let id = postID.substring(15, postID.length);
    console.log("Populating Update Post Modal");
    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }
    // The url for accessing a post of a particular id.
    let postAuth = localStorage.getItem("api") + "/post/?id=" + id;

    // Fetches the post.
    fetch(postAuth, options)
        .then(response => response.json())
        .then(post => {
            // Populates the update modal with required data.
            document.getElementById("post-update-title").value = post.title;
            document.getElementById("post-update-text").value = post.text;
            // Checks if post has image.
            if (post.image != "" && post.image != null) {
                document.getElementById("update-post-image-preview")
                    .src = "data:image/png;base64," + post.image;
            } else {
                document.getElementById("update-post-image-preview")
                    .src = "";
            }
        });
}

// Verifies the post is valid  and if so then updates the original post.
function verifyPost() {
    // Gets values stored for title, text, subseddit and image.
    const title = document.getElementById("post-update-title");
    const text = document.getElementById("post-update-text");
    const image = document.getElementById("update-post-image");

    // Variable to determine if any errors were found.
    let authenticate = 1;
    // Clears any prior error messages on modal.
    clearErrorMessages();

    // Checks if no username or password were given in form.
    if (title.value === '') {
        let element = document.getElementById("post-update-error-title");
        element.innerText = "Title must have more than 0 characters";
        authenticate = 0;
    } else if (text.value === '') {
        let element = document.getElementById("post-update-error-text");
        element.innerText = "Text must have more than 0 characters";
        authenticate = 0;
    }

    // Returns if there are any errors.
    if (authenticate == 0) return;
    // Clears any error messages left.
    clearErrorMessages();

    // If a new image was selected.
    if (image.value != "") {
        console.log("New Image detected");
        // Gets the file from image selector.
        let file = document.querySelector('input[type=file]').files[0];
        getImage(file)
            .then(image => {
                // Edits base64 string into appropriate format.
                let image64 = image.replace("data:image/png;base64,", "");
                // Uploads the post.
                updatePost(title.value, text.value, image64);
            })
    // If no new image was selected, and previous image was kept.
} else if (document.getElementById("update-post-image-preview").value != "") {
        console.log("Old Image detected");
        // Gets the image from image preview.
        let imagePrev = document.getElementById("update-post-image-preview").src;
        imagePrev = imagePrev.replace("data:image/png;base64,", "");
        updatePost(title.value, text.value, imagePrev);
    // If there are no images.
    } else {
        console.log("No Image detected");
        updatePost(title.value, text.value, "");
    }
}

// Updates the post with the new given information.
function updatePost(title, text, image) {
    // Holds the parameters needed to call backend for login.
    const payload = {
        title: title,
        text: text,
        image: image
    }

    // Sets options to get post details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
        body: JSON.stringify(payload)
    }

    let postID = localStorage.getItem("postEdit");
    // The url for fetching post to update
    let post = localStorage.getItem("api") + "/post/?id=" + postID;
    fetch(post, options)
        .then(response => errors(response))
        .then(response => response.json())
        .then(data => {
            // Refreshes feed and resets post modal.
            successfulPost(data);
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
        console.log("Posting Update Fetch Error");
        throw (response);
    }
    // Otherwise return the response.
    return response;
}

// Handles a successful update post.
function successfulPost(postID) {
    document.getElementById("update-post-modal").classList.toggle("show-modal");
    console.log("Successful Update to Post");

    // Removes previous feed.
    let uList = document.getElementById("feed");
    while (uList.hasChildNodes()) uList.removeChild(uList.firstChild);

    // Refreshes feed after changes made.
    localStorage.setItem("currPost", 0);
    genFeed("morePrivate");

    // Refreshes required modals and repopulates them with data.
    document.getElementById("all-posts-modal").classList.toggle("show-modal");
    refreshViewPostsModal();
    populateViewModal()
    document.getElementById("all-posts-modal").classList.toggle("show-modal");
}

// Handles a failed update to post along with errors.
function failedPost(error) {
    console.log("Failed Update to Post");
    let imageError = document.getElementById("post-update-error-image");
    imageError.innerText = "Malformed Request / Image could not be processed";
}

// Gets rid of prior error messages if there no more errors.
function clearErrorMessages() {
    document.getElementById("post-update-error-title").innerText = "";
    document.getElementById("post-update-error-text").innerText = "";
    document.getElementById("post-update-error-image").innerText = "";
}

// Returns the file as a base64 string.
function getImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Refreshes the view posts modal.
function refreshViewPostsModal() {
    let modal = document.getElementById("all-posts-content-modal");
    let ul = document.getElementById("all-posts-list");
    modal.removeChild(ul);
    let newUl = document.createElement("ul");
    newUl.id = "all-posts-list";
    modal.appendChild(newUl);
}


export default genModDelPost;
