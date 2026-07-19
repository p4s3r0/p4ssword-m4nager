require "test_helper"

class ApiRegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "registering returns a persisted session token" do
    username = "register_#{SecureRandom.hex(4)}"

    post "/api/users",
         params: {
           user: {
             email: "#{username}@example.com",
             username: username,
             password: "password123",
             password_confirmation: "password123"
           }
         },
         as: :json

    assert_response :created

    body = JSON.parse(response.body)
    token = body.dig("user", "session_token")

    assert token.present?
    assert SessionToken.exists?(token: token, user: User.find_by!(username: username))
  end

  test "registering preserves username case" do
    username = "RegisterCase#{SecureRandom.hex(4)}"

    post "/api/users",
         params: {
           user: {
             email: "#{username.downcase}@example.com",
             username: username,
             password: "password123",
             password_confirmation: "password123"
           }
         },
         as: :json

    assert_response :created

    body = JSON.parse(response.body)

    assert_equal username, body.dig("user", "username")
    assert User.exists?(username: username)
  end
end
