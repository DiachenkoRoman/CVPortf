//Удаление, которое я изначально задумывал реализовать с помощью this
function deleteImages() {
    //Пересобирание localStorage с помощью сплайс
    let renArr = JSON.parse(localStorage.getItem("imgs"))
    renArr.splice(this.getAttribute("data-index"), 1)
    localStorage.setItem("imgs", JSON.stringify(renArr))
    //Удаление элемента из DOM
    this.parentElement.remove()

    //Я был близок к реализации через фильтр :D
    // JSON.parse(localStorage.getItem("imgs")).filter(elem => {
    //     if(elem.index == this.getAttribute("data-index")){
    //         console.log(elem)
    //     }})
}
