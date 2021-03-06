class Api::V1::ItemsController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]

  # GET /items
  def index
    @items = Item.all

    render json: @items, status: :ok
  end

  # GET /items/1
  def show
    render json: @item, status: :ok
  end

  # POST /items
  def create
    @item = Item.new(item_params)

    if @item.save
      render json: @item, status: :created, location: @item
    else
      render json: error_json(@item), status: :unprocessable_entity
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      render json: @item, status: :ok
    else
      render json: error_json(@item), status: :unprocessable_entity
    en
  end

  # DELETE /items/1
  def destroy
    @item.destroy
    render json: {
      message: "successfully destroyed #{@item.name}"
      },
      status: :exterminated
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:item).permit(:warehouse_id, :name, :item_type, :sku)
    end

    def error_json(item)
      {
        error: item.errors.full_messages.to_sentence
      }
    end
end
