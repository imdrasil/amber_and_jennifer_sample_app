class HTTP::Request
  DEFAULT_MAX_BODY_SIZE = UInt64.new(8 * 1024 ** 2)

  @cached_body : IO::Memory?

  def body
    cached_body
  end

  def self.max_body_size
    DEFAULT_MAX_BODY_SIZE
  end

  private def cached_body
    @cached_body ||= begin
      unless @body.nil?
        io = IO::Memory.new
        IO.copy(@body.not_nil!, io, self.class.max_body_size)
        io.rewind
        io
      end
    end
  end
end

module FormObject
  abstract class AbstractForm
    def self.parse(request)
      body = request.body
      if body
        body.seek(0)
      end
      context = Context.new
      read_query_params(request, context)

      case request.headers["Content-Type"]?
      when /^application\/x-www-form-urlencoded/
        read_url_encoded_form(request, context)
      when /^multipart\/form-data/
        read_multipart_form(request, context)
      when /^application\/json/
        read_json_form(request, context)
      end
      context
    end
  end
end
