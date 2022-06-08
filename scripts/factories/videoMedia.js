export default function videoMediaFactory(data) {
    let { photographerId, title, video, likes, date} = data;

    date = new Date(date)

    function getDOM(){
        const a = document.createElement( 'a' );
        a.setAttribute("href", `#`);
        const article = document.createElement( 'article' );
        const videoMedia = document.createElement( 'video' );
        videoMedia.setAttribute("controls", true)
        const source = document.createElement( 'source' );
        source.setAttribute("src", `assets/media/${video}`)
        const divMediaInfo = document.createElement( 'div' );
        divMediaInfo.setAttribute("class", "media-info")
        const h2 = document.createElement( 'h2' );
        h2.textContent = title;
        const p = document.createElement( 'p' );
        p.setAttribute("class", "likes");
        p.textContent = `${likes}`;
        const i = document.createElement( 'i' );
        i.setAttribute("class", "fas fa-heart");
        article.appendChild(videoMedia);
        videoMedia.appendChild(source);
        article.appendChild(divMediaInfo);
        divMediaInfo.appendChild(h2);
        divMediaInfo.appendChild(p);
        divMediaInfo.appendChild(i);
        a.appendChild(article);
        
        return a;
    }

    return { title, video, likes, date, getDOM };
}