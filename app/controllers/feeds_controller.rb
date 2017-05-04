class FeedsController < ApplicationController
  before_action :authenticate_user!

  def index
    count, after = params[:count], params[:after]
    count ||= 50
    # ?count=50&after=t3_68tf2s
    url = "https://www.reddit.com/.rss?count=#{count}"

    headers = {"User-Agent" => "web:interview:v1 (by /u/JustJeffHere)"}
    # xml = HTTParty.get(url, headers: headers).body
    # feed = Feedjira::Feed.parse(xml)
    #
    # @entries = feed.entries
    @entries = []
    respond_to do |format|
      format.html
    end
  end
end
