require "view_model"

class CustomFormBuilder < ViewModel::FormBuilder
  private def field_class(name)
    super + " form-control"
  end
end

ViewModel.default_form_builder = CustomFormBuilder
