# frozen_string_literal: true

class ApplicationController < ActionController::API
  def authorize_request
    header = request.headers["Authorization"]
    token = header.split(" ").last if header

    begin
      decoded = JwtService.decode(token)
      @user = User.find(decoded[:user_id])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    rescue
      # TODO: Log to an error monitoring tool
      render(json: { errors: ["Unauthorized request detected"] }, status: :unauthorized)
    end
  end

  private

  def meta_pagination(paginated_obj, options = {})
    options[:meta] = {} unless options.key?(:meta)
    meta_options = options[:meta].merge(generate_pagination(paginated_obj))
    options[:meta] = meta_options
    options
  end

  def generate_pagination(paginated_obj)
    {
      pagination: {
        current_page: paginated_obj.current_page,
        prev_page: paginated_obj.prev_page,
        next_page: paginated_obj.next_page,
        total_pages: paginated_obj.total_pages,
      },
    }
  end
end
