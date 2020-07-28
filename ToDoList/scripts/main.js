const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];
let modWin = document.querySelector(".modal");
let editInput = document.querySelector(".edit-input");
let saveButt = document.querySelector(".save-butt");

function addItem(event) {
    event.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false
    }
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    displayData(items, itemsList);
    this.reset();
}

function displayData(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
            <li>
                <input type='checkbox' data-index=${index} id='item${index}' ${plate.done ? 'checked' : ''} />
                <label for='item${index}'>[${plate.text}]</label>
                <div id="${index}" class="edit-item">[Edit]</div> / <div id="${index}" class="delete-item">[Delete]</div>
            </li>
        `
    }).join('');
    let edBut = document.querySelectorAll(".edit-item");
    edBut.forEach(elem =>{ elem.addEventListener("click", editTodo)})
    let delBut = document.querySelectorAll(".delete-item");
    delBut.forEach(elem => { elem.addEventListener("click", deleteTodo)})
}


function toggleDone(event) {
    if(!event.target.matches('input')) return;
    const index = event.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    displayData(items, itemsList);
}

function editTodo(){
    modWin.style.display= "block";
    editInput.value= items[this.id].text;
    saveButt.id = this.id
    saveButt.addEventListener("click", saveChanges)
}

function deleteTodo(){
    items.splice([this.id], 1);
    localStorage.setItem('items', JSON.stringify(items));
    this.parentNode.remove()
}

function saveChanges(){
    let labelStr = document.querySelector("[for=item"+this.id+"]");
    labelStr.innerText= "["+editInput.value+"]"
    items[this.id].text = editInput.value;
    localStorage.setItem('items', JSON.stringify(items));
    modWin.style.display = "none";
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone)


displayData(items, itemsList);
