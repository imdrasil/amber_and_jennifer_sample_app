.row
  aside.col-md-4
    section
      h1
        img src=user.avatar_path
        = user.name
    section.stats
      == render partial: "shared/_stats.slang"
  .col-md-8
    - if signed_in?
      == render partial: "_follow_form.slang"
    - if microposts.any?
      h3 Microposts #{microposts.size}
      ol.microposts
        - microposts.each do |micropost|
          == render partial: "shared/_micropost.slang"
        == paginate(microposts, user_path(user.id))
