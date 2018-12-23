.row
  .col-md-6.offset-md-3.col-xs-12
    == form action: sign_in_path, method: "post" do
      == csrf_tag
      .form-group
        label Email
        input.form-control type="email" name="email"

      .form-group
        label Password
        == link_to "(forgot password)", new_password_reset_path
        input.form-control type="password" name="password"

      button.btn.btn-primary type="submit" Log in

    p
      | New user?
      a href==sign_up_path Sign up now
