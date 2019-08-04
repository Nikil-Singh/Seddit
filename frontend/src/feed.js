// Written by Nikil Singh (z5209322)

// Imports in other JS scripts
import genUpvotes from './upvotes.js'

// Generates the feed.
function genFeed(apiUrl) {
    // Creates the main section.
    let main = document.createElement("main");
    main.role = "main";
    main.id = "main";

    // Creates the unordered list.
    let uList = document.createElement("ul");
    uList.id = "feed";
    uList.setAttribute("data-id-feet","");

    // Creates the feed header.
    let feedHeader = createFeedHeader();

    // Appends required elements to main.
    uList.appendChild(feedHeader);

    // Checks if user is logegd in.
    if (localStorage.getItem("token") === null) {
        // User not logged in, so display public feed.
        getPostsPublic(apiUrl, uList);
    } else {
        // User is logged in, so display user specific feed.
        getPostsPrivate(apiUrl, uList);
        // Creates a modal to show who upvoted which post.
        genUpvotes("generate", -1);
    }

    // Appends required elements to other elements to generate the feed.
    main.appendChild(uList);
    let element = document.getElementById("root");
    element.appendChild(main);
}

// Appends unordered list to required element.
function appendContent(element, uList) {
    uList.appendChild(element);
}

// Creates the feed header.
function createFeedHeader() {
    // Creates div for feed header.
    let headDiv = document.createElement("div");
    headDiv.classList.add("feed-header");

    // Creates heading for title.
    let heading = document.createElement("h3");
    heading.classList.add("feed-title", "alt-text");
    let text = document.createTextNode("Popular Posts");
    heading.appendChild(text);

    // Creates button to post.
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary");
    let btnText = document.createTextNode("Post");
    btn.appendChild(btnText);

    // Appends all elements to div.
    headDiv.appendChild(heading);
    headDiv.appendChild(btn);

    return headDiv;
}

// Creates required HTML for one post.
function createPost(postData) {
    // Creates the list to hold elements of post.
    let list = document.createElement("li");
    list.classList.add("post");
    list.setAttribute("data-id-feed","");
    list.id = "post-" + postData.id;

    // Holds the upvotes for the post.
    let votes = document.createElement("div");
    votes.classList.add("vote");
    votes.setAttribute("data-id-upvotes","");

    // Creates arrow to upvote post.
    let upVoteArrow = document.createElement("p");
    upVoteArrow.id = "upVoteArrow-" + postData.id;
    upVoteArrow.innerText = "⬆";
    upVoteArrow.classList.add("post-votes", "post-arrow", "post-arrow-click");
    upVoteArrow.classList.toggle("post-arrow-click");

    // Gets number of votes for post.
    let numVotes = document.createElement("p");
    numVotes.id = "vote-" + postData.id;
    numVotes.classList.add("post-votes");
    let voteText = document.createTextNode(postData.meta.upvotes.length);

    // Appends required elements to different elements to form feed.
    numVotes.appendChild(voteText);
    votes.appendChild(upVoteArrow);
    votes.appendChild(numVotes);

    // Creates div to hold content.
    let content = document.createElement("div");
    content.classList.add("content");

    // Holds subseddit of post.
    let subseddit = document.createElement("h4");
    subseddit.classList.add("post-title", "alt-text");
    let sSeddit = document.createTextNode(postData.meta.subseddit);
    subseddit.appendChild(sSeddit);

    // Holds title of post.
    let title = document.createElement("h4");
    title.classList.add("post-title", "alt-text")
    title.setAttribute("data-id-title","");
    let text = document.createTextNode(postData.title);
    title.appendChild(text);

    //Holds actual post content.
    let post = document.createElement("p");
    let postText = document.createTextNode(postData.text)
    post.appendChild(postText);

    let image = null;
    //Holds any images for the post if it exists.
    if (postData.image != null) {
        image = document.createElement("img")
        image.src = "data:image/png;base64," + postData.image;
        image.classList.add("post-image");
    }

    // Holds author for post.
    let author = document.createElement("p");
    author.classList.add("post-author");
    author.setAttribute("data-id-author","")
    let poster = document.createTextNode("Posted by @" + postData.meta.author);
    author.appendChild(poster);

    // Holds the number of comments on post.
    let comments = document.createElement("p");
    let numComments = document
        .createTextNode(postData.comments.length + " Comments");
    comments.appendChild(numComments);

    // Appends all required elements to list.
    content.appendChild(subseddit);
    content.appendChild(title);
    content.appendChild(post);
    // If an image exists the add on to the list.
    if (postData.image != null) content.appendChild(image);
    content.appendChild(author);
    content.appendChild(comments);
    list.appendChild(votes);
    list.appendChild(content);

    return list;
}

// Generates a feed called empty feed if the user does not have any posts to
// view.
function emptyFeed() {
    // Creates the list.
    let list = document.createElement("li");
    list.classList.add("post");
    list.setAttribute("data-id-feed","");

    // Creates text stating feed is empty.
    let empty = document.createElement("p");
    let text = document.createTextNode("Currently your feed is empty.");

    // Appends required elements.
    empty.appendChild(text);
    list.appendChild(empty);

    return list;
}

// Gets posts for users not logged in.
function getPostsPublic(apiUrl, uList) {
    // Sets options to get public posts.
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    // The url for accessing public posts.
    let publicPost = apiUrl + "/post/public";

    // Fetches the actual posts, formats and displays them.
    fetch(publicPost, options)
        .then(response => response.json())
        .then(response => {
            // Cycles through all the posts and adds them to the page.
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i])
                appendContent(post, uList);
            }
        });
}

// Gets posts for users logged in.
function getPostsPrivate(apiUrl, uList) {
    // Sets options to get public posts.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
    }

    // The url for accessing public posts.
    let privatePost = apiUrl + "/user/feed";

    // Fetches the actual posts, formats and displays them.
    fetch(privatePost, options)
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i]);
                appendContent(post, uList);
                // Sets event listener so user can view who upvoted that post.
                let postVote = document
                    .getElementById("vote-" + response.posts[i].id);
                postVote.addEventListener("click", showUpvotes);
            }
            // Generates empty feed if user has no posts.
            if (response.posts.length == 0) {
                let post = emptyFeed();
                appendContent(post, uList);
            }
        });
}

// Show modal with upvotes.
function showUpvotes(event) {
    genUpvotes("showVotes", event.target.id);
}

export default genFeed;
