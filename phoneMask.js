document.addEventListener("DOMContentLoaded", () => {
    const phoneInputs = document.querySelectorAll("input[data-tel-mask]")

    const getPhoneNumbersValue = input => input.value.replace(/\D/g, "")

    const phoneMask = e => {
        const ruCodes = ["7", "8", "9"]
        const input = e.target
        let inputNumbersValue = getPhoneNumbersValue(input)
        let formattedValue = ""
        let startCursor = input.selectionStart
        const countryCode = inputNumbersValue[0]

        if (!inputNumbersValue) input.value = ""

        if (input.value.length != startCursor) {
            if (e.data && /\D/g.test(e.data)) input.value = inputNumbersValue
            return
        }

        if (ruCodes.indexOf(countryCode) > -1) {
            // russian phone
            if (countryCode == "9") inputNumbersValue = `7${inputNumbersValue}`
            let firstSymbols = countryCode == "8" ? "8" : "+7"
            formattedValue = `${firstSymbols} `
            if (inputNumbersValue.length > 1) formattedValue += `(${inputNumbersValue.substring(1, 4)}`
            if (inputNumbersValue.length >= 5) formattedValue += `) ${inputNumbersValue.substring(4, 7)}`
            if (inputNumbersValue.length >= 8) formattedValue += `-${inputNumbersValue.substring(7, 9)}`
            if (inputNumbersValue.length >= 10) formattedValue += `-${inputNumbersValue.substring(9, 11)}`
        } else {
            // NOT russian phone
            formattedValue = `+${inputNumbersValue}`
        }
        input.value = formattedValue
    }

    const phoneKeyDown = e => {
        const input = e.target
        if (e.keyCode == 8 && getPhoneNumbersValue(input).length == 1) input.value = ""
    }

    const phonePaste = e => {
        const pasted = e.clipboardData || window.clipboardData
        const input = e.target
        let inputNumbersValue = getPhoneNumbersValue(input)

        if (pasted) {
            let pastedText = pasted.getData("Text")
            if (/\D/g.test(pastedText)) input.value = inputNumbersValue
        }
    }

    phoneInputs.forEach(phoneInput => {
        phoneInput.addEventListener("input", phoneMask)
        phoneInput.addEventListener("keydown", phoneKeyDown)
        phoneInput.addEventListener("paste", phonePaste)
    })
})
