import imageMediaFactory from './imageMedia.js'
import videoMediaFactory from './videoMedia.js'

export default function mediaFactory(data) {
    let media = {}

    if (data.image)
        media = imageMediaFactory(data)
    if (data.video)
        media = videoMediaFactory(data)

    return media
}