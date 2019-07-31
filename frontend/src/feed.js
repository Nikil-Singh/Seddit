// Written by Nikil Singh (z5209322)

function genFeed(apiUrl) {
    let main = document.createElement("main");
    main.role = "main";
    let uList = document.createElement("ul");
    uList.id = "feed";
    uList.setAttribute("data-id-feet","");

    // Creates the feed header.
    let feedHeader = createFeedHeader();

    // Gets the posts.
    let post = createPost();
    let post2 = createPost();
    // Appends required elements to main.
    uList.appendChild(feedHeader);
    main.appendChild(uList);
    main.appendChild(post);
    main.appendChild(post2);
    let element = document.getElementById("root");
    element.appendChild(main);
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
function createPost() {
    // Creates the list to hold elements of post.
    let list = document.createElement("li");
    list.classList.add("post");
    list.setAttribute("data-id-feed","");

    // Holds the upvotes for post.
    let votes = document.createElement("div");
    votes.classList.add("vote");
    votes.setAttribute("data-id-upvotes","");

    // Creates div to hold content.
    let content = document.createElement("div");
    content.classList.add("content");

    // Holds subseddit of post.
    let subseddit = document.createElement("h4");
    subseddit.classList.add("post-title", "alt-text");
    let sSeddit = document.createTextNode("/s/temp");
    subseddit.appendChild(sSeddit);

    // Holds title of post.
    let title = document.createElement("h4");
    title.classList.add("post-title", "alt-text")
    title.setAttribute("data-id-title","");
    let text = document.createTextNode("Temporary Title");
    title.appendChild(text);

    // Holds author for post.
    let author = document.createElement("p");
    author.classList.add("post-author");
    author.setAttribute("data-id-author","")
    let poster = document.createTextNode("Posted by @AUTHOR");
    author.appendChild(poster);

    // Appends all elements to list.
    content.appendChild(subseddit);
    content.appendChild(title);
    content.appendChild(author);
    list.appendChild(votes);
    list.appendChild(content);

    return list;
}

export default genFeed;
