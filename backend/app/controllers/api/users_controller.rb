class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def set_theme
    if current_user.update(theme: theme_param)
      render json: current_user.theme
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def get_theme
    render json: current_user.theme
  end

  def destroy_all_sessions
    current_user.invalidate_all_sessions!
    render json: { message: "All sessions destroyed" }, status: :ok
  end

  private

  def theme_param
    theme = params[:theme].to_s

    return %w[light dark system].include?(theme) ? theme : "system"
  end

end