class FormObject::Base(T)
  def self.human_attribute_name(attr)
    User.human_attribute_name(attr)
  end

  def self.all
    T.all
  end

  def new_record?
    resource.new_record?
  end

  def changed?
    resource.changed?
  end
end
