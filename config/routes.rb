Rails.application.routes.draw do
  root 'weather#index'
  get 'data', to: 'weather#data'
end
