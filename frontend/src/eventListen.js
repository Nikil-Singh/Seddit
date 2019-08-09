// Written by Nikil Singh (z5209322)

// Imported scripts.
import genLogin from './login.js'
import genSignup from './signup.js'
import genProfile from './profile.js'
import genFeed from './feed.js'
import genUpvotes from './upvotes.js'
import genComments from './comments.js'
import genPost from './post.js'
import genPages from './userPages.js'

// Event Listeners.
function eventListen() {
    // Gets all clickabes.
    const loginBTN = document.getElementById("login-btn");
    const signInBTN = document.getElementById("login-submit");
    const closeLogin = document.getElementById("login-modal-close");
    const logoutBTN = document.getElementById("logout-btn");
    const signupBTN = document.getElementById("signup-btn");
    const registerBTN = document.getElementById("signup-submit");
    const closeSignup = document.getElementById("signup-modal-close");
    const profileBTN = document.getElementById("profile-view");
    const profileUpdateBTN = document.getElementById("profile-update");
    const profileSubmit = document.getElementById("profile-update-submit");
    const profileUpdateClose = document.getElementById("update-profile-modal-close");
    const closeProfile = document.getElementById("profile-modal-close");
    const postBTN = document.getElementById("post-open-modal");
    const postSubmitBTN = document.getElementById("post-submit");
    const closePost = document.getElementById("post-modal-close");
    const closeUpvote = document.getElementById("upvotes-modal-close");
    const closeComments = document.getElementById("comments-modal-close");
    const submitComment = document.getElementById("comment-submit");
    const userPageClose = document.getElementById("user-modal-close");
    const followBTN = document.getElementById("follow-btn");

    // Gets required modals to be opened or closed.
    const loginModal = document.getElementById("login-modal");
    const signupModal = document.getElementById("signup-modal");
    const profileModal = document.getElementById("profile-modal");
    const upvoteModal = document.getElementById("upvotes-modal")
    const commentsModal = document.getElementById("comments-modal");
    const postModal = document.getElementById("post-modal");
    const profileUpdateModal = document.getElementById("update-profile-modal");
    const userPageModal = document.getElementById("user-page-modal");

    // Checks if user is not logged in so it displays login otherwise if the
    // user is logged in then displays logout.
    if (localStorage.getItem("token") === null) {
        loginBTN.classList.toggle("button-display");
        signupBTN.classList.toggle("button-display");
    } else {
        postBTN.classList.toggle("button-display");
        profileBTN.classList.toggle("button-display");
        logoutBTN.classList.toggle("button-display")
    }

    // Event listener for if login button is clicked.
    loginBTN.addEventListener('click', function() {
        console.log("Login Button");
        loginModal.classList.toggle("show-modal");
    });

    // Event listener for sign in button on login form modal.
    closeLogin.addEventListener('click', function() {
        console.log("Close Login Modal");
        loginModal.classList.toggle("show-modal");
        // Gets rid of any error messages.
        genLogin("clearErrors");
    });

    // Event listener for sign in button on login form modal.
    signInBTN.addEventListener('click', function(e) {
        console.log("Signning In");
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Checks if sign in data is correct.
        genLogin("verifySignIn");
    })

    // Event listener for closing login form modal.
    logoutBTN.addEventListener('click', function() {
        console.log("Logout Button, removing token and userID");
        // Clears token and user ID from local storage since the user is
        // logging out.
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        // Changes displays for buttons.
        loginBTN.classList.toggle("button-display");
        signupBTN.classList.toggle("button-display");
        logoutBTN.classList.toggle("button-display");
        profileBTN.classList.toggle("button-display");
        postBTN.classList.toggle("button-display");
        // Removes the current feed and displays a feed for public.
        genFeed("removeCurrentFeed");
        genFeed("morePublic");
        localStorage.setItem("currPost", 0);
    });

    // Event listener for when signup button is clicked.
    signupBTN.addEventListener('click', function() {
        console.log("Sign Up Button");
        signupModal.classList.toggle("show-modal");
    });

    // Event listener for closing register form modal.
    closeSignup.addEventListener('click', function() {
        console.log("Close Sign Up Modal");
        signupModal.classList.toggle("show-modal");
        // Gets rid of any error messages.
        genSignup("clearErrors");
    })

    // Event listener for register in button on signup form modal.
    registerBTN.addEventListener('click', function(e) {
        console.log("Registering Details");
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Checks if register details are correct.
        genSignup("verifyRegister");
    })

    // Event listener for closing upvotes modal.
    profileBTN.addEventListener('click', function() {
        console.log("Viewing Own Profile");
        profileModal.classList.toggle("show-modal");
        // Populates the profile modal.
        genProfile("populate");
    })

    // Event listener for opening modal to update profile.
    profileUpdateBTN.addEventListener('click', function() {
        console.log("Update Profile");
        profileUpdateModal.classList.toggle("show-modal");
        // Populates the modal with pre-existing information.
        genProfile("populateProfileModal");
    })

    // Event listener for submitting profile changes.
    profileSubmit.addEventListener('click', function(e) {
        console.log("Submitting Profile Changes");
        e.preventDefault();
        genProfile("verifyUpdate");
    })

    // Event lisyener for closing profile update modal.
    profileUpdateClose.addEventListener('click', function() {
        console.log("Closing Profile Update Modal");
        profileUpdateModal.classList.toggle("show-modal");
        genProfile("clearErrors");
    })

    // Event listener for closing upvotes modal.
    closeProfile.addEventListener('click', function() {
        console.log("Close Profile Modal");
        profileModal.classList.toggle("show-modal");
        console.log("Refreshing Profile Modal");
        // Removes data from profile modal.
        genProfile("refresh");
    })

    // Event listener for opening post modal.
    postBTN.addEventListener('click', function() {
        console.log("Post Button");
        postModal.classList.toggle("show-modal");
    })

    // Event listener for submitting post.
    postSubmitBTN.addEventListener('click', function(e) {
        console.log("Submitting Post");
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Verifies whether post submission content are correct and if so then,
        // posts it.
        genPost("makePost");
    })

    // Event listener for closing post modal.
    closePost.addEventListener('click', function() {
        console.log("Closing Post Modal");
        postModal.classList.toggle("show-modal");
        // Removes errors from post modal.
        genPost("clearErrors");
    })

    // Event listener for closing the upvote modal.
    closeUpvote.addEventListener('click', function() {
        console.log("Closing Upvote Modal");
        upvoteModal.classList.toggle("show-modal");
    })

    // Event listener for closing the comments modal.
    closeComments.addEventListener('click', function() {
        console.log("Closing Comment Modal");
        commentsModal.classList.toggle("show-modal");
        // Removes the comment ID from local storage.
        localStorage.removeItem("commentID");
        // Removes errors from comments modal.
        genComments("clearErrors");
    })

    // Event listener for submitting a comment made.
    submitComment.addEventListener('click', function() {
        console.log("Submiting comment");
        // Submits comment to be verified then submitted if correct.
        genComments("makeComment");
    })

    // Event listener for closing the user pages modal.
    userPageClose.addEventListener('click', function() {
        console.log("Closing User Pages Modal");
        userPageModal.classList.toggle("show-modal");
        genPages("refreshPost");
        localStorage.removeItem("userPageUsername");
    })

    // Event listener for following and unfollowing a user.
    followBTN.addEventListener('click', function() {
        console.log("Following/Unfollowing User");
        
    })

    // Used to listen to events related to dynamically created posts.
    document.addEventListener('click', function(e) {
        if (e.target.id.includes("vote-")) {
            console.log("Clicked upvotes number " + e.target.id);
            if (localStorage.getItem("token") !== null) {
                // Performs the required action in relation to up voting.
                showUpvotes(e);
            }

        } else if (e.target.id.includes("upVoteArrow-")) {
            console.log("Clicked upvotes arrow " + e.target.id);
            if (localStorage.getItem("token") !== null) {
                // Performs the required action in relation to up voting.
                showUpvotes(e);
            }
        } else if (e.target.id.includes("comments-post-")) {
            console.log("Clicked comments " + e.target.id);
            if (localStorage.getItem("token") !== null) {
                showComment(e);
            }
        } else if (e.target.id.includes("post-author-")) {
            console.log("Clicked author " + e.target.id);
            if (localStorage.getItem("token") !== null) {
                genPages("refreshPost");
                genPages("populate", e.target.innerText);
                userPageModal.classList.toggle("show-modal");
            }
        }

    });
}

// Show modal with upvotes and update upvotes.
function showUpvotes(e) {
    // Checks the current state of the upvote.
    if (e.target.id.includes("upVoteArrow-")
    && !e.target.classList.contains("post-arrow-click")) {
        // If adding an upvote.
        console.log("Adding Vote");
        genUpvotes("addVote", e.target.id);
    } else if (e.target.id.includes("upVoteArrow-")
    && e.target.classList.contains("post-arrow-click")) {
        // If removing an upvote.
        console.log("Removing Vote");
        genUpvotes("removeVote", e.target.id);
    } else {
        // If displaying upvoters.
        console.log("Showing Upvotes")
        genUpvotes("showVotes", e.target.id);
    }
}

// Show modal with comments.
function showComment(event) {
    console.log("Showing Comments")
    // Adds the comment ID to the local storage.
    localStorage.setItem("commentID", event.target.id);
    genComments("showComments", event.target.id);
}

export default eventListen;
