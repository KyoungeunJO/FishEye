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

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()

    let fields = document.querySelectorAll('input')
    console.log(fields)
    let valid = true
    let response = 'Form sent \n'
    fields.forEach(i => {
        valid &= i.checkValidity()
    })
    if (valid) {
        fields.forEach(i => {
            response += `${i.name}: ${i.value} \n`
        })
        form.reset()
        console.log(response)
        closeModal()
    }
})