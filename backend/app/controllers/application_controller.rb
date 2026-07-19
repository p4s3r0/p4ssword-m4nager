class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ActionController::Cookies

  private

  def authenticate_user!
    return true if user_signed_in?

    render json: {
      error: "You need to sign in or sign up before continuing."
    }, status: :unauthorized
  end

  def current_user
    raw_user = warden&.user(:user)

    @current_user ||=
      case raw_user
      when User
        raw_user
      when Hash
        User.find_by(id: raw_user["id"] || raw_user[:id])
      else
        nil
      end
  end

  def user_signed_in?
    warden&.authenticated?(:user)
  end

  def warden
    request.env["warden"]
  end
end