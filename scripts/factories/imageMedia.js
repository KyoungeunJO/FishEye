export default function imageMediaFactory(data) {
    const { photographerId, title, image, likes} = data;

    function getDOM(){
        const a = document.createElement( 'a' );
        a.setAttribute("href", `#`);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", `assets/media/${image}`)
        const divMediaInfo = document.createElement( 'div' );
        divMediaInfo.setAttribute("class", "media-info")
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        const p = document.createElement( 'p' );
        p.setAttribute("class", "likes");
        p.textContent = `${likes}`;
        article.appendChild(img);
        article.appendChild(divMediaInfo);
        divMediaInfo.appendChild(h2);
        divMediaInfo.appendChild(p);
        a.appendChild(article);
        
        return a;
    }

    return { title, image, likes, getDOM };
}