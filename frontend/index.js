document.addEventListener("DOMContentLoaded", init)

function init() {
  getWarehouses()
}

function getWarehouses() {
  // what does fetch return???  a promise
  fetch("http://localhost:3000/warehouses")
    .then(resp => resp.json())
    .then(console.log)
}
