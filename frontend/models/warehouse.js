class Warehouse {
  static all = []

  constructor(attributes) {
    this.id = attributes.id
    this.name = attributes.name
    this.save()
  }

  renderEditForm(){
    return (`
              <form class="edit-warehouse-form" action="index.html" method="post">
                <input id="edit-warehouse-name-input-${this.id}" type="text" name="name" value="${this.name}"><br>
                <input class="edit-warehouse-form-submit-button" data-id="${this.id}" type="submit" name="" value="Edit ${this.name}"><br>
              </form>
              <button class="delete-warehouse-button" data-id="${this.id}">Delete</button>
            `)
    }

    static find(id) {
      debugger
      return this.all.find(warehouse => parseInt(id) === parseInt(warehouse.id))
    }


}