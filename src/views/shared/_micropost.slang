/ micropost : Micropost

- user = micropost.user!
li id="micropost-#{micropost.id}"
  a href="#{user_path(user.id)}"
    img src=user.avatar_path
  span.user
    == link_to user.name, user_path(user.id)
  span.content
    = micropost.content
  span.timestamp
    | Posted at #{l(micropost.created_at!)}.
    - if current_user?(user)
      == link_to "delete", destroy_micropost_path(micropost.id), "data-method": "delete", "data-confirm": "Are you sure?", class: "btn btn-danger xs"
