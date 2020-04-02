document.addEventListener("DOMContentLoaded", init)

const baseURL = "http://localhost:3000/api/v1"
const warehousesUL = () => document.getElementById("warehouses-index-ul")
const wareHouseForm = () => document.getElementById("new-warehouse-form")
const newWarehouseFormNameInput = () => document.getElementById("new-warehouse-name-input")

function init() {
  getWarehouses()
  attachListeners()
}

function attachListeners() {
  wareHouseForm().addEventListener("submit", createWarehouse)
  wareHouseForm().addEventListener("submit", createWarehouse)
  warehousesUL().addEventListener("click", loadEditForm)
}

function loadEditForm(event) {
  if (event.target.className == "edit-button") {
    // target the div that contains the warehouse name
    // replace it with an edit form
    const id = event.target.dataset.id
    const name = event.target.parentElement.firstElementChild.innerText
    const div = document.getElementById(`warehouse-li-div-${id}`)
    const editForm = renderEditForm(id, name)
    div.innerHTML = editForm
  }
}

function createWarehouse(event) {
  event.preventDefault()
  // gather the information I need to create a warehouse
  // put it together into an object (which will become the body of my request, which becomes params according to Rails once it reaches the back end)
  const name = newWarehouseFormNameInput().value
  const warehouseData = {
    warehouse: {
      name
    }
  }
  fetch(`${baseURL}/warehouses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(warehouseData)
  })
    .then(resp => resp.json())
    .then(console.log)
}

function getWarehouses() {
  // what does fetch return???  a promise
  fetch("http://localhost:3000/api/v1/warehouses")
    .then(resp => resp.json())
    .then(updateIndexDiv)
}

function updateIndexDiv(warehousesJSON) {
  // cycle though the array of warehouse objects
  // add them to the DOM -- into the index div ul
  warehousesJSON.forEach(warehouseJSON => {
    // create the HTML
    const wareHouseLI = `
      <li>
        <div id="warehouse-li-div-${warehouseJSON.id}" data-id="${warehouseJSON.id}">
          <p>${warehouseJSON.name}</p>
        </div>
        <button class="edit-button" data-id="${warehouseJSON.id}">Edit</button>
      </li>
      `
    // append it to the ul
    warehousesUL().innerHTML += wareHouseLI
  })
}

function renderEditForm(id, name){
  return (`
    <form class="edit-warehouse-form" action="index.html" method="post">
      <input class="edit-warehouse-name-input" type="text" name="name" value="${name}"><br>
      <input type="submit" name="" value="Edit Warehouse"><br>
    </form>
  `)
}
