// Written by Nikil Singh (z5209322)

// Allows the user to follow or unfollow another user.
function follow(command) {
    if (command == "[un]follow") {
        console.log(document.getElementById("follow-btn").innerText);
        if (document.getElementById("follow-btn").innerText == "FOLLOW") {
            // Follows the user since the user is not followed.
            followUser();
        } else {
            // Unfollows the user since the user is already followed.
            unfollowUser();
        }
    }
}

// Follows the required user.
function followUser() {
    console.log("Followed User");
    let username = localStorage.getItem("userPageUsername");
    // Sets options to get certain details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }
    // The url for accessing user to follow.
    let followAuth = localStorage.getItem("api") + "/user/follow/?username=" + username;
    fetch(followAuth, options)
        .then(response => response.json())
        .then(data => {
            // Updates the follow button and increments number of followers.
            document.getElementById("follow-btn").innerText = "Unfollow";
            let followerCount = document.getElementById("user-followers").innerText;
            followerCount = Number(followerCount) + 1;
            document.getElementById("user-followers").innerText = followerCount;
        });
}

// Unfollows the required user.
function unfollowUser() {
    console.log("Unfollowed User");
    let username = localStorage.getItem("userPageUsername");
    // Sets options to get certain details.
    let tokenString = "Token " + localStorage.token;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': tokenString
        }
    }
    // The url for accessing user to follow.
    let followAuth = localStorage.getItem("api") + "/user/unfollow/?username=" + username;
    fetch(followAuth, options)
        .then(response => response.json())
        .then(data => {
            // Updates the follow button and decrements number of followers.
            document.getElementById("follow-btn").innerText = "Follow";
            let followerCount = document.getElementById("user-followers").innerText;
            followerCount = Number(followerCount) - 1;
            document.getElementById("user-followers").innerText = followerCount;
        });
}

export default follow;
