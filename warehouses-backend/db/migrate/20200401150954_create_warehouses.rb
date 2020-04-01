class CreateWarehouses < ActiveRecord::Migration[6.0]
  def change
    create_table :warehouses do |t|
      t.string :aisles
      t.string :name

      t.timestamps
    end
  end
end
