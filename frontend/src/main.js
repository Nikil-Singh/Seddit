/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

 // Written by Nikil Singh (z52209322)

// import your own scripts here.
import genNavBar from './navbar.js'
import genLogin from './login.js'
import genSignup from './signup.js'
import genProfile from './profile.js'
import genFeed from './feed.js'
import genUpvotes from './upvotes.js'
import genComments from './comments.js'
import genPost from './post.js'
import genPages from './userPages.js'
import genModDelPost from './modifyPost.js'
import genSearch from './search.js'
import eventListen from './eventListen.js'
import scroll from './scroll.js'

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with
// different datasets.
function initApp(apiUrl) {
    //localStorage.clear();
    localStorage.setItem("api", apiUrl);
    localStorage.setItem("currPost", 0);
    // Initialises the page.
    genNavBar();
    genSearch("generate");
    genLogin("generate");
    genSignup("generate");
    genProfile("generate");
    genModDelPost("generate");
    genFeed("generate");
    genPages("generate");
    genUpvotes("generate");
    genComments("generate");
    genPost("generate");
    eventListen();
    scroll();
}

export default initApp;
