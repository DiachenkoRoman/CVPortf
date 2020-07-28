function displayImages(images = [], imagesList) {
    imagesList.innerHTML = images.map(image => {
        return `
            <li>
                <figure>
                    <img src=${image.url} alt="">
                    <figcaption>
                        <p contenteditable>${image.name}</p>
                        <p>${image.size}</p>
                    </figcaption>
                </figure>
                <button id="removeButton" data-index= ${image.index}>Delete</button>
            </li>
        `
    }).join("")
    //Кери селектор здесь надо, чтобы присвоить событие клика  deleteImages на кнопку Delete
    let delButs = document.querySelectorAll("button")
    delButs.forEach(element => element.addEventListener("click", deleteImages))
}
