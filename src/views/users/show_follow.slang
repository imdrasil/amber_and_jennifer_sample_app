.row
  aside.col-md-4
    section.user_info
      img src=this_user.avatar_path
      h1 = this_user.name
      span
        == link_to "view my profile", user_path(this_user.id)
      span
        b Microposts:
        = this_user.microposts_query.count
    section.stats
      == render partial: "shared/_stats.slang"
      - if users.any?
        .user_avatars
          - users.each do |user|
           a href="#{user_path(user.id)}"
            img src=user.avatar_path
  .col-md-8
    h3 = @page_title
    - if users.any?
      ul.users.follow
        - users.each do |user|
          == render partial: "_user.slang"
      == paginate(users, current_path)