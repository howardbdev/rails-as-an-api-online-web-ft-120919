# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Warehouse.create(
  name: "Not Bob's Warehouse"
)
Item.create([
    {
      name: "Coffee",
      item_type: "Coffee",
      sku: "12k3haf32hru3",
      warehouse: Warehouse.first,
      description: "never enough coffee"
    },
    {
      name: "More Coffee",
      item_type: "Coffee again",
      sku: "12k3haf32aadf829379873hru3",
      warehouse: Warehouse.first,
      description: "never enough coffee, still..."
    },
    {
      name: "Blueberry Bagels",
      item_type: "Bagel",
      sku: "yummm234234234",
      warehouse: Warehouse.first,
      description: "lotsa cream cheese and toasted if you please"
    }
  ])
