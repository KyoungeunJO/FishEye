import getPhotographers from "../data.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

// get photographer's id from url
let params = new URLSearchParams(document.location.search);
let id = parseInt(params.get('id'));

// Get specific photographer's info
const photographer = await getPhotographers().then(data => data.photographers.filter(
    photographer => {
        return id === photographer.id;
    }
)[0])

// Get photographer's media
const media = await getPhotographers().then(data => data.media.filter(
    media => {
        return media.photographerId === photographer.id;
    }
))

async function displayPhotographerHeader(photographer) {
    const photographerSection = document.querySelector("main")
    const photographerModel = photographerFactory(photographer)
    const photographerHeaderDOM = photographerModel.getHeaderDOM()
    photographerSection.appendChild(photographerHeaderDOM)
}

async function displayMedia (mediaArray) {
    const mediaSection = document.querySelector("#media")
    
    mediaArray.forEach(media => {
        const mediaModel = mediaFactory(media)
        const mediaDOM = mediaModel.getDOM()
        mediaDOM.addEventListener('click', displayMediaModal)
        mediaSection.appendChild(mediaDOM)
    });
}

function displayMediaModal() {
    const modal = document.querySelector('#media-modal')
    const curtain = document.querySelector('#curtain')

    curtain.style.display = "block"
    modal.style.display = "flex"
}

function closeMediaModal() {
    const modal = document.querySelector('#media-modal')
    modal.style.display = "none"
}

displayPhotographerHeader(photographer)
displayMedia(media)

const closeBtn = document.querySelectorAll(".close-btn")
closeBtn.forEach(btn => {
    btn.addEventListener('click', closeMediaModal)
})