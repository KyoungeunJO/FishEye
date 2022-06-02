function displayModal(name) {
    const title = document.getElementById('title')
    title.textContent = name
    
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("closing", "")
    modal.addEventListener("animationend", () => {
        modal.removeAttribute("closing")
        modal.style.display = "none"
    },
    {once: true}
    )
}


// Display photographer's name
// function modal