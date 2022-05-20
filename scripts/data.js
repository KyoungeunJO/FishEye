export default async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    return fetch("data/photographers.json")
        .then(data => data.json())
}