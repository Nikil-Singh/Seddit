// Written by Nikil Singh (z5209322)

function genFeed(apiUrl) {
    let main = document.createElement("main");
    main.role = "main";
    let uList = document.createElement("ul");
    uList.id = "feed";
    uList.setAttribute("data-id-feet","");

    // Creates the feed header.
    let feedHeader = createFeedHeader();

    // Appends required elements to main.
    uList.appendChild(feedHeader);
    if (localStorage.getItem("token") === null) {
        getPostsPublic(apiUrl, uList);
    } else {
        getPostsPrivate(apiUrl, uList);
    }
    main.appendChild(uList);

    let element = document.getElementById("root");
    element.appendChild(main);
}

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

    // Holds the upvotes for post.
    let votes = document.createElement("div");
    votes.classList.add("vote");
    votes.setAttribute("data-id-upvotes","");
    let numVotes = document.createElement("p");
    let voteText = document.createTextNode(postData.meta.upvotes.length);
    numVotes.appendChild(voteText);
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
    //Holds any images for the post.
    if (postData.image != null) {
        image = document.createElement("img")
        image.src = postData.image;
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
        .createTextNode(postData.comments.length + " comments");
    comments.appendChild(numComments);

    // Appends all elements to list.
    content.appendChild(subseddit);
    content.appendChild(title);
    content.appendChild(post);
    if (postData.image != null) content.appendChild(image);
    content.appendChild(author);
    content.appendChild(comments);
    list.appendChild(votes);
    list.appendChild(content);

    return list;
}


function emptyFeed() {
    let list = document.createElement("li");
    list.classList.add("post");
    list.setAttribute("data-id-feed","");

    let empty = document.createElement("p");
    let text = document.createTextNode("Currently your feed is empty.");
    empty.appendChild(text);

    list.appendChild(empty);

    return list;
}

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
            console.log(response);
            for (let i = 0; i < response.posts.length; i++) {
                let post = createPost(response.posts[i])
                appendContent(post, uList);
            }
            if (response.post.length == 0) emptyFeed();
        });
}


export default genFeed;
