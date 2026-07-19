# frozen_string_literal: true

class Api::SessionsController < Devise::SessionsController
  respond_to :json

  skip_before_action :verify_signed_out_user, only: :destroy

  def create
    username = params.dig(:user, :username) || params[:username]
    password = params.dig(:user, :password) || params[:password]

    user = User.find_by(username: username)

    if user&.valid_password?(password)
      sign_in(:user, user)

      token = SessionToken.create!(user: user, token: SecureRandom.hex(32))

      render json: { user: user_json(user, token.token) }, status: :ok
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def refresh
    username = params[:username]
    user = User.find_by(username: username)

    if user && user.session_tokens.exists?(token: params[:session_token])
      sign_in(:user, user)
      render json: { user: user_json(user, params[:session_token]) }, status: :ok
    else
      render json: { error: "Invalid session" }, status: :unauthorized
    end
  end

  def destroy
    if current_user && params[:session_token]
      current_user.session_tokens.find_by(token: params[:session_token])&.destroy
    end
    sign_out(resource_name)
    reset_session

    render json: {
      message: "Logged out successfully."
    }, status: :ok
  end

  protected

  def set_flash_message(key, kind, options = {})
  end

  def set_flash_message!(key, kind, options = {})
  end

  private

  def require_no_authentication
    return false
  end

  def user_json(user, token)
    {
      id: user.id,
      email: user.email,
      username: user.username,
      session_token: token
    }
  end
end