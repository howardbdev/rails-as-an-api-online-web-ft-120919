class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.belongs_to :warehouse, null: false, foreign_key: true
      t.string :name
      t.string :item_type
      t.string :sku
      t.string :description

      t.timestamps
    end
  end
end
