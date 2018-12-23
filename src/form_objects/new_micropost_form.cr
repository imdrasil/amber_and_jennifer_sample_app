class NewMicropostForm < FormObject::Base(Micropost)
  delegate id, to: resource

  attr :content, String
end
