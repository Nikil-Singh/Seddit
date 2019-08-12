// Written by Nikil Singh (z5209322)

// Generates the feed.
function genFeed(item, postID) {
    if (item == "generate") {
        // Creates the feed.
        createFeed();
        // Checks if user is logegd in.
        if (localStorage.getItem("token") === null) {
            // User not logged in, so display public feed.
            getPostsPublic();
        } else {
            // User is logged in, so display user specific feed.
            getPostsPrivate();
        }
    } else if (item == "morePublic") {
        // User not logged in, so display public feed.
        getPostsPublic();
    } else if (item == "morePrivate") {
        // Add more to the feed.
        getPostsPrivate();
    } else if (item == "removeCurrentFeed") {
        // Removes the current feed.
        removeCurrentFeed();
    } else if (item == "newPost") {
        // Appends a particular post.
        appendPost(postID);
    } else if (item == "returnPost") {
        // Creates and returns a post.
        return createPost(postID);
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
    main.appendChild(feedHeader);
    main.appendChild(uList);
    let element = document.getElementById("root");
    element.appendChild(main);
}

// Creates the feed header.
function createFeedHeader() {
    // Creates div for feed header.
    let headDiv = document.createElement("div");
    headDiv.classList.add("feed-header", "feed-header-padding");

    // Creates heading for title.
    let heading = document.createElement("h3");
    heading.classList.add("feed-title", "alt-text");
    let text = document.createTextNode("Popular Posts");
    heading.appendChild(text);

    // Creates button to view public posts.
    let publicBTN = document.createElement("button");
    publicBTN.classList.add("button", "button-secondary", "button-display");
    publicBTN.id = "public-button";
    publicBTN.innerText = "View Public Feed";

    // Creates button to view private posts.
    let privateBTN = document.createElement("button");
    privateBTN.classList.add("button", "button-secondary", "button-display");
    privateBTN.id = "private-button";
    privateBTN.innerText = "View Private Feed";

    // Creates button to post.
    let btn = document.createElement("button");
    btn.classList.add("button", "button-secondary", "button-display");
    btn.id = "post-open-modal";
    let btnText = document.createTextNode("Post");
    btn.appendChild(btnText);

    // Appends all elements to div.
    headDiv.appendChild(heading);
    headDiv.appendChild(publicBTN);
    headDiv.appendChild(privateBTN);
    headDiv.appendChild(btn);

    return headDiv;
}

// Gets posts for users not logged in.
function getPostsPublic() {
    const uList = document.getElementById("feed");
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
            // Cycles through all the posts and adds them to the page.
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i])
                appendContent(post, uList);
            }

            // Generates empty feed if user has no posts.
            if (response.posts.length == 0) {
                let post = emptyFeed();
                appendContent(post, uList);
            }
        });
}

// Appends unordered list to required element.
function appendContent(element, uList) {
    uList.appendChild(element);
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
    empty.innerText = "Currently your feed is empty.";
    empty.id = "empty-feed";
    // Appends required elements.
    list.appendChild(empty);

    return list;
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
    numVotes.innerText = postData.meta.upvotes.length;
    numVotes.setAttribute("data-id-upvotes","");

    // Appends required elements to different elements to form feed.
    votes.appendChild(upVoteArrow);
    votes.appendChild(numVotes);

    // Creates div to hold content.
    let content = document.createElement("div");
    content.classList.add("content");

    // Holds subseddit of post.
    let subseddit = document.createElement("h4");
    subseddit.classList.add("post-subseddit", "alt-text");
    let sSeddit = document.createTextNode("s/" + postData.meta.subseddit);
    subseddit.appendChild(sSeddit);

    // Holds title of post.
    let title = document.createElement("h4");
    title.classList.add("post-title", "alt-text")
    title.setAttribute("data-id-title","");
    title.innerText = postData.title;

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
    author.id = "post-author-" + postData.id;
    author.classList.add("post-author");
    author.setAttribute("data-id-author","")
    author.innerText = "Posted by @" + postData.meta.author;

    // Holds date of post publication.
    let timestamp = getDate(new Date(postData.meta.published * 1000));
    let time = document.createElement("p");
    time.innerText = timestamp;
    time.classList.add("post-date");

    // Holds the number of comments on post.
    let comments = document.createElement("p");
    comments.id = "comments-post-" + postData.id;
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

// Gets posts for users logged in.
function getPostsPrivate() {
    const uList = document.getElementById("feed");
    // Gets request for posts as string with p giving current post number and
    // n being the number of posts to fetch following p.
    let request = "?p=" + localStorage.getItem("currPost") + "&n=" + "5";
    // Sets the current post to be 5 ahead.
    let numPost = Number(localStorage.getItem("currPost")) + 5;
    localStorage.setItem("currPost", numPost);

    // Sets options to get public posts.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        },
    };

    // The url for accessing private posts.
    let privatePost = localStorage.getItem("api") + "/user/feed" + request;

    // Fetches the actual posts, formats and displays them.
    fetch(privatePost, options)
        .then(response => response.json())
        .then(response => {
            for (let i = 0; i < response.posts.length; i++) {
                // Adds the post to the end of the feed.
                let post = createPost(response.posts[i]);
                appendContent(post, uList);
            }
            // Generates empty feed if user has no posts.
            if (response.posts.length == 0 && !document.getElementById("empty-feed")) {
                let post = emptyFeed();
                appendContent(post, uList);
            }
        });
}

// Removes the current feed.
function removeCurrentFeed() {
    // Gets the required elements.
    let uList = document.getElementById("feed");
    let main = document.getElementById("main");
    while (uList.hasChildNodes()) uList.removeChild(uList.firstChild);
}

// Appends a post to the beginning of the feed.
function appendPost(postID) {
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
    let postAuth = localStorage.getItem("api") + "/post/?id=" + postID.post_id;

    // Fetches the post.
    fetch(postAuth, options)
        .then(response => response.json())
        .then(post => {
            // Creates a section for the post and adds it to the top of the
            // feed.
            let postDiv = createPost(post);
            let uList = document.getElementById("feed");
            uList.insertBefore(postDiv, uList.childNodes[0]);
        });
}

export default genFeed;
