class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  private

  def authenticate_user!
    if warden.authenticated?(:user)
      # No-op, super isn't needed if we handle it ourselves via warden
    else
      render json: { error: 'You need to sign in or sign up before continuing.' }, status: :unauthorized
    end
  end

  def current_user
    warden.user(:user)
  end

  def user_signed_in?
    warden.authenticated?(:user)
  end

  def warden
    request.env['warden']
  end
end
