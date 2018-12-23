USER_DATA = [
  {
    "email" => "admin@example.com",
    "name" => "Application Admin",
    "admin" => true
  },
  {
    "email" => "test1@example.com",
    "name" => "Test User 1"
  }
]

def create_user(data, password, activation_token)
  User.new.tap do |user|
    user.email = data["email"].as(String)
    user.name = data["name"].as(String)
    user.admin = (data["admin"]? || false).as(Bool)
    user.password_digest = Crypto::Bcrypt::Password.create(password, cost: Crypto::Bcrypt::DEFAULT_COST).to_s
    user.activation_digest = Crypto::Bcrypt::Password.create(activation_token).to_s
    user.activated = true
    user.activated_at = 1.day.ago
  end.save!
end

Sam.namespace "db" do
  task "seed" do
    password = "123"
    activation_token = "asd"
    USER_DATA.each do |opts|
      create_user(opts, password, activation_token) unless User.where { _email == opts["email"] }.exists?
    end
  end
end
