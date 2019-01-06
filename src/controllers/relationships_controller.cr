class RelationshipsController < ApplicationController
  before_action do
    all { ensure_login }
  end

  def create
    user = User.find!(params["follow[followed_id]"])
    current_user!.follow(user)
    redirect_to user_path(user.id)
  end

  def destroy
    user = User.find!(params[:id])
    current_user!.unfollow(user)
    redirect_to user_path(user.id)
  end
end
