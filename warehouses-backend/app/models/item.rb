class Item < ApplicationRecord
  belongs_to :warehouse

  validates :name, :item_type, :sku, presence: true
end
