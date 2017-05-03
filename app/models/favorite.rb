class Favorite < ActiveRecord::Base
  validates_presence_of :user_id, :title, :url, :author

  belongs_to :user
end
