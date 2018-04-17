# Snapsplash Imageboard

### Overview

<p>A 5 day project to create an instagram-type website.  It's a single page application built with Vue with basic functionalities like photo upload, home page photo display, ability to add title and caption details, pop-up modals for browsing pictures in larger format and ability to add comments to a photo.</p>

### Website

<p>https://snapsplash-imageboard.herokuapp.com/</p>

### Technologies Used

<p>HTML, CSS, Javascript, Vue, node.js and express.js, postgreSQL, Amazon S3 image storage bucket</p>

### Key Features

<p>Here is the main homepage for this imageboard, which features the most recent subset of photos.  If you scroll to the bottom of the page, you will see the scroll bar expand as the next set of photos are loaded and then you can continue scrolling.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/12107707/38864419-fabc3340-423a-11e8-9607-d5946db9e645.gif"  width="800"/>
</p>

<p>At the top of the page is a photo upload bar which allows users to input additional data like a photo title, caption, and user name.  This data is later displayed on the homepage as well as the pop-up modals.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/12107707/38864420-fad4e354-423a-11e8-8522-de7fa04c468e.gif"  width="800"/>
</p>

<p>As you hover the mouse over a photo, it is dimmed.  If you click on it, a popup modal appears which allows you to see a bigger version as well as additional details and a comment box. Click outside of the pop-up modal to close it and return to the homepage.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/12107707/38864421-faf37224-423a-11e8-9d05-4698f8362aa8.gif"  width="800"/>
</p>

<p>In the pop-up modal, users can submit comments which are automatically saved and appear immediately in the comment box.  If you close and open the pop-up again, the comments will still be there.  Lastly, if there are many comments, the comment box turns into a scroll box.</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/12107707/38864423-fb0a02c8-423a-11e8-9e42-05e2ff6ab3ab.gif"  width="800"/>
</p>

### Future Features

<p>Would like to add arrow features to pop-up modal to allow users to scroll to the next photos without closing the popup.</p>
