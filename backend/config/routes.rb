Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    get "up" => "rails/health#show", as: :rails_health_check

    devise_scope :api_user do
      post 'users/refresh', to: 'sessions#refresh'
    end

    devise_for :users, controllers: {
      sessions: 'api/sessions',
      registrations: 'api/registrations'
    }

    resources :folders, only: [ :index, :create, :destroy, :update, :show ] do
      get :passwords, on: :member
    end
    resources :passwords, only: [ :index, :create, :destroy, :update ]
    resources :tfas, only: [ :index, :create, :destroy, :update ]
    resources :users do
      get :get_theme, on: :collection
      put :set_theme, on: :collection
      delete :destroy_all_sessions, on: :collection
    end
  end
end