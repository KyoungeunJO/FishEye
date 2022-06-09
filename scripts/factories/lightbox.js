export default function LightboxFactory(mediaArray) {
    const mediaList = mediaArray

    let currentIndex = 0

    function next() { 
        currentIndex = (currentIndex + 1) % (mediaList.length - 2)
    }

    function prev() {
        currentIndex -= 1
        if (currentIndex == -1) 
        currentIndex = mediaList.length - 1
    }

    function getDOM() {
        const dialog = document.createElement('dialog')
        const img = document.createElement('img')
        img.setAttribute('src', mediaList[currentIndex].mediaLink)
        const closeBtn = document.createElement('i')
        const prevBtn = document.createElement('i')
        const nextBtn = document.createElement('i')

        dialog.appendChild(img)
        dialog.appendChild(closeBtn)
        dialog.appendChild(nextBtn)
        dialog.appendChild(prevBtn)
        
        return dialog
    }

    return { next, prev, getDOM }
}