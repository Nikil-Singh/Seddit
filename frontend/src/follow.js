// Written by Nikil Singh (z5209322)

// Allows the user to follow or unfollow another user.
function follow(command) {
    if (command == "[un]follow") {
        if (document.getElementById("follow-btn").innerText == "follow") {
            // Follows the user since the user is not followed.
            followUser();
        } else {
            // Unfollows the user since the user is already followed.
            unfollowUser();
        }
    }
}
