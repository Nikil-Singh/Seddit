// Written by Nikil Singh (z5209322)

// Imported scripts.
import refreshPage from './refresh.js'
import genFeed from './feed.js'

function scroll() {
    window.addEventListener("scroll", function() {
              let top = document.getElementById("feed");
              let height = top.offsetHeight;
              let yOffsetHeight = window.pageYOffset;
              let y = yOffsetHeight + window.innerHeight;
              if (y >= height) {
                  if (localStorage.getItem("token") !== null) {
                      console.log(localStorage.getItem("token"));
                      genFeed("morePrivate");
                  }
              }
    })

}

export default scroll;
