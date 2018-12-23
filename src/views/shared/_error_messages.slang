/ errors : Jennifer::Model::Errors+

#error_explanation
  .alert.alert-danger
    | The form contains #{pluralize(errors.size, "error")}.
  ul
    - errors.full_messages.each do |message|
      li = message
