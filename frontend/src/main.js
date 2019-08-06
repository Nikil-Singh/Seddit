/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 *
 * Updated 2019.
 */

// import your own scripts here.
import genLogin from './login.js'
import genSignup from './signup.js'
import genNavBar from './navbar.js'
import genFeed from './feed.js'
import genProfile from './profile.js'
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
    genProfile();
    genLogin();
    genSignup();
    genFeed("generate");
    scroll();
}

export default initApp;
