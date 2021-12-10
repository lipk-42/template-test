const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API 

const count = 10;
const apiKey = '3I3W4XAKOuIuejYB9n1UrPNmhks0tz8hFm6A7Jv4Bwc';
const query = 'cats';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;


// helper function check if all imgs were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function to set attr on DOM els
 
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos, add to DOM

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create a element to link to unsplash
        const item = document.createElement('a');
/*         item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank'); */
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

 // create img el src unsplash alt
        const image = document.createElement('img');
/*      image.setAttribute('src', photo.urls.regular);
        image.setAttribute('alt', photo.alt_description);
        image.setAttribute('title', photo.alt_description); */
        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        
        // check when each is finished loading
        image.addEventListener('load', imageLoaded);

        // image inside a el, then put both in image container
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}


// Get photos from unsplash api 


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// check to see if scrolling near bottom of the page, load more photos. Window inner height, distance from top of page. compare to height of everything, incl what you can't see. Trigger event


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
        
    }
});

// on load //
getPhotos();