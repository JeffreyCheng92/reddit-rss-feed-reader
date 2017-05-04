//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var createFavorite = function(data) {
  $.ajax('/favorites.json', {
    method: 'POST',
    data: data,
    success: function(res, status, xhr) { window.alert('Successfully favorited!'); },
    error: function(xhr, status, err) { window.alert('Something went wrong'); }
  });
};

addFavoriteListeners = function() {
  $('.favorite').click(function(e) {
    e.preventDefault();
    var parent = $(e.currentTarget).parent('.entry');

    data = {
      favorite: {
        title:  parent.find('.title').text(),
        url: parent.find('.title').attr('href'),
        author: parent.find('.author').text(),
        uuid: parent.data('id')
      }
    };

    createFavorite(data);
  });
};
