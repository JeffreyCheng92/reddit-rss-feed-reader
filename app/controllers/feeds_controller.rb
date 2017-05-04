class FeedsController < ApplicationController
  before_action :authenticate_user!

  def index
    @count, @before, @after = params[:count], params[:before], params[:after]
    url = "https://www.reddit.com/.rss?#{create_query_string}"
    # https://www.reddit.com/.rss?count=25&after=t3_694ioc
    headers = {"User-Agent" => "web:interview:v1 (by /u/JustJeffHere)"}
    xml = HTTParty.get(url, headers: headers).body
    feed = Feedjira::Feed.parse(xml)

    @entries = feed.entries
    @favorites = {}
    current_user.favorites.each { |favorite| @favorites[favorite.uuid] = true }

    respond_to do |format|
      format.html
    end
  end

  private

  def create_query_string
    query = []

    query << "count=#{@count}" if @count.present?
    query << "before=#{@before}" if @before.present?
    query << "after=#{@after}" if @after.present?

    query.join('&')
  end
end
