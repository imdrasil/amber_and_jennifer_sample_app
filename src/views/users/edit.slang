.row
  .col-md-6.col-md-offset-3
    .gravatar_edit
      img src=user.avatar_path
    == form action: user_path(user.id), method: "patch" do
      - if form.errors.any?
        - errors = form.errors
        == render partial: "shared/_error_messages.slang"
      == csrf_tag
      .form-group
        label Name
        == text_field name: :name, value: form.name, class: "form-control"
      .form-group
        label Email
        == text_field name: :email, value: form.email, class: "form-control"
      / .form-group
      /   label Password
      /   input.form-control type="password"
      / .form-group
      /   label Confirmation
      /   input.form-control type="password"

      button.btn.btn-primary type="submit" Save changes
