h1 All users
ul.users
  - users.each do |user|
    == render partial: "_user.slang"

== paginate(users, users_path)
