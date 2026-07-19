class Api::FoldersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_folder, only: [:update, :destroy]

  def index
    @folders = current_user.folders
                           .left_joins(:passwords)
                           .select("folders.*, COUNT(passwords.id) AS passwords_count")
                           .group("folders.id")

    render json: @folders.as_json(methods: :passwords_count)
  end

  def create
    @folder = current_user.folders.build(folder_params)

    if @folder.save
      render json: @folder, status: :created
    else
      render json: { errors: @folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @folder.update(folder_params)
      render json: @folder
    else
      render json: { errors: @folder.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @folder = current_user.folders.find(params[:id])
    @passwords = @folder.passwords
    render json: { folder: @folder, passwords: @passwords }
  end

  def destroy
    @folder.destroy

    head :no_content
  end

  def passwords
    @folder = current_user.folders.find(params[:id])
    @passwords = @folder.passwords
    render json: @passwords.map { |password|
      password.as_json.merge(
        folder: {
          color: @folder.color,
          name: @folder.name
        }
      )
    }
  end

  private

  def set_folder
    @folder = current_user.folders.find(params[:id])
  end

  def folder_params
    params.require(:folder).permit(
      :name,
      :username,
      :color,
      :starred
    )
  end
end