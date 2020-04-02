Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :items
      resources :warehouses
    end
  end

  # constraints subdomain: 'api' do
  #   resources :items, only: [:index]
  # end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
