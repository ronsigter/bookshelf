require 'rails_helper'
require './spec/helpers/api_helpers'

RSpec.configure do |config|
  config.include ApiHelpers, type: :request
end

RSpec.describe "Books", type: :request do
  describe "POST /books/" do
    it 'returns books object if params are valid' do
      post('/books/', params: {
        book: {
          title: "Angels and Demons",
          description: "Angels & Demons is a 2000 bestselling mystery-thriller novel"
        }
      })
      expect(response.status).to eql(201)
      expect(json_body).to include({
        "title" => "Angels and Demons",
        "description" => "Angels & Demons is a 2000 bestselling mystery-thriller novel"
      })
    end
  end
end
