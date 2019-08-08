// Written by Nikil Singh (z5209322)

// Imported scripts.
import genFeed from './feed.js'

// Will serve as an event listener for infinite scroll.
function scroll() {
    // Event listener for scrolling.
    window.addEventListener("scroll", function() {
        // Gets the beginning of the feed.
        let feed = document.getElementById("feed");
        // Gets height of the top of the feed.
        let height = feed.offsetHeight;
        // Gets offset height of window.
        let offsetHeight = window.pageYOffset;
        // Sums the window offset height with the windows inner height.
        let total = offsetHeight + window.innerHeight;
        if (total >= height) {
            // Adds more posts to bottom of page.
            console.log("Scroll is adding more posts.");
            if (localStorage.getItem("token") !== null) genFeed("morePrivate");
        }
    })

}

export default scroll;
