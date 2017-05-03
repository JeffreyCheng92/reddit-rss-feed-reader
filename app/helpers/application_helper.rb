module ApplicationHelper
  def extract_uri(content)
    content.match(/https:(?:(?!\").)*/).to_s
  end
end
