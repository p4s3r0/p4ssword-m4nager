class Api::PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, only: [:update, :destroy]

  def index
    @passwords = current_user.passwords

    render json: @passwords
  end

  def create
    @password = current_user.passwords.build(password_params)

    if @password.save
      render json: @password, status: :created
    else
      render json: { errors: @password.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @password.update(password_params)
      render json: @password
    else
      render json: { errors: @password.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @password.destroy

    head :no_content
  end

  private

  def set_password
    @password = current_user.passwords.find(params[:id])
  end

  def password_params
    params.require(:password).permit(
      :name,
      :username,
      :email,
      :password,
      :url,
      :notes
    )
  end
end