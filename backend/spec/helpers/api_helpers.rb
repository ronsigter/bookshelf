# frozen_string_literal: true

# API Related helpers
module ApiHelpers
  def json_body
    JSON.parse(response.body, symbolize_names: true)
  end

  def request_header(user = create(:user))
    token = JwtService.encode({ user_id: user.id })
    { "Authorization": "bearer #{token}" }
  end
end
