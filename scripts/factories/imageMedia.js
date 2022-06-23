export default function imageMediaFactory(data) {
    let { photographerId, title, image, likes, date} = data;

    const mediaLink = `assets/media/${image}`
    date = new Date(date)

    function getDOM(){
        const a = document.createElement( 'a' );
        a.setAttribute("href", `#`);
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", mediaLink)
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

    function getMediaDOM() {
        const div = document.createElement('div')
        div.classList.add('media-content')
        const img = document.createElement( 'img' );
        img.setAttribute("src", mediaLink)
        div.appendChild(img)

        return div
    }

    return { title, mediaLink, likes, date, getDOM, getMediaDOM };
}