class SessionController < ApplicationController
  def new
    @page_title = t("new.title")
    user = User.new
    render "new.slang"
  end

  def create
    user = User.where { _email == params["email"] }.first
    if user && user.authenticate(params["password"].to_s)
      if user.activated?
        log_in user
        flash[:info] = t("create.info")
        redirect_to root_path
      else
        flash[:warning] = t("create.info")
        redirect_to root_path
      end
    else
      flash[:danger] = t("create.danger")
      user = User.new
      render "new.slang"
    end
  end

  def destroy
    session.delete(:user_id)
    flash[:info] = t("destroy.info")
    redirect_to root_path
  end
end
