h1 Sign up

p.text-xs-center
  == link_to("Have an account?", "/sign_in")

.row
  .col-md-6.col-md-offset-3
    - if user.errors.any?
      - errors = user.errors
      == render partial: "shared/_error_messages.slang"

    == form action: sign_up_path, method: "post" do
      == csrf_tag
      .form-group
        label Name
        == text_field name: "name", class: "form-control"
      .form-group
      fieldset.form-group
        label Email
        input.form-control type="email" name="email"
      .form-group
        label Password
        input.form-control type="password" name="password"
      fieldset.form-group
        label Confirmation
        input.form-control type="password" name="password_confirmation"

      button.btn.btn-lg.btn-primary.pull-xs-right type="submit" Sign Up
