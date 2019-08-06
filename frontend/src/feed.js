// Written by Nikil Singh (z5209322)

// Imports in other JS scripts
import genUpvotes from './upvotes.js'
import genComments from './comments.js'
import genPost from './post.js'

// Generates the feed.
function genFeed() {
    // Creates the feed.
    createFeed();

    // If user is logged in.
    if (localStorage.getItem("token") !== null) {
        // Gets all clickable elements from feed.
        const closeUpvote = document.getElementById("upvotes-modal-close");
        const upvoteModal = document.getElementById("upvotes-modal");
        const closeComments = document.getElementById("comments-modal-close");
        const commentsModal = document.getElementById("comments-modal");
        const postModal = document.getElementById("post-modal");
        const closePost = document.getElementById("post-modal-close");
        const postBTN = document.getElementById("post-open-modal");
        const postSubmitBTN = document.getElementById("post-submit");
        // Event listener for closing upvotes modal.
        closeUpvote.addEventListener('click', function() {
            upvoteModal.classList.toggle("show-modal");
        })

        // Event listener for closing comments modal.
        closeComments.addEventListener('click', function() {
            commentsModal.classList.toggle("show-modal");
        })

        // Event listener for closing post modal.
        postBTN.addEventListener('click', function() {
            postModal.classList.toggle("show-modal");
        })

        // Event listener for closing post modal.
        closePost.addEventListener('click', function() {
            postModal.classList.toggle("show-modal");
            genPost("clearErrors", -1);
        })

        // Event listener for closing post modal.
        postSubmitBTN.addEventListener('click', function(e) {
            // Prevents page from refreshing if clicked.
            e.preventDefault();
            // Checks if post data is correct.
            genPost("makePost", -1);
        })
    }
}

// Creates the feed template.
function createFeed() {
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
        getPostsPublic(uList);
    } else {
        // User is logged in, so display user specific feed.
        getPostsPrivate(uList);
        // Creates a modal to show who upvoted on which post.
        genUpvotes("generate", -1);
        // Creates a modal to show who commented on which post.
        genComments("generate", -1)
        // Creates a modal form for making a post.
        genPost("generate", -1)
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
    btn.id = "post-open-modal";
    let btnText = document.createTextNode("Post");
    btn.appendChild(btnText);

    // Appends all elements to div.
    headDiv.appendChild(heading);
    headDiv.appendChild(btn);

    return headDiv;
}

// Creates required HTML for one post.
function createPost(postData) {
    //console.log(postData);
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
    upVoteArrow.classList.add("post-votes", "post-arrow");
    // If current user has not upvoted post before, then arrow is not
    // highlighed. First checks if user is logged in.
    if (localStorage.getItem("token") !== null) {
        // Gets the current users ID.
        let userID = Number(localStorage.getItem("userID"));
        if (postData.meta.upvotes.includes(userID)) {
            // Unhighlights the upvote arrow if user has not upvoted post.
            upVoteArrow.classList.toggle("post-arrow-click");
        }
    }

    // Gets number of votes for post.
    let numVotes = document.createElement("p");
    numVotes.id = "vote-" + postData.id;
    numVotes.classList.add("post-votes", "upvotes-number");
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
    let sSeddit = document.createTextNode("s/" + postData.meta.subseddit);
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
    if (postData.image != "" && postData.image != null) {
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

    // Holds date of post publication.
    let timestamp = getDate(new Date(postData.meta.published * 1000));
    let time = document.createElement("p");
    time.innerText = timestamp;

    // Holds the number of comments on post.
    let comments = document.createElement("p");
    comments.id = "comments-" + postData.id;
    comments.classList.add("comments-number");
    let numComments = document
        .createTextNode(postData.comments.length + " Comments");
    comments.appendChild(numComments);

    // Appends all required elements to list.
    content.appendChild(subseddit);
    content.appendChild(title);
    content.appendChild(post);
    // If an image exists the add on to the list.
    if (postData.image != "" && postData.image != null) {
        content.appendChild(image);
    }
    content.appendChild(author);
    content.appendChild(time);
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
function getPostsPublic(uList) {
    // Sets options to get public posts.
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    // The url for accessing public posts.
    let publicPost = localStorage.getItem("api") + "/post/public";
    // Fetches the actual posts, formats and displays them.
    fetch(publicPost, options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            // Cycles through all the posts and adds them to the page.
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i])
                appendContent(post, uList);
            }
        });
}

// Gets posts for users logged in.
function getPostsPrivate(uList) {
    // Sets options to get public posts.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
    };

    // The url for accessing public posts.
    let privatePost = localStorage.getItem("api") + "/user/feed";

    // Fetches the actual posts, formats and displays them.
    fetch(privatePost, options)
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i]);
                appendContent(post, uList);

                // Sets event listener so user can upvote a post.
                let arrowVote = document
                    .getElementById("upVoteArrow-" + response.posts[i].id);
                arrowVote.addEventListener("click", showUpvotes);

                // Sets event listener so user can view who upvoted that post.
                let postVote = document
                    .getElementById("vote-" + response.posts[i].id);
                postVote.addEventListener("click", showUpvotes);

                // Sets event listener so user can view who commented on that
                // post.
                let comment = document
                    .getElementById("comments-" + response.posts[i].id);
                comment.addEventListener("click", showComment);
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
    if (event.target.id.includes("upVoteArrow-")
        && !event.target.classList.contains("post-arrow-click")) {
        // If adding an upvote.
        genUpvotes("addVote", event.target.id);
    } else if (event.target.id.includes("upVoteArrow-")
        && event.target.classList.contains("post-arrow-click")) {
        // If removing an upvote.
        genUpvotes("removeVote", event.target.id);
    } else {
        // If displaying upvoters.
        genUpvotes("showVotes", event.target.id);
    }
}

// Show modal with comments.
function showComment(event) {
    genComments("showComments", event.target.id);
}

// Converts unix date to readable date.
function getDate(unixDate) {
    // Gets the day, month and year in form DD/MM/YYYY.
    let year = unixDate.getFullYear();
    let month = unixDate.getMonth();
    if (month < 10) month = "0" + month;
    let day = unixDate.getDate();
    if (day < 10) day = "0" + day;
    let date = day + "/" + month + "/" + year;

    // Gets the time of post in 24-Hour time.
    let hour = unixDate.getHours();
    if (hour < 10) hour = "0" + hour;
    let minutes = unixDate.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let time = hour + ":" + minutes;

    // Returns the timestamp in form time on date.
    return time + " on " + date;
}

export default genFeed;
