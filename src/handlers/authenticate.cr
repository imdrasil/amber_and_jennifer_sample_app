class HTTP::Server::Context
  property current_user : User?
end

class Authenticate < Amber::Pipe::Base
  def call(context)
    if user_id = context.session["user_id"]?
      if user = User.find(user_id)
        context.current_user = user
      end
    end
    call_next(context)
  end
end
