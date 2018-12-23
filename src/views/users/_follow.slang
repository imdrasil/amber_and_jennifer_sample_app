/ user : User

== form action: relationships_path, method: "post" do
  == csrf_tag
  div
    == hidden_field name: :followed_id, value: user.id
    button.btn.btn-primary type="submit" Follow
