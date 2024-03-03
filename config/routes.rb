Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }

  resources :messages
  resources :rooms

  authenticated :user do
    root to: 'rooms#index', as: :authenticated_root
  end

  root to: redirect('/users/sign_in'), constraints: ->(request) { !request.env['warden'].user }
end
