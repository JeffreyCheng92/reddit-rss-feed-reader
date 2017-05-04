//= require jquery
//= require jquery_ujs
//= require_tree .
//= require page_navigation

var toggleButton = function(button) {
  if (button.hasClass('favorite')) {
    button.removeClass('favorite').addClass('unfavorite').text('UNFAVORITE');
  } else {
    button.removeClass('unfavorite').addClass('favorite').text('FAVORITE');
  }

  button.prop('disabled', false);
};

var createFavorite = function(data, button) {
  button.prop('disabled', true);

  $.ajax('/favorites.json', {
    method: 'POST',
    data: data,
    success: function(res, status, xhr) {
      toggleButton(button);
    },
    error: function(xhr, status, err) { window.alert('Something went wrong'); }
  });
};

var removeFavorite = function(data, button) {
  button.prop('disabled', true);
  var url = '/favorites/' + data.favorite.uuid + '.json';

  $.ajax(url, {
    method: 'DELETE',
    success: function(res, status, xhr) {
      toggleButton(button);
    },
    error: function(xhr, status, err) { window.alert('Something went wrong'); }
  });
};

addFavoriteListeners = function() {
  $('.favorite').click(function(e) {
    e.preventDefault();
    var parent = $(e.currentTarget).parent('.entry');

    data = {
      favorite: {
        title:  parent.find('.title').attr('title'),
        url: parent.find('.title').attr('href'),
        author: parent.find('.author').text(),
        uuid: parent.data('id')
      }
    };

    createFavorite(data, $(e.currentTarget));
  });

  $('.unfavorite').click(function(e) {
    e.preventDefault();
    var parent = $(e.currentTarget).parent('.entry');

    data = {
      favorite: { uuid: parent.data('id') }
    };

    removeFavorite(data, $(e.currentTarget));
  });
};

// For the favorites index page
addDeleteFavoriteListener = function() {
  $('button.delete').click(function(e) {
    e.preventDefault();
    var parent = $(e.currentTarget).parent('.favorite');

    data = {
      favorite: { uuid: parent.data('id') }
    };

    var url = '/favorites/' + data.favorite.uuid + '.json';

    $.ajax(url, {
      method: 'DELETE',
      success: function(res, status, xhr) {
        parent.remove();
      },
      error: function(xhr, status, err) { window.alert('Something went wrong'); }
    });
  });
};
