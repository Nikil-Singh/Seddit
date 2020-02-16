## Basic Introduction
This project is a mock implementation of the frontend of Reddit. This uses Javascript primarily for frontend implementation.
All elements on the webpage are dynamically generated based on data received from provided backend. All elements have CSS
attached for them so they are presentable, along with animations for smooth transitions. Features that would require the
user to login are login protected. There are also live updates for whenever a user makes post, comment or other similar
actions.

## How to run:
Backend: localhost:5000
Frontend: localhost:8000

## Features:
**Login**: A modal form appears when login button is clicked on. User can login from this form. Has basic error checking.

**Registration**: A modal form appears when register button is clicked on. User can register an account from this form and
login upon successful completition. Has basic error checking.

**Feed Interface**: A feed is generated for both login-protected and general public. The feed is dynamically added onto using
posts stored in database. Each post displays general information about a post including upvotes, comments and timestamp.

**Upvote User Content**: An arrow for upvoting can be clicked on to upvote a post. The arrow upon hovering does change colour
and number of upvotes are automatically updated when clicked. Can also retract upvote.

**Post New Content**: A logged in user can open a modal and make a post, with images if desired. Feed is automatically updated
with any new posts if made.

**Infinite Scroll**: The user can endlessly scroll through feed.

**Profile**: User can see their own profile information in a modal when profile button is clicked. The user can also update
certain profile information such as email and password.

**Comments**: User can view comments for a post. The user can also make a comment for the post. Comment section and number of
comments for a post is automatically updated upon the posting of the comment.

**User Pages**: User can click on a user's name/picture from a post and see a page within a popup modal to see the users
name and information. Can also see other posts made by the user. Can be used on the users own page.

**Follow**: User can follow other users, to add or remove posts form their feed. Can also view a list of users followed on
each user's profiles page and a count of followers and follows on the public user page.

**Delete/Update Post**: User can update or delete previous posts made by user.

**Search Functionality**: User can use search bar to search for posts. Suggestions of posts appear dynamically based on
the input in the search bar.
