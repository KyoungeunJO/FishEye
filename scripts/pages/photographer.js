import getPhotographers from "../data.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";
import LightboxFactory from "../factories/lightbox.js";

// INIT
// get photographer's id from url
let params = new URLSearchParams(document.location.search);
let id = parseInt(params.get('id'));

// Get specific photographer's info
const photographer = await getPhotographers().then(data => data.photographers.filter(
    photographer => {
        return id === photographer.id;
    }
)[0]);

// Get photographer's media
const rawMedia = await getPhotographers().then(data => data.media.filter(
    media => {
        return media.photographerId === photographer.id;
    }
));

displayPhotographerHeader(photographer)
let allMedia = mapMedia(rawMedia)

allMedia = sortMediaBy('popularity', allMedia)
displayMedia(allMedia)

// Set total likes and price in info div
updateTotalLikes()

// Listen select input and order media
const select = document.getElementById('select')
select.addEventListener('change', e => {
    const val = e.target.value
    // Trier les media contenus dans la variable media en fonction de la valeur sélectionnée
    allMedia = sortMediaBy(val, allMedia)
    displayMedia(allMedia)
})

// Display lightbox
let lightbox = LightboxFactory(allMedia)
let lightboxDOM = lightbox.getDOM()
const body = document.querySelector('body')
body.appendChild(lightboxDOM)

// Create events for lightbox
// Close dialog when clicking on backdrop
lightboxDOM.addEventListener('click', (event) => {
    if (event.target.nodeName == 'DIALOG'){
        lightboxDOM.close()
    }
})
lightboxDOM.addEventListener('keydown', (event) => {
    if (event.key == "ArrowRight") {
        lightbox.next()
        updateLightbox()
    } else if (event.key == 'ArrowLeft') {
        lightbox.prev()
        updateLightbox()
    }
})

let rightArrow = document.querySelector('.fa-angle-right')
rightArrow.addEventListener('click', (e) => {
    lightbox.next()
    updateLightbox()
})

let leftArrow = document.querySelector('.fa-angle-left')
leftArrow.addEventListener('click', (e) => {
    lightbox.prev()
    updateLightbox()
})


// HELPER FUNCTIONS
function updateLightbox() {
    let newMediaContent = lightbox.getMediaContentDOM()
    let OldmediaContent = document.querySelector('.media-content')
    let dialogContent = document.querySelector('.dialog-content')
    dialogContent.replaceChild(newMediaContent, OldmediaContent)
}

function updateTotalLikes() {
    const price = `${photographer.price}€ / jour`
    const likes = allMedia.reduce((acc, el) => acc + el.likes, 0)
    const infoPhotographerFooter = document.getElementById('info-like-price')
    infoPhotographerFooter.innerHTML = `
    <div>${likes}
        <span class="fas fa-heart"></span>
    </div>
    <div>${price}</div>
    `
}

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
    
    mediaArray.forEach((media, index) => {
        const mediaDOM = media.getDOM()
        mediaDOM.setAttribute('data-index', index)
        mediaDOM.addEventListener('click', (event) => {
            event.preventDefault()
            let i = event.currentTarget.getAttribute('data-index')
            if (event.target.nodeName != 'SPAN') {
                lightbox.setIndex(i)
                updateLightbox()
                displayMediaModal()
            }
            // Click on heart
            else if (event.target.nodeName == 'SPAN') {
                likeMedia(i)
            }
        })
        mediaSection.appendChild(mediaDOM)
    });
}

// Enter on hearts
let hearts = document.querySelectorAll('.fa-heart')
hearts.forEach(heart => {
    heart.addEventListener('keydown', event => {
        if (event.key == 'Enter') {
            const index = event.target.parentNode.parentNode.getAttribute('data-index')
            console.log(index);
            likeMedia(index)
        }
    })
})

function likeMedia(index) {
    let media = allMedia[index]
    media.likes += 1
    let allLikesP = document.querySelectorAll('.likes')
    let likesP = allLikesP[index]
    likesP.textContent = media.likes
    updateTotalLikes()
}

function displayMediaModal() {
    lightboxDOM.showModal()
}


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
