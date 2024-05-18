let itemsList = [];
let itemToEdit;

const form = document.querySelector('#form-itens');
const input = document.querySelector('#receber-item');
const ulItems = document.querySelector('#lista-de-itens');
const ulBoughtItems = document.querySelector('#itens-comprados')
const recoveredList = localStorage.getItem('itemsList'); 

form.addEventListener('submit', (submit) => {
    submit.preventDefault();
    toSaveItem();
});

function saveInLocalStorage(){
    localStorage.setItem("itemsList", JSON.stringify(itemsList));
}

if(recoveredList){
    itemsList = JSON.parse(recoveredList);
    toShowItem();
}



function toSaveItem() {
    const verification = itemsList.some((item) => item.itemValue.toLowerCase() === input.value.toLowerCase());
    
    if(verification) {
        alert("Esse item já existe")
    } else {
        itemsList.push({
            itemValue: input.value,
            checked: false
        })
        input.value = ""

        toShowItem();
    }
}

function toShowItem(){
    ulItems.innerHTML = "";
    ulBoughtItems.innerHTML = "";
    
    itemsList.forEach((element, index) =>{
        if(element.checked === true){
            ulBoughtItems.innerHTML += `<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
            <input type="checkbox" checked class="is-clickable" />  
            <span class="itens-comprados is-size-5">${element.itemValue}</span>
            </div>
            <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>`
        }
        else{
            ulItems.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
            <input type="checkbox" class="is-clickable" />
            <input type="text" class="is-size-5" value="${element.itemValue}" ${index != Number(itemToEdit)? "disabled" : ""}></input>
            </div>
            <div>
            ${index === Number(itemToEdit)?'<i class="fa-regular fa-floppy-disk is-clickable" onclick="editItem()"></i>' :'<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
            <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
            </li>`    
        }
    })
    
    const checkboxInput = document.querySelectorAll('[type="checkbox"]');
    
    checkboxInput.forEach(element => {
        element.addEventListener('click', (click) =>{
            let itemIndex = click.target.parentElement.parentElement.getAttribute('data-value');
            itemsList[itemIndex].checked = click.target.checked;
            toShowItem();
        })
    })
    const toDelete = document.querySelectorAll('.deletar');
    
    
    toDelete.forEach(element => {
        element.addEventListener('click', (click) =>{
            let itemIndex = click.target.parentElement.parentElement.getAttribute('data-value');
            itemsList.splice(itemIndex, 1)
            toShowItem();
        })
    })
    
    const editedItems = document.querySelectorAll('.editar');
    
    editedItems.forEach(element => {
        element.addEventListener('click', (click) =>{
            itemToEdit = click.target.parentElement.parentElement.getAttribute('data-value');
            console.log(itemToEdit)
            toShowItem();
        })
    })
    saveInLocalStorage();
}

function editItem (){
    const editedItem = document.querySelector(`[data-value="${itemToEdit}"] input[type="text"]`);
    itemsList[itemToEdit].itemValue = editedItem.value;
    itemToEdit = -1;
    console.log(itemsList)
    toShowItem()
}


