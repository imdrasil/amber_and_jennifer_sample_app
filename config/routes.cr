Amber::Server.configure do
  pipeline :web do
    # Plug is the method to use connect a pipe (middleware)
    # A plug accepts an instance of HTTP::Handler
    plug Amber::Pipe::PoweredByAmber.new
    # plug Amber::Pipe::ClientIp.new(["X-Forwarded-For"])
    plug Citrine::I18n::Handler.new
    plug Amber::Pipe::Error.new
    plug Amber::Pipe::Logger.new
    plug Amber::Pipe::Session.new
    plug Amber::Pipe::Flash.new
    plug Amber::Pipe::CSRF.new
    plug Authenticate.new
  end

  pipeline :api do
    plug Amber::Pipe::PoweredByAmber.new
    plug Amber::Pipe::Error.new
    plug Amber::Pipe::Logger.new
    plug Amber::Pipe::Session.new
    plug Amber::Pipe::CORS.new
  end

  # All static content will run these transformations
  pipeline :static do
    plug Amber::Pipe::PoweredByAmber.new
    plug Amber::Pipe::Error.new
    plug Amber::Pipe::Static.new("./public")
  end

  routes :web do
    get "/", HomeController, :index
    get "/about", HomeController, :about

    get "/sign_in", SessionController, :new
    post "/sign_in", SessionController, :create
    delete "/sign_out", SessionController, :destroy

    get "/sign_up", UsersController, :new
    post "/sign_up", UsersController, :create

    resources "/users", UsersController, except: [:new, :create]
    get "/users/:id/following", UsersController, :following
    get "/users/:id/followers", UsersController, :followers

    get "/account_activation/:id/edit", AccountActivationController, :edit
    resources "/password_resets", PasswordResetsController, only: [:new, :create, :edit, :update]
    resources "/microposts", MicropostsController, only: [:create, :destroy]
    resources "/relationships", RelationshipsController, only: [:create, :destroy]
  end

  routes :api do
  end

  routes :static do
    # Each route is defined as follow
    # verb resource : String, controller : Symbol, action : Symbol
    get "/*", Amber::Controller::Static, :index
  end
end
