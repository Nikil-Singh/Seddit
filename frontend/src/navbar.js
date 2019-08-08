// Written by Nikil Singh (z5209322)

//Generates navigation bar.
function genNavBar() {
    // Creates the actual bar.
    let bar = document.createElement("header");
    bar.id = "nav";
    bar.classList.add("banner");

    // Creates the heading/logo for the bar.
    let heading = navBarLogo();
    bar.appendChild(heading);

    // Creates the unordered list.
    let unorderedList = genUList();

    // Creates the elements of the unordered list.
    let searchLi = genListItem("search");
    let loginLi = genListItem("login");
    let signupLi = genListItem("signup");
    let logoutLi = genListItem("logout");
    let userLi = genListItem("user-profile");

    // Appends search bar and buttons to unordered list.
    unorderedList.appendChild(searchLi);
    unorderedList.appendChild(loginLi);
    unorderedList.appendChild(signupLi);
    unorderedList.appendChild(logoutLi);
    unorderedList.appendChild(userLi);

    // Appends unorderedList to bar.
    bar.appendChild(unorderedList);

    // Appends bar to the document.
    let element = document.getElementById("root");
    element.appendChild(bar);
}

// Creates and returns the unordered list.
function genUList() {
    let unorderedList = document.createElement("ul");
    unorderedList.id = "uList-Nav";
    unorderedList.classList.add("nav");
    return unorderedList;
}

// Creates the required list items given a name.
function genListItem(itemName) {
    let item = document.createElement("li");
    item.classList = "nav-item";
    item.id = itemName + "-li";
    return item;
}

// Creates the logo for nav bar.
function navBarLogo() {
    let heading = document.createElement("h1");
    heading.id = "logo";
    heading.classList = "flex-center";
    let text = document.createTextNode("Seddit");
    heading.appendChild(text);
    return heading;
}

export default genNavBar;
