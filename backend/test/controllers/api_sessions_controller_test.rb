require "test_helper"

class ApiSessionsControllerTest < ActionDispatch::IntegrationTest
  test "signing in returns a persisted session token" do
    user = create_user

    post "/api/users/sign_in",
         params: {
           user: {
             username: user.username,
             password: "password123"
           }
         },
         as: :json

    assert_response :ok

    body = JSON.parse(response.body)
    token = body.dig("user", "session_token")

    assert token.present?
    assert SessionToken.exists?(token: token, user: user)
    assert_operator response.headers["Set-Cookie"].bytesize, :<, 4096
  end

  test "refreshing a session returns the same session token" do
    user = create_user
    token = SessionToken.create!(user: user, token: SecureRandom.hex(32)).token

    post "/api/users/refresh",
         params: {
           username: user.username,
           session_token: token
         },
         as: :json

    assert_response :ok

    body = JSON.parse(response.body)

    assert_equal token, body.dig("user", "session_token")
  end

  private

  def create_user(username = "login_#{SecureRandom.hex(4)}")
    User.create!(
      email: "#{username}@example.com",
      username: username,
      password: "password123",
      password_confirmation: "password123"
    )
  end
end
