export default function videoMediaFactory(data) {
    let { photographerId, title, video, likes, date} = data;

    date = new Date(date)
    const mediaLink = `assets/media/${video}`

    function getDOM(){
        const a = document.createElement( 'a' );
        a.setAttribute("href", `#`);
        const article = document.createElement( 'article' );
        const videoMedia = document.createElement( 'video' );
        videoMedia.setAttribute("controls", true)
        const source = document.createElement( 'source' );
        source.setAttribute("src", mediaLink)
        const divMediaInfo = document.createElement( 'div' );
        divMediaInfo.setAttribute("class", "media-info")
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        const p = document.createElement( 'p' );
        p.setAttribute("class", "likes");
        p.textContent = `${likes}`;
        const i = document.createElement( 'span' );
        i.setAttribute("class", "fas fa-heart");
        i.setAttribute('tabindex', '0')
        i.setAttribute('aria-label', 'likes')
        article.appendChild(videoMedia);
        videoMedia.appendChild(source);
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
        const videoMedia = document.createElement( 'video' );
        videoMedia.setAttribute("controls", true)
        const source = document.createElement( 'source' );
        source.setAttribute("src", mediaLink)
        videoMedia.appendChild(source)
        div.appendChild(videoMedia)

        return div
    }

    return { title, mediaLink, likes, date, getDOM, getMediaDOM };
}