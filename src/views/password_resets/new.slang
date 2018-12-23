h1 Forgot password

.row
  .col-md-6.col-md-offset-3
    == form action: password_reset_path do
      == csrf_tag
      .form-group
        label Email
        == text_field name: :email, class: "form-control"

      button.btn.btn-primary Submit
