module ViewHelper
  def pluralize(count, word)
    if count > 1
      "#{count} #{Inflector.pluralize(word)}"
    else
      "#{count} #{word}"
    end
  end
end
