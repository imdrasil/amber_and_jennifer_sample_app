class SessionController < ApplicationController
  def new
    page(Session::NewView)
  end

  def create
    user = User.where { _email == params["session[email]"] }.first
    if user && user.authenticate(params["session[password]"].to_s)
      if user.activated?
        log_in user
        flash[:info] = t("create.info")
        redirect_to root_path
      else
        flash[:warning] = t("create.warning")
        redirect_to root_path
      end
    else
      flash[:danger] = t("create.danger")
      page(Session::NewView)
    end
  end

  def destroy
    session.delete(:user_id)
    flash[:info] = t("destroy.info")
    redirect_to root_path
  end
end
