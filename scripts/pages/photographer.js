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
const rawMedia = await getPhotographers().then(data => data.media.filter(
    media => {
        return media.photographerId === photographer.id;
    }
))

function mapMedia(mediaArray) {
    let medias = []
    mediaArray.forEach(media => {
        const mediaModel = mediaFactory(media)
        medias.push(mediaModel)
    })
    return medias
}

async function displayPhotographerHeader(photographer) {
    const photographerSection = document.querySelector("main")
    const photographerModel = photographerFactory(photographer)
    const photographerHeaderDOM = photographerModel.getHeaderDOM()
    photographerSection.appendChild(photographerHeaderDOM)
}

async function displayMedia (mediaArray) {
    const mediaSection = document.querySelector("#media")
    mediaSection.innerHTML = ""
    
    mediaArray.forEach(media => {
        const mediaDOM = media.getDOM()
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

const closeBtn = document.querySelectorAll(".close-btn")
closeBtn.forEach(btn => {
    btn.addEventListener('click', closeMediaModal)
})

const select = document.getElementById('select')
select.addEventListener('change', e => {
    const val = e.target.value
    console.log(val)
    // Trier les media contenus dans la variable media en fonction de la valeur sélectionnée

    switch (val) {
        case 'popularity':
            media.sort((a, b) => {
                return b.likes - a.likes
            })
            break;
    
        default:
            break;
    }
    displayMedia(media)
})

// INIT
displayPhotographerHeader(photographer)
const media = mapMedia(rawMedia)
displayMedia(media)
