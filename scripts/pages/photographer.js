import getPhotographers from "../data.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

// INIT
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

displayPhotographerHeader(photographer)
let media = mapMedia(rawMedia)
media = sortMediaBy('popularity', media)
displayMedia(media)

// Set total likes and price in info div
const price = `${photographer.price}€ / jour`
const likes = media.reduce((acc, el) => acc + el.likes, 0)
const infoPhotographerFooter = document.getElementById('info-like-price')
infoPhotographerFooter.innerHTML = `
<span>${likes}
    <i class="fas fa-heart"></i>
</span>
<span>${price}</span>
`


// Listen select input and order media
const select = document.getElementById('select')
select.addEventListener('change', e => {
    const val = e.target.value
    // Trier les media contenus dans la variable media en fonction de la valeur sélectionnée
    media = sortMediaBy(val, media)
    displayMedia(media)
})

// HELPER FUNCTIONS
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

function sortMediaBy(value, medias) {
    switch (value) {
        case 'popularity':
            medias.sort((a, b) => {
                return b.likes - a.likes
            })
            break;

        case 'title':
            medias.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
            break;
            
        case 'date':
            medias.sort((a, b) => {
                return b.date - a.date
            })
            break;

        default:
            break;
    }

    return medias
}


