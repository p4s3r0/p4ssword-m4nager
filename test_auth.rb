require 'net/http'
require 'json'
require 'uri'

base_url = 'http://localhost:3000/api'
username = 'test_user_' + rand(1000).to_s
password = 'password123'
email = "test_#{rand(1000)}@example.com"

def post_request(url, body, cookies = nil)
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Post.new(uri.path, { 'Content-Type' => 'application/json', 'Accept' => 'application/json' })
  request.body = body.to_json
  request['Cookie'] = cookies if cookies
  http.request(request)
end

def get_request(url, cookies = nil)
  uri = URI.parse(url)
  http = Net::HTTP.new(uri.host, uri.port)
  request = Net::HTTP::Get.new(uri.path, { 'Accept' => 'application/json' })
  request['Cookie'] = cookies if cookies
  http.request(request)
end

# 1. Register
puts "Registering user: #{username}"
reg_response = post_request("http://localhost:3000/api/users", { user: { username: username, email: email, password: password, password_confirmation: password } })
puts "Registration response: #{reg_response.code} #{reg_response.body}"

# 2. Login
puts "\nLogging in..."
login_response = post_request("http://localhost:3000/api/users/sign_in", { user: { username: username, password: password } })
puts "Login response: #{login_response.code} #{login_response.body}"

all_cookies = login_response.get_fields('set-cookie')
if all_cookies
  cookies = all_cookies.map { |c| c.split(';').first }.join('; ')
  puts "Cookies received: #{cookies}"
else
  puts "No cookies received!"
end

# 3. Access Passwords
puts "\nAccessing passwords..."
passwords_response = get_request("#{base_url}/passwords", cookies)
puts "Passwords response: #{passwords_response.code} #{passwords_response.body}"

if passwords_response.code == '200'
  puts "\nSUCCESS: Session persisted!"
else
  puts "\nFAILURE: Session did not persist!"
end
