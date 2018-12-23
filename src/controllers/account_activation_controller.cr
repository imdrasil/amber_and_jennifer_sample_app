require "../services/activate_user"

class AccountActivationController < ApplicationController
  def edit
    user = User.where { _email == params[:email] }.first
    if user && ActivateUser.call(user, params[:id])
      log_in user
      flash[:success] = t("edit.success")
      redirect_to user_path(user.id)
    else
      flash[:danger] = t("edit.danger")
      redirect_to root_path
    end
  end
end
