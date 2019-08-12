// Written by Nikil Singh (z5209322)

// Imported scripts.
import genFeed from './feed.js'

// Will serve as an event listener for infinite scroll.
function scroll() {
    // Event listener for scrolling.
    window.addEventListener("scroll", function() {
        // Gets the beginning of the feed.
        let feed = document.getElementById("feed");
        // Gets window vertical height of window.
        let windowHeight = window.pageYOffset;
        // Sums the window offset height with the windows inner height.
        let total = windowHeight + window.innerHeight;
        // If amount scrolled down exceeds height.
        if (total >= feed.offsetHeight) {
            // Adds more posts to bottom of page.
            if (localStorage.getItem("token") !== null &&
                localStorage.getItem("currFeed") !== "public") {
                genFeed("morePrivate");
            }
        }
    })

}

export default scroll;
