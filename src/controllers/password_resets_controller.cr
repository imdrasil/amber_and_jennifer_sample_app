require "../services/init_user_password_reset"

class PasswordResetsController < ApplicationController
  @user : User?

  before_action do
    only %i(edit update) { validate_user }
    only %i(edit update) { check_expiration }
  end

  def new
    @page_title = t("new.title")
    render "new.slang"
  end

  def edit
    form = ResetPasswordForm.new(user!)
    render "edit.slang"
  end

  def create
    if user
      InitUserPasswordReset.call(user!)
      flash[:info] = t("create.info")
      redirect_to root_path
    else
      flash[:danger] = t("create.danger")
      render "new.slang"
    end
  end

  def update
    form = ResetPasswordForm.new(user!)
    if form.verify(request) && form.save
      log_in user!
      flash[:success] = t("update.success")
      redirect_to user_path(user!.id)
    else
      render "edit.slang"
    end
  end

  private def user
    @user ||= User.where { _email == params[:email] }.first
  end

  private def user!
    user.not_nil!
  end

  private def validate_user
    return if user && user!.activated? && user!.reset_valid?(params[:id])
    flash[:danger] = t("validate_user")
    redirect_to root_path
  end

  private def check_expiration
    return unless user!.password_reset_expired?
    flash[:danger] = t("check_expiration")
    redirect_to new_password_reset_path
  end
end