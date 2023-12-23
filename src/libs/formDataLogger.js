export function logFormData(formElement) {
    const formData = new FormData(formElement)

    formData.forEach((value, key) => {
        console.log(key, "   => ", value)
    })

}