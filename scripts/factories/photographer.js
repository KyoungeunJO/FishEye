export default function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.setAttribute("href", `./photographer.html?id=${id}`);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `Profile picture of ${name}`);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        p.setAttribute("class", "location");
        p.textContent = `${city}, ${country}`;
        const p2 = document.createElement( 'p' );
        p2.setAttribute("class", "tagline");
        p2.textContent = tagline;
        const p3 = document.createElement( 'p' );
        p3.setAttribute("class", "price");
        p3.textContent = `${price}€/jour`;
        a.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(p2);
        article.appendChild(p3);
        return (a);
    }
    return { name, picture, getUserCardDOM }
}
