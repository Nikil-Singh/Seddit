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
    let button = updatePostBTN();

    // Creates the textboxes to update the post.
    let form = document.createElement("form");
    form.id = "update-post-form"
    let title = createInputTextbox("title");
    let text = createInputTextbox("text");

    // Creates a section to submit an image.
    let image = createImageSubmit();

    // Appends required elements to different elements to form modal.
    contentBox.appendChild(closeBTN);
    contentBox.appendChild(headerElement);
    contentBox.appendChild(title);
    contentBox.appendChild(text);
    contentBox.appendChild(image);
    contentBox.appendChild(button);
    box.appendChild(contentBox);
    form.appendChild(box);
    let element = document.getElementById("root");
    element.appendChild(form);

}

// Creates the submit button for updating post.
function updatePostBTN() {
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary");
    btn.id = "update-post-button";
    let btnText = document.createTextNode("Update");
    btn.appendChild(btnText);

    return btn;
}

// Creates a div to hold the inputting images.
function createImageSubmit() {
    let div = document.createElement("div");

    let image = document.createElement("INPUT");
    image.setAttribute("type", "file");
    image.id = "update-post-image";

    let imageText = document.createElement("p");
    imageText.innerText = "(Optional) Select Image to Upload"

    let errorText = document.createElement("p");
    let text = document.createTextNode("");
    errorText.classList.add("textbox-error");
    errorText.appendChild(text);
    errorText.id = "update-post-error-image";

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
    errorText.id = "post-error-" + itemName;

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
