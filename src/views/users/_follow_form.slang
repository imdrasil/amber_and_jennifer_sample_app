/ user : User

- unless current_user?(user)
  #follow_form
    - if current_user!.following?(user)
      == render partial: "_unfollow.slang"
    - else
      == render partial: "_follow.slang"
