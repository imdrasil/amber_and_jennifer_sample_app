class UsersController < ApplicationController
  before_action do
    only %i(index show edit update destroy following followers) do
      ensure_login
    end

    only %i(destroy) do
      redirect_to root_path unless current_user!.admin?
    end
  end

  def index
    users = User.all.where { _activated }.paginate(page)
    page(Users::IndexView, users)
  end

  def new
    user = NewUserForm.new(User.new)
    page(Users::NewView, user)
  end

  def show
    user = User.find!(params[:id])
    unless user.activated?
      redirect_to root_path
      return
    end
    microposts = user.microposts_query.paginate(page)
    page(Users::ShowView, user, microposts)
  end

  def create
    user = NewUserForm.new(User.new)
    if user.verify(request) && user.save
      flash["success"] = t("create.success")
      redirect_to root_path
    else
      flash["danger"] = t("create.danger")
      page(Users::NewView, user)
    end
  end

  def edit
    user = User.find!(params[:id])
    unless current_user?(user)
      redirect_to root_path
      return
    end
    form = UpdateUserForm.new(user)
    page(Users::EditView, user, form)
  end

  def update
    user = User.find!(params[:id])
    unless current_user?(user)
      redirect_to root_path
      return
    end
    form = UpdateUserForm.new(user)
    if form.verify(request) && form.save
      flash[:success] = t("update.success")
      redirect_to root_path
    else
      page(Users::EditView, user, form)
    end
  end

  def destroy
    User.find!(params[:id]).destroy
    flash[:success] = t("destroy.success")
    redirect_to users_path
  end

  def following
    @page_title = t("following.title")
    this_user = User.find!(params[:id])
    users = this_user.following_query.paginate(page)
    page(Users::FollowView, this_user, users)
  end

  def followers
    @page_title = title = t("followers.title")
    this_user = User.find!(params[:id])
    users = this_user.followers_query.paginate(page)
    page(Users::FollowView, this_user, users)
  end
end
