document.addEventListener("DOMContentLoaded", init)

const baseURL = "http://localhost:3000/api/v1"
const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}

// using functions here so that elements will reliably be there when referenced,
// while retaining global scope
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
    const id = event.target.dataset.id
    const warehouse = Warehouse.find(id)
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
  // fetch(`${baseURL}/warehouses/${id}`, {
  //   method: "DELETE",
  //   headers
  // })
  // .then(resp => resp.json())
  Api.delete(`/warehouses/${id}`)
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
  const warehouseData = {
    warehouse: {
      name
    }
  }

  Api.patch(`/warehouses/${id}`, warehouseData)
    .then(responseJSON => {
      if (responseJSON.error) {
        throw new Error(responseJSON.error)
      } else {
        // getWarehouses() //TODO: pick up here
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

  Api.post("/warehouses", warehouseData)
    .then(responseJSON => {
      if (responseJSON.error) {
        throw new Error(responseJSON.error)
      } else {
        getWarehouses()
      }
    })
    .catch(alert)
}

// using async/await on this function just for demo -- you are welcome to use async/await or stick with only .then() -- totally up to you!
async function getWarehouses() {
  // what does fetch return???  a promise.. we can use .then() or async/await (or even a combo of both!) to handle a promise
  const warehousesJSON = await Api.get("/warehouses")
  try {
    loadIndexDiv(warehousesJSON)
  } catch(error) {
    alert(error)
  }
}

function loadIndexDiv(warehousesJSON) {
  // cycle though the array of warehouse objects
  // add them to the DOM -- into the index div ul
  warehousesUL().innerHTML = ""
  warehousesJSON.forEach(warehouseJSON => {
    // use the Warehouse class to make a new Warehouse object on the frontend with every JS object in the response array
    const newWarehouse = new Warehouse(warehouseJSON)
    // use the .renderLI() to create the HTML
    // then append it to the ul
    // you can also use .insertAdjacentHTML instead of .innerHTML +=
    // insertAdjacentHTML is more versatile and has some other benefits too
    warehousesUL().innerHTML += newWarehouse.renderLI()
  })
}
