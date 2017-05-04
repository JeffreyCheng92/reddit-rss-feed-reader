var getQueryObj = function() {
  var queryString = location.search.substring(1);
  var queryObj;

  if (queryString === '') {
    queryObj = {};
  } else {
    queryObj = JSON.parse('{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  }

  return queryObj;
};

addPageNavigationListeners = function() {
  $('.prev-page').click(function(e) {
    e.preventDefault();
    var queryObj = getQueryObj();

    var count;
    var queryObjCount = parseInt(queryObj.count);
    if (queryObjCount == 26) {
      count = 0;
    } else if (queryObjCount % 5 === 0) {
      count = queryObjCount + 1;
    } else {
      count = queryObjCount - 25;
    }

    var entries = $('.entry');
    var before = $(entries[0]).data('id');

    window.location.href = '/?count=' + count + '&before=' + before;
  });

  $('.next-page').click(function(e) {
    e.preventDefault();
    var queryObj = getQueryObj();

    var count;
    var queryObjCount = parseInt(queryObj.count);
    if (isNaN(queryObjCount)) {
      count = 25;
    } else if (queryObjCount % 5 === 0) {
      count = queryObjCount + 25;
    } else {
      count = queryObjCount - 1;
    }

    var entries = $('.entry');
    var after = $(entries[entries.length - 1]).data('id');

    window.location.href = '/?count=' + count + '&after=' + after;
  });
};
