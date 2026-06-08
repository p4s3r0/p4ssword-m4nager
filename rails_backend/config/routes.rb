Rails.application.routes.draw do
  namespace :api do
    get "up" => "rails/health#show", as: :rails_health_check

    devise_for :users, controllers: {
      sessions: 'api/sessions',
      registrations: 'api/registrations'
    }, defaults: { format: :json }

    resources :folders, only: [ :index, :create, :destroy, :update ]
    resources :passwords, only: [ :index, :create, :destroy, :update ]
    resources :two_fa, only: [ :index, :create, :destroy, :update ]
  end
end