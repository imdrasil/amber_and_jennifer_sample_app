/ feed_items : Jennifer::PageContainer(Micropost)

- if feed_items.any?
  ol.microposts
    - feed_items.each do |micropost|
      == render partial: "shared/_micropost.slang"
  == paginate(feed_items, root_path)