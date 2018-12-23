h1 Password reset
.row
  .clo-md-6.col-md-offset-3
    == form action: password_reset_path(params[:id]), method: :patch do
      == csrf_tag
      - if form.errors.any?
        - errors = form.errors
        == render partial: "shared/_error_messages.slang"
      == hidden_field name: :email, value: form.email

      .form-group
        label Password
        input.form-control type="password" name="password"

      .form-group
        label Password confirmation
        input.form-control type="password" name="password_confirmation"

      button.btn.btn-primary Update password
