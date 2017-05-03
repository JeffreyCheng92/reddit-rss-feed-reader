class FeedsController < ApplicationController
  before_action :authenticate_user!

  def index
    count, after = params[:count], params[:after]
    count ||= 50
    # ?count=50&after=t3_68tf2s
    url = "https://www.reddit.com/.rss?cout=#{count}"

    xml = HTTParty.get(url).body
    feed = Feedjira::Feed.parse(xml)

    @entries = feed.entries

    respond_to do |format|
      format.html 
    end
  end
end
