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
        const div = document.createElement('div')
        div.classList.add('dialog-content')

        const img = document.createElement('img')
        img.setAttribute('src', mediaList[currentIndex].mediaLink)

        const closeBtn = document.createElement('a')
        closeBtn.setAttribute('href', '')
        closeBtn.classList.add('fas', 'fa-times')
        closeBtn.addEventListener("click", (e) => {
            e.preventDefault()
            dialog.close()
        })

        const prevBtn = document.createElement('a')
        prevBtn.classList.add('fas', 'fa-angle-left')
        prevBtn.setAttribute('href', '')
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault()
        })

        const nextBtn = document.createElement('a')
        nextBtn.classList.add('fas', 'fa-angle-right')
        nextBtn.setAttribute('href', '')
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault()
        })

        const h2 = document.createElement('h2')
        h2.textContent = mediaList[currentIndex].title

        div.appendChild(img)
        div.appendChild(closeBtn)
        div.appendChild(nextBtn)
        div.appendChild(prevBtn)
        div.appendChild(h2)
        dialog.appendChild(div)
        
        return dialog
    }

    return { next, prev, getDOM }
}