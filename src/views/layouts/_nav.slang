nav.navbar.navbar-defaul.navbar-fixed-top.navbar-inverse
  .container-fluid
    .navbar-header
      button.navbar-toggle.collapsed data-toggle="collapse" data-target="#navbar" aria-controls="navbar"
        span.sr-only Toggle navigation
        span.icon-bar
        span.icon-bar
        span.icon-bar
      == link_to "sample app", root_path, id: "logo", class: "navbar-brand"
    #navbar.navbar-collapse.collapse aria-expanded="false"
      ul.nav.navbar-nav.navbar-right
        li == link_to "Home", root_path
        li == link_to "About", about_path
        - if signed_in?
          li == link_to "Users", users_path
          li.dropdown
            a.dropdown-toggle href="#" data-toggle="dropdown" role="button" aria-haspopup="true"
              | Account
              b.caret
            ul.dropdown-menu.inverse-dropdown
              li == link_to "Profile", user_path(current_user!.id)
              li == link_to "Settings", user_edit_path(current_user!.id)
              li.divider role="separator"
              li == link_to "Log out", logout_path
        - else
          li == link_to "Sign in", sign_in_path
