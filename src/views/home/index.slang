- if signed_in?
  .row
    aside.col-md-4
      section.user_info
        == render partial: "shared/_user_info.slang"
      section.stats
        == render partial: "shared/_stats.slang"
      section.microposts_form
        == render partial: "shared/_micropost_form.slang"
    .col-md-8
      h3 Micropost Feed
      == render partial: "shared/_feed.slang"
- else
  .center.jumborton
    h1 Welcome to the Sample App
    h2
      | This is the home page for the Jennifer + Amber sample application.
    a.btn.btn-lg.btn-primary href=sign_up_path
      | Sign up now!
  a href="https://crystal-lang.org/"
    img src="#{image_path("crystal_logo.png")}" alt="Crystal logo" height="80" width="80"