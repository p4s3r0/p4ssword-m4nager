class Api::TfasController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tfa, only: [:update, :destroy]

  def index
    @tfas = current_user.tfas

    render json: @tfas
  end

  def create
    @tfa = current_user.tfas.build(tfa_params)

    if @tfa.save
      render json: @tfa, status: :created
    else
      render json: { errors: @tfa.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @tfa.update(tfa_params)
      render json: @tfa
    else
      render json: { errors: @tfa.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @tfa.destroy

    head :no_content
  end

  private

  def set_tfa
    @tfa = current_user.tfas.find(params[:id])
  end

  def tfa_params
    params.require(:tfa).permit(
      :name,
      :algorithm,
      :enc_secret,
      :user
    )
  end
end