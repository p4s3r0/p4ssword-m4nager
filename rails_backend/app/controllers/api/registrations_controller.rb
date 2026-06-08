# frozen_string_literal: true

class Api::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :username)
  end

  public

    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        render json: {
          message: 'Signed up successfully.',
          user: resource
        }, status: :created
      else
        expire_data_after_sign_in!
        render json: {
          message: "Signed up but #{resource.inactive_message}"
        }, status: :ok
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render json: {
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
