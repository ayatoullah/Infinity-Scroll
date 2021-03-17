const count = 30;
const apiKey = "3LYIYlqeVJyhJ4C9Q5k_DGGK2RRUjK6DabSgL4Sqjkg";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
/**
 * Get photos from unsplash api
 */
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    return "oops , error " + error;
  }
}
function setAttributes(item, attributes) {
  for (let key in attributes) {
    item.setAttribute(key, attributes[key]);
  }
}
function displayPhotos() {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    let item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    let image = document.createElement("img");
    setAttributes(image, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    image.addEventListener("load", imageLoaded);
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
}
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imagesLoaded = 0;
  }
}

getPhotos();
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
