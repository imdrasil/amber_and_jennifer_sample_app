a href="#{user_path(current_user!.id)}"
  img stc=current_user!.avatar_path
h1 = current_user!.name
span
  == link_to "view my profile", user_path(current_user!.id)
span
  == pluralize(current_user!.microposts_query.count, "micropost")
