# API Related helpers
module ApiHelpers
  def json_body
    JSON.parse(response.body, symbolize_names: true)
  end
end
