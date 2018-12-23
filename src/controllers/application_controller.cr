require "jasper_helpers"
require "./concerns/*"

class ApplicationController < Amber::Controller::Base
  include JasperHelpers
  include RouterHelper
  include ViewHelper
  include Pager::ViewHelper

  @page_title : String = I18n.translate("application_controller.title")

  LAYOUT = "application.slang"

  def current_user
    context.current_user
  end

  def current_user?(user : User)
    current_user.try(&.id.==(user.id))
  end

  def current_user!
    current_user.not_nil!
  end

  def signed_in?
    current_user ? true : false
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

  private def l(*args, **opts)
    I18n.localize(*args, **opts)
  end
end
