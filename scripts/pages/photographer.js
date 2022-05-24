import getPhotographers from "../data.js";
import photographerFactory from "../factories/photographer.js";

// get photographer's id from url
let params = new URLSearchParams(document.location.search);
let id = parseInt(params.get('id'));

// Get specific photographer's info
const photographer = await getPhotographers().then(data => data.photographers.filter(
    photographer => {
        return id === photographer.id;
    }
)[0])

async function displayPhotographerHeader(photographer) {
    const photographerSection = document.querySelector("main")
    const photographerModel = photographerFactory(photographer)
    const photographerHeaderDOM = photographerModel.getHeaderDOM()
    photographerSection.appendChild(photographerHeaderDOM)
}

displayPhotographerHeader(photographer)

