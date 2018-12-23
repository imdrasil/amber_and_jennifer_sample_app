class HomeController < ApplicationController
  def index
    feed_items =
      if signed_in?
        current_user!.feed_query.paginate(page)
      else
        Pager::JenniferCollection(Micropost).empty
      end
    render("index.slang")
  end

  def about
    @page_title = t("about.title")
    render "about.slang"
  end
end
