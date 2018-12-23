== form action: microposts_path, method: :post do
  == csrf_tag
  .field
    == text_area name: :content, content: "", placeholder: "Compose new micropost...", size: "30x10"
  button.btn.btn-primary type="submit" Post
  span.picture
    / == file_field name: :picture
