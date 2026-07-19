class Api::PasswordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_password, only: [:update, :destroy]

  def index
    @passwords = current_user.passwords.includes(:folder)

    render json: current_user.passwords.includes(:folder).as_json(
      include: {
        folder: {
          only: [ :id, :name, :color ]
        }
      }
    )
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
      :enc_username,
      :enc_password,
      :url,
      :notes,
      :folder_id,
      :enc_note,
      :starred
    )
  end
end