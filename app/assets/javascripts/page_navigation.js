addPageNavigationListeners = function() {
  $('.prev-page').click(function(e) {

  });

  $('.next-page').click(function(e) {
    e.preventDefault();

    var queryString = location.search.substring(1);
    var queryObj;

    if (queryString === '') {
      queryObj = {};
    } else {
      queryObj = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    }

    var count;
    if (queryObj.count === undefined) {
      count = 25;
    } else if (queryObj.count % 5 === 0) {
      count = queryObj.count + 25;
    } else {
      count = queryObj.count - 1;
    }

    var entries = $('.entry');
    var after = $(entries[entries.length - 1]).data('id');

    window.location.href = '/?count=' + count + '&after=' + after;
  });
};
