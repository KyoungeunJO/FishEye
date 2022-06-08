export default function imageMediaFactory(data) {
    let { photographerId, title, image, likes, date} = data;

    date = new Date(date)

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
        const i = document.createElement( 'i' );
        i.setAttribute("class", "fas fa-heart");
        article.appendChild(img);
        article.appendChild(divMediaInfo);
        divMediaInfo.appendChild(h2);
        divMediaInfo.appendChild(p);
        divMediaInfo.appendChild(i);
        a.appendChild(article);
        
        return a;
    }

    return { title, image, likes, date, getDOM };
}