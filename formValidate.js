const formValidate = e => {
    e.preventDefault()
    const dialog = document.querySelector("dialog")
    let result = true
    const inputs = e.target.querySelectorAll("input")

    const errorTextClass = "errorText"
    const errorClass = "error"

    const createError = (input, text) => {
        const parent = input.parentNode
        const errorLabel = document.createElement("label")

        errorLabel.classList.add(errorTextClass)
        errorLabel.textContent = text
        parent.classList.add(errorClass)
        parent.appendChild(errorLabel)
    }

    const removeError = input => {
        const parent = input.parentNode

        if (parent.classList.contains(errorClass)) {
            parent.querySelector(`.${errorTextClass}`).remove()
            parent.classList.remove(errorClass)
        }
    }

    for (const input of inputs) {
        removeError(input)

        if (input.dataset.required) {
            if (input.value == "") {
                createError(input, "Поле не заполнено")
                result = false
            }
        }
    }

    if (result) {
        dialog.showModal()
        setTimeout(() => {
            dialog.close()
        }, 2500)
    }
}

document.getElementById("form").addEventListener("submit", formValidate)
