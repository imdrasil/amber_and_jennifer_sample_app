class UsersController < ApplicationController
  before_action do
    only %i(index show edit update destroy following followers) { ensure_login }

    only %i(destroy) do
      redirect_to root_path unless current_user!.admin?
    end
  end

  def index
    @page_title = t("index.title")
    users = User.all.where { _activated }.paginate(page)
    render "index.slang"
  end

  def new
    @page_title = t("new.title")
    user = NewUserForm.new(User.new)
    render("new.slang")
  end

  def show
    user = User.find!(params[:id])
    unless user.activated?
      redirect_to root_path
      return
    end
    @page_title = user.name
    microposts = user.microposts_query.paginate(page)
    render "show.slang"
  end

  def create
    user = NewUserForm.new(User.new)
    if user.verify(request) && user.save
      flash["success"] = t("create.success")
      redirect_to root_path
    else
      flash["danger"] = t("create.danger")
      render "new.slang"
    end
  end

  def edit
    @page_title = t("edit.title")
    user = User.find!(params[:id])
    unless current_user?(user)
      redirect_to root_path
      return
    end
    form = UpdateUserForm.new(user)
    render "edit.slang"
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
      render "edit.slang"
    end
  end

  def destroy
    User.find!(params[:id]).destroy
    flash[:success] = t("destroy.success")
    redirect_to users_path
  end

  def following
    @page_title = t("following.title")
    current_path = following_user_path(params[:id])
    this_user = User.find!(params[:id])
    users = this_user.following_query.paginate(page)
    render "show_follow.slang"
  end

  def followers
    title = t("followers.title")
    current_path = following_user_path(params[:id])
    this_user = User.find!(params[:id])
    users = this_user.followers_query.paginate(page)
    render "show_follow.slang"
  end
end
