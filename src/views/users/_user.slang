/ user : User
li
  img src=user.avatar_path
  a href="/users/#{user.id}"
    = user.name
  - if current_user!.admin? && !current_user?(user)
    == link_to "(delete)", destroy_user_path(user.id), "data-method": :delete, "data-confirm": "You sure?"
