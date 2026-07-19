class Api::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    if resource.save
      if resource.active_for_authentication?
        sign_up(resource_name, resource)

        render json: {
          message: 'Signed up successfully.',
          user: user_json(resource)
        }, status: :created
      else
        expire_data_after_sign_in!

        render json: {
          message: "Signed up but #{resource.inactive_message}"
        }, status: :ok
      end
    else
      clean_up_passwords(resource)
      set_minimum_password_length

      render json: {
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    resource.destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    render json: {
      message: "Account deleted successfully."
    }, status: :ok
  end

  protected

  def set_flash_message(key, kind, options = {})
  end

  def set_flash_message!(key, kind, options = {})
  end

  private

  def user_json(user)
    {
      id: user.id,
      email: user.email,
      username: user.username,
      session_token: user.session_token
    }
  end

  def sign_up_params
    params.require(:user).permit(
      :email,
      :password,
      :password_confirmation,
      :username
    )
  end
end