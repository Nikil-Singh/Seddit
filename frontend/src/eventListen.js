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
import genSearch from './search.js'
import follow from './follow.js'
import genModDelPost from './modifyPost.js'

// Event Listeners.
function eventListen() {
    // Gets all clickabes.
    // ------- Login Clickables ------- //
    const loginBTN = document.getElementById("login-btn");
    const signInBTN = document.getElementById("login-submit");
    const closeLogin = document.getElementById("login-modal-close");
    // ------- Logout Clickables ------- //
    const logoutBTN = document.getElementById("logout-btn");
    // ------- Signup Clickables ------- //
    const signupBTN = document.getElementById("signup-btn");
    const registerBTN = document.getElementById("signup-submit");
    const closeSignup = document.getElementById("signup-modal-close");
    // ------- Profile Clickables ------- //
    const profileBTN = document.getElementById("profile-view");
    const closeProfile = document.getElementById("profile-modal-close");
    // ------- Update Profile Clickables ------- //
    const profileUpdateBTN = document.getElementById("profile-update");
    const profileSubmit = document.getElementById("profile-update-submit");
    const profileUpdateClose = document.getElementById("update-profile-modal-close");
    // ------- Edit Posts Clickables ------- //
    const viewPosts = document.getElementById("profile-view-posts");
    const viewPostsClose = document.getElementById("all-posts-modal-close");
    const removeImageBTN = document.getElementById("update-rem-image-button");
    const updatePostBTN = document.getElementById("update-post-button");
    const closeUpdatePost = document.getElementById("update-post-modal-close");
    // ------- Post Clickables ------- //
    const postBTN = document.getElementById("post-open-modal");
    const postSubmitBTN = document.getElementById("post-submit");
    const closePost = document.getElementById("post-modal-close");
    // ------- Upvote Clickables ------- //
    const closeUpvote = document.getElementById("upvotes-modal-close");
    // ------- Comment Clickables ------- //
    const closeComments = document.getElementById("comments-modal-close");
    const submitComment = document.getElementById("comment-submit");
    // ------- User Pages Clickables ------- //
    const userPageClose = document.getElementById("user-modal-close");
    // ------- Follow/Unfollow Clickables ------- //
    const followBTN = document.getElementById("follow-btn");
    // ------- Search Clickables ------- //
    const searchBTN = document.getElementById("search-btn");

    // Gets required modals to be opened or closed.
    // Modal for loggin in.
    const loginModal = document.getElementById("login-modal");
    // Modal for signing up.
    const signupModal = document.getElementById("signup-modal");
    // Modal for viewing profile.
    const profileModal = document.getElementById("profile-modal");
    // Modal for viewing all own posts.
    const viewPostsModal = document.getElementById("all-posts-modal");
    // Modal for viewing upvotes to a post.
    const upvoteModal = document.getElementById("upvotes-modal");
    // Modal for viewing comments to a post.
    const commentsModal = document.getElementById("comments-modal");
    // Modal for making a post.
    const postModal = document.getElementById("post-modal");
    // Modal for updating user profile.
    const profileUpdateModal = document.getElementById("update-profile-modal");
    // Modal for viewing users own posts.
    const userPageModal = document.getElementById("user-page-modal");
    // Modal for updating users own posts.
    const editPostModal = document.getElementById("update-post-modal");

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

    // ------ Event Listeners for Login ------ //
    // Event listener for if login button is clicked.
    loginBTN.addEventListener('click', function() {
        console.log("Login Button");
        loginModal.classList.toggle("display-modal");
    });

    // Event listener for sign in button on login form modal.
    closeLogin.addEventListener('click', function() {
        console.log("Close Login Modal");
        loginModal.classList.toggle("display-modal");
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

    // ------ Event Listeners for Logout ------ //
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

    // ------ Event Listeners for Signup ------ //
    // Event listener for when signup button is clicked.
    signupBTN.addEventListener('click', function() {
        console.log("Sign Up Button");
        signupModal.classList.toggle("display-modal");
    });

    // Event listener for closing register form modal.
    closeSignup.addEventListener('click', function() {
        console.log("Close Sign Up Modal");
        signupModal.classList.toggle("display-modal");
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

    // ------ Event Listeners for Profile ------ //
    // Event listener for closing upvotes modal.
    profileBTN.addEventListener('click', function() {
        console.log("Viewing Own Profile");
        profileModal.classList.toggle("display-modal");
        // Populates the profile modal.
        genProfile("populate");
    })

    // Event listener for closing upvotes modal.
    closeProfile.addEventListener('click', function() {
        console.log("Close Profile Modal");
        profileModal.classList.toggle("display-modal");
        console.log("Refreshing Profile Modal");
        // Removes data from profile modal.
        genProfile("refresh");
    })

    // ------ Event Listeners for Updating Profile ------ //
    // Event listener for opening modal to update profile.
    profileUpdateBTN.addEventListener('click', function() {
        console.log("Update Profile");
        profileUpdateModal.classList.toggle("display-modal");
        // Populates the modal with pre-existing information.
        genProfile("populateProfileModal");
    })

    // Event listener for submitting profile changes.
    profileSubmit.addEventListener('click', function(e) {
        console.log("Submitting Profile Changes");
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Verifies whether update to post is valid.
        genProfile("verifyUpdate");
    })

    // Event lisyener for closing profile update modal.
    profileUpdateClose.addEventListener('click', function() {
        console.log("Closing Profile Update Modal");
        profileUpdateModal.classList.toggle("display-modal");
        // Clears errors from modal.
        genProfile("clearErrors");
    })

    // ------ Event Listeners for Viewing Posts ------ //
    // Event listener for viewing all posts.
    viewPosts.addEventListener('click', function() {
        console.log("View Posts");
        viewPostsModal.classList.toggle("display-modal");
        // Populates the modal.
        genModDelPost("populatePostsModal");
    })

    // Event listener for closing all posts modal
    viewPostsClose.addEventListener('click', function() {
        console.log("Closing All Posts Modal");
        viewPostsModal.classList.toggle("display-modal");
        // Refreshes the modal.
        genModDelPost("refreshViewModal");
    })

    // ------ Event Listeners for Making Post ------ //
    // Event listener for opening post modal.
    postBTN.addEventListener('click', function() {
        console.log("Post Button");
        postModal.classList.toggle("display-modal");
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
        postModal.classList.toggle("display-modal");
        // Removes any stored value in post.
        document.getElementById("post-image").value = "";
        document.getElementById("post-title").value = "";
        document.getElementById("post-text").value = "";
        document.getElementById("post-subseddit").value = "";
        // Removes errors from post modal.
        genPost("clearErrors");
    })

    // ------ Event Listeners for Upvote ------ //
    // Event listener for closing the upvote modal.
    closeUpvote.addEventListener('click', function() {
        console.log("Closing Upvote Modal");
        upvoteModal.classList.toggle("display-modal");
    })

    // ------ Event Listeners for Comments ------ //
    // Event listener for closing the comments modal.
    closeComments.addEventListener('click', function() {
        console.log("Closing Comment Modal");
        commentsModal.classList.toggle("display-modal");
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

    // ------ Event Listeners for User Pages ------ //
    // Event listener for closing the user pages modal.
    userPageClose.addEventListener('click', function() {
        console.log("Closing User Pages Modal");
        userPageModal.classList.toggle("display-modal");
        // Refreshes posts on user pages.
        genPages("refreshPost");
        // Removes username of user whose page was being viewed.
        localStorage.removeItem("userPageUsername");
    })

    // ------ Event Listeners for Follow/Unfollow ------ //
    // Event listener for following and unfollowing a user.
    followBTN.addEventListener('click', function() {
        console.log("Following/Unfollowing User");
        follow("[un]follow");
    })

    // ------ Event Listeners for Updating Post ------ //
    // Event listener for submitting updates to the post.
    updatePostBTN.addEventListener('click', function(e) {
        console.log("Update Post");
        // Prevents page from refreshing if clicked.
        e.preventDefault();
        // Submits post update.
        genModDelPost("updatePost");
    })

    // Event listener to close update post modal.
    closeUpdatePost.addEventListener('click', function() {
        console.log("Closing Update Post Modal");
        editPostModal.classList.toggle("display-modal");
        // Resets value for image in update modal.
        document.getElementById("update-post-image").value = "";
        // Clears error messages.
        genModDelPost("clearErrorMessages");
    })

    // Event listener to remove image from post.
    removeImageBTN.addEventListener('click', function(e) {
        console.log("Removing Image");
        // Prevents page from refreshing if clicked.
        e.preventDefault()
        // Clears values for image, if image is to be removed.
        document.getElementById("update-post-image-preview").src = "";
        document.getElementById("update-post-image-preview").value = "";
    })

    // ------ Event Listeners for Searching ------ //
    searchBTN.addEventListener('click', function() {
        console.log("Searching");
        if (localStorage.getItem("token") !== null) {
            // Performs the search.
            genSearch("search");
        }
    })

    // ------ Event Listeners for Dynamically Created Elements ------ //
    // Used to listen to events related to dynamically created elements.
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
                // Shows the comments for required post.
                showComment(e);
            }
        } else if (e.target.id.includes("post-author-")) {
            console.log("Clicked author " + e.target.id);
            if (localStorage.getItem("token") !== null) {
                // Shows the users page, with their details and posts.
                genPages("refreshPost");
                genPages("populate", e.target.innerText);
                userPageModal.classList.toggle("display-modal");
            }
        } else if (e.target.id.includes("edit-posts-btn-")) {
            if (localStorage.getItem("token") !== null) {
                // Open modal to edit post.
                console.log("Edit Post");
                genModDelPost("populateUpdateModal", e.target.id);
                // Sets ID in local storage.
                let postID = e.target.id.replace("edit-posts-btn-","");
                localStorage.setItem("postEdit", postID);
                editPostModal.classList.toggle("display-modal");
            }
        } else if (e.target.id.includes("delete-posts-btn-")) {
            if (localStorage.getItem("token") !== null) {
                // Deletes the actual post.
                console.log("Delete Post");
                genModDelPost("deletePost", e.target.id);
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
    // Shows the comments.
    genComments("showComments", event.target.id);
}

export default eventListen;
