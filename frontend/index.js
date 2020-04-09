document.addEventListener("DOMContentLoaded", init)

const baseURL = "http://localhost:3000/api/v1"
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
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
  warehousesUL().addEventListener("click", handleWarehouseULClick)
}

function handleWarehouseULClick(event) {
  if (event.target.className == "edit-button") {
    // target the div that contains the warehouse name
    // replace it with an edit form
    const id = event.target.dataset.id
    const warehouse = Warehouse.find(id)
    const name = event.target.parentElement.firstElementChild.innerText
    const div = document.getElementById(`warehouse-li-div-${id}`)

    const editForm = warehouse.renderEditForm()

    div.innerHTML = editForm
  } else if (event.target.className === "edit-warehouse-form-submit-button") {
    event.preventDefault()
    updateWarehouse(event.target.dataset.id)
  } else if (event.target.className === "delete-warehouse-button") {
    console.log("id is", event.target.dataset.id)
    deleteWarehouse(event.target.dataset.id)
  }
}

function deleteWarehouse(id) {
  fetch(`${baseURL}/warehouses/${id}`, {
    method: "DELETE",
    headers
  })
    .then(resp => resp.json())
    .then(responseJSON => {
      if (responseJSON.error) {
        throw new Error(responseJSON.error)
      } else {
        getWarehouses()
      }
    })
    .catch(alert)
}

function updateWarehouse(id) {
  // to update a warehouse, I need to know:
  // 1. Which warehouse?  - warehouse id
  //   - from the argument
  // 2. Information I'm sending to update (name)
  //   - target the proper input using its html id attribute and the incoming id
  const name = document.getElementById(`edit-warehouse-name-input-${id}`).value

  // put together the "params" as the body
  const body = {
    warehouse: {
      name
    }
  }

  fetch(`${baseURL}/warehouses/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body)
  })
    .then(resp => resp.json())
    .then(responseJSON => {
      if (responseJSON.error) {
        throw new Error(responseJSON.error)
      } else {
        getWarehouses()
      }
    })
    .catch(alert)
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
    .then(responseJSON => {
      if (responseJSON.error) {
        throw new Error(responseJSON.error)
      } else {
        getWarehouses()
      }
    })
    .catch(alert)
}

async function getWarehouses() {
  // what does fetch return???  a promise
  const response = await fetch("http://localhost:3000/api/v1/warehouses")
  try {
    const warehousesJSON = await response.json()
    updateIndexDiv(warehousesJSON)

  } catch {
    alert("something went wrong...")
  }
  //oldFetch()
}

// function oldFetch() {
//
//   fetch("http://localhost:3000/api/v1/warehouses")
//     .then(resp => {
//       return resp.json()
//     })
//     .then((r) => {
//       updateIndexDiv(r)
//     })
//     .catch(alert)
// }

function updateIndexDiv(warehousesJSON) {
  // cycle though the array of warehouse objects
  // add them to the DOM -- into the index div ul
  warehousesUL().innerHTML = ""
  warehousesJSON.forEach(warehouseJSON => {
    // create the HTML
    const newWarehouse = new Warehouse(warehouseJSON)
    // append it to the ul
    warehousesUL().innerHTML += newWarehouse.renderLI()
  })
}
