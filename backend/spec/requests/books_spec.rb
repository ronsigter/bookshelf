# RSpec test for Books Controller
require 'rails_helper'

RSpec.describe 'Books', type: :request do
  describe 'POST /books/' do
    it 'returns books object if params are valid' do
      post('/books/', params: {
             book: {
               title: 'Angels and Demons',
               description: 'Angels & Demons is a 2000 bestselling mystery-thriller novel'
             }
           })
      expect(response.status).to eql(201)
      expect(json_body[:data]).to include({
                                            title: 'Angels and Demons',
                                            description: 'Angels & Demons is a 2000 bestselling mystery-thriller novel'
                                          })
      expect(json_body[:errors]).to eql(nil)
    end

    it 'returns error if there is a missing param' do
      post('/books/', params: {
             book: {
               unknown: 'Unknown'
             }
           })
      expect(response.status).to eql(406)
      expect(json_body[:data]).to eql(nil)
      expect(json_body[:errors]).to include("Title can't be blank")
      expect(json_body[:errors]).to include("Description can't be blank")
    end
  end
end
