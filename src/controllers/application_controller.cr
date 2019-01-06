require "./concerns/*"

class ApplicationController < Amber::Controller::Base
  include ViewModel
  include RouterHelper
  include SessionHelper

  LAYOUT = "application.slang"

  @page_title : String? = nil

  macro page(klass, *args)
    {{klass}}.new({{args.splat}}{% if args.size > 0 %},{% end %} context, flash, current_user, @page_title).render
  end

  def current_user
    context.current_user
  end

  private def redirect_back
    redirect_to request.headers["Referer"]? || root_path
  end

  private def log_in(user)
    session[:user_id] = user.id
  end

  private def ensure_login
    return if signed_in?
    flash["info"] = t("ensure_login")
    redirect_to sign_in_path
  end

  private def page
    (params[:page]? || 0).to_i
  end

  private def t(key, *args, **opts)
    I18n.translate("#{self.class.to_s.underscore}.#{key}", *args, **opts)
  end
end
