// *
// *  Events Module 
// *

if (typeof bdc === 'undefined') { bdc = {}; }

(function( win, $, undefined ) {
  'use strict';

  var module = {};
  var _featured = {};
  var _search = {};
  var _filters = {};
  var _modal = {};
  var _spingo = {};
  var _chosen = {};

  _spingo.init = function() {
    
    if($('#spingo-container').length) {
      $('.masthead__content').css({'z-index':'5001'});
      $('.slide-out-nav').css({'z-index':'5001'});
    }

    var injectSpinGoAd = function(element) {
      var adElement = $('<div></div>');
      var sidebar = $('.sg-modal-secondary-column');

      sidebar.append(adElement);
      adElement.addClass('ad-toprightslot');
      adElement.attr('id', 'ad_toprightslot');
    };

    var removeSpinGoAd = function(element) {
      $('.ad-toprightslot').remove();
    };
  };

  _chosen.init = function() {
    $('head').append('<script type="text/javascript" src="/bdc-js/lib/chosen.min.js"></script>');
  };

  _featured.init = function(data) {
    _featured.$featuredEventsPagination = $('.events-featured__pagination');
    _featured.$featuredEventsList = $('.events-featured__list');
    _featured.$featuredEventsList1 = $('.js-events-list-1');
    _featured.$featuredEventsList2 = $('.js-events-list-2');
    _featured.$featuredEventsList3 = $('.js-events-list-3');
    _featured.$featuredEventsList4 = $('.js-events-list-4');
    _featured.$featuredEventsList5 = $('.js-events-list-5');

    _featured.eventsArray = data['events'];
    _featured.venuesArray = data['venues'];
    module.renderFeaturedEventsList(_featured.eventsArray, _featured.venuesArray);
    $('.js-events-list-1').show();
    $('.js-events-list-1').addClass('js-event-shown');
    $('.js-events-pagintion-1').addClass('js-event-page');
    $('.js-events-pagintion-1').css({'text-decoration':'underline'});
    _featured.eventHandlers();
  };

  module.spingGoToken = 'b845e1fe09bf21cd1c73780ab53c7dbd206aa8cd4caa56669d4f4d6db0bdc997'; // Pub Token
  module.daysOfWeek = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  module.shortMonthsOfYear = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  module.longMonthsOfYear = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  module.getEventInfo = function() {
    var nocache = new Date().getTime();
    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/events?callback=?',
      dataType: 'jsonp',
      data: {
        date: module.datePlaceholder,
        auth_token: module.spingGoToken
      },
      cache: nocache,

      beforeSend: function() {
        $('.events-list__wrapper').hide();
        $('.events-list .spinner-container').show();
      },

      success: function(data) {
        
        module.eventsArray = data['events'];
        module.venuesArray = data['venues'];

        if(module.eventsArray.length > 10) {
          $('.events-list__wrapper').css({'height': '1025px'});
          $('.events-list__more').show();
        } else {
          $('.events-list__wrapper').css({'height': '100%'});
          $('.events-list__more').hide();
        }

        module.$eventListMorning.html('');
        module.$eventListAfternoon.html('');
        module.$eventListEvening.html('');
        module.renderEventMainList(module.eventsArray, module.venuesArray);
      },
      error: function (response) {
        
      },
      complete: function() {
        $('.events-list .spinner-container').hide();
        $('.events-list__wrapper').show();
        module.activateExpanderArrow('list');
        _search.afterAjaxLoad('list');
        //checkThing("something");
      }
    });
  };

  module.getFeaturedEventInfo = function() {
    var nocache = new Date().getTime();
    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/events?callback=?',
      dataType: 'jsonp',
      data: {
        date: module.uglifyDate(new Date()),
        sections: $('.events-featured').attr('spingo-category-id'),
        limit: $('.events-featured').attr('spingo-events-limit'),
        auth_token: module.spingGoToken
      },
      cache: nocache,
      
      beforeSend: function() {
        $('.events-featured .spinner-container').show();
      },

      success: function(data) {
        
        _featured.init(data);
      },
      error: function (response) {
        
      },
      complete: function() {
        $('.events-featured .spinner-container').hide();
        _search.afterAjaxLoad('featured');
        // checkThing("something");
      }
    });
  };

  module.getMoreInfo = function(eventId, singleEvent) {
    var nocache = new Date().getTime();
    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/events/' + eventId + '?callback=?',
      dataType: 'jsonp',
      data: {
        auth_token: module.spingGoToken
      },
      cache: nocache,
      success: function(data) {
        
        module.renderQuickView(singleEvent, data);
      },
      error: function (response) {
        
      },
      complete: function() {
        module.activateExpanderArrow('featured');
        if(!singleEvent.find('.icon-events').hasClass('events-list__expand-icon--up')) {
          singleEvent.find('.icon-events').removeClass('events-list__expand-icon--down');
          singleEvent.find('.icon-events').addClass('events-list__expand-icon--up');
        }
        singleEvent.find('.events-list__event-more-info').slideDown(500,'linear');
      }
    });
  };

  module.renderQuickView = function(singleEvent, data) {
    if (singleEvent.hasClass('events-featured__event')) {
      var currentSection = $('.events-featured').attr('omniture-tag');
      var link = '<a href="/entertainment/events#/event/' + data['event'].id + '?' + currentSection + '" class="events-list__link">READ MORE ON OUR EVENTS PAGE</a>';
    } else {
      var link = '<a href="/entertainment/events#/event/' + data['event'].id + '" class="events-list__link">READ MORE ON OUR EVENTS PAGE</a>';
    }
    var description = data['event'].description;
    var cost = typeof data['event'].cost === 'undefined' ? '<p class="events-list__cost-title">COST: <p class="events-list__cost">FREE</p></p>': '<p class="events-list__cost-title">COST: <p class="events-list__cost">' + data['event'].cost + '</p></p>';
    var markupChecker = description.substring(0,3) === '<p>' ? '' : '<p>';
    var substring = description.substring(0,3) === '<p>' ? description.substring(0,description.length - 4) : description;
    var shortBlurb = description.length > 200 ? markupChecker + description.substring(0,200) + '... ' + link + '</p>': markupChecker + substring + '... ' + link + '</p>';
    var markup = cost + shortBlurb;
    $(singleEvent).find('.events-list__event-more-info').append(markup);
  };

  module.flipExpanderArrow = function(singleEvent) {
    if(!singleEvent.find('.icon-events').hasClass('events-list__expand-icon--up')) {
      singleEvent.find('.icon-events').removeClass('events-list__expand-icon--down');
      singleEvent.find('.icon-events').addClass('events-list__expand-icon--up');
    } else {
      singleEvent.find('.icon-events').removeClass('events-list__expand-icon--up');
      singleEvent.find('.icon-events').addClass('events-list__expand-icon--down');
    }
  };

  module.activateExpanderArrow = function(typeOfEvent) {

    var elem;
    if (typeOfEvent === 'featured') {
      elem = $('.events-featured__event');
    } else if (typeOfEvent === 'list') {
      elem = $('.events-list__event');
    } else if (typeOfEvent === 'searched') {
      elem = $('.search-result__event');
    } else {
      elem = $('.q-search-result__event');
    }

    elem.on('mousedown touchstart', function() {
      var $this = $(this);
      $this.find('.icon-events').removeClass('icon-events--expand-resting-small');
      $this.find('.icon-events').addClass('icon-events--expand-active-small');
      $this.on('mouseup touchend', function() {
        $this.find('.icon-events').removeClass('icon-events--expand-active-small');
        $this.find('.icon-events').addClass('icon-events--expand-resting-small');
      });
    });
  };

  // Maybe remove
  module.zebraDatepickerInit = function() {
    if(module.$zebraDatepicker) {
      $('head').append('<script type="text/javascript" src="/bdc-js/lib/zebra-datepicker.js"></script>');
    }
  };

  module.uglifyDate = function(dateObject) {
    var date = dateObject ? new Date(dateObject): new Date();
    var month;
    var day;
    if ((date.getMonth() + 1) < 10) {
      month = '0' + (date.getMonth() + 1).toString();
    } else {
      month = (date.getMonth() + 1).toString();
    }
    if ((date.getDate()) < 10) {
      day = '0' + (date.getDate()).toString();
    } else {
      day = (date.getDate()).toString();
    }
    return date.getFullYear() + '-' + month + '-' + day;
  };

  module.dateString = function(eventObjectDate, typeOfMonthString) {
    var eventDate = eventObjectDate ? new Date(eventObjectDate): new Date();
    if(typeof eventObjectDate !== 'undefined') {
      eventDate.setDate(eventDate.getDate() + 1);
    }
    var month = typeOfMonthString === 'short' ? module.shortMonthsOfYear[eventDate.getMonth()]: module.longMonthsOfYear[eventDate.getMonth()];
    return module.daysOfWeek[eventDate.getDay()] + ', ' + month + ' ' + eventDate.getDate();
  };

  module.timeToInt = function(eventTime) {
    var tempTimeArray = eventTime.split(':');
    tempTimeArray[0] = parseInt(tempTimeArray[0]);
    return tempTimeArray;
  };

  module.formatTime = function(eventTime) {
    if(eventTime === 'All Day') {
      return eventTime;
    } else {
      var timeArray, hours, minutes, ampm, stringTime;
      timeArray = module.timeToInt(eventTime);
      hours = timeArray[0];
      minutes = timeArray[1];
      ampm = hours >= 12 ? 'p' : 'a';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      stringTime = hours + ':' + minutes + ampm;
      return stringTime;
    }
  };

  module.timeString = function(eventObject) {
    var eventTime = eventObject.all_day ? 'All Day': eventObject.time;
    var eventEndTime = eventObject.end_time;
    if(eventTime && !eventEndTime) {
      return module.formatTime(eventTime);
    } else if(eventTime && eventEndTime) {
      return module.formatTime(eventTime) + ' ' + 'to' + ' ' + module.formatTime(eventEndTime);
    } else {
      return '';
    }
  };

  module.locationString = function(eventObject,venuesArray) {
    var result = venuesArray.filter(function(a) {
      return (a.id === eventObject.venue_id);
    });
    return result[0].name + ', ' + result[0].city + ', ' + result[0].state;
  };

  module.renderEventMainList = function(eventsArray,venuesArray) {
    var morningList = '';
    var afternoonList = '';
    var eveningList = '';
    var timeArray, hour;
    for(var i = 0; i < eventsArray.length; i++) {
      timeArray = eventsArray[i].all_day ? [0] : module.timeToInt(eventsArray[i].time);
      hour = timeArray[0];
      if(hour >= 0 && hour < 12) {
        morningList += module.renderMainEvent(eventsArray[i],venuesArray);
      }
      if(hour >= 12 && hour < 18) {
        afternoonList += module.renderMainEvent(eventsArray[i],venuesArray);
      }
      if(hour >= 18 && hour < 24) {
        eveningList += module.renderMainEvent(eventsArray[i],venuesArray);
      }
    }

    module.$eventListMorning.append(function(){
      return morningList;
    });
    module.$eventListAfternoon.append(function(){
      return afternoonList;
    });
    module.$eventListEvening.append(function(){
      return eveningList;
    });

    if(module.$eventListMorning.children().length) {
      module.$eventListMorning.prepend('<p class="events-list__time-of-day">Morning</p>');
    }
    if(module.$eventListAfternoon.children().length) {
      module.$eventListAfternoon.prepend('<p class="events-list__time-of-day">Afternoon</p>');
    }
    if(module.$eventListEvening.children().length) {
      module.$eventListEvening.prepend('<p class="events-list__time-of-day">Evening</p>');
    }
  };

  module.renderFeaturedEventsList = function(eventsArray,venuesArray) {
    var eventList1 = '';
    var eventList2 = '';
    var eventList3 = '';
    var eventList4 = '';
    var eventList5 = '';
    for(var i = 0; i < eventsArray.length; i++) {
      if(i < 5) {
        eventList1 += module.renderFeaturedEvent(eventsArray[i],venuesArray);
      } else if (i >= 5 && i < 10) {
        eventList2 += module.renderFeaturedEvent(eventsArray[i],venuesArray);
      } else if (i >= 10 && i < 15) {
        eventList3 += module.renderFeaturedEvent(eventsArray[i],venuesArray);
      } else if (i >= 15 && i < 20) {
        eventList4 += module.renderFeaturedEvent(eventsArray[i],venuesArray);
      } else if (i >= 20 && i < 25) {
        eventList5 += module.renderFeaturedEvent(eventsArray[i],venuesArray);
      }
    }
    _featured.$featuredEventsList1.append(eventList1);
    _featured.$featuredEventsList2.append(eventList2);
    _featured.$featuredEventsList3.append(eventList3);
    _featured.$featuredEventsList4.append(eventList4);
    _featured.$featuredEventsList5.append(eventList5);
    if(eventsArray.length > 5) {
      $('.js-events-featured-footer').append(module.renderPagination(eventsArray));
    }
  };

  module.renderMainEvent = function(singleEvent,venuesArray) {
    var markup = [
      '<div data-event-id="' + singleEvent.id +  '" class="events-list__event">',
        '<div class="events-list__event__wrapper">',
          '<img class="events-list__event__image" src="http:' + singleEvent.image['url'] + '">',
          '<div class="events-list__event__info">',
            '<p class="events-list__event__name">' + singleEvent.title + '</p>',
            '<p class="events-list__event__date-time">' + module.dateString(singleEvent.date,'short') +  ' ' + module.timeString(singleEvent) +  '</p>',
            '<p class ="events-list__event__location">' + module.locationString(singleEvent,venuesArray) + '</p>',
            '<div class="events-list__event-more-info"></div>',
          '</div>',
            '<span class="events-list__expand-icon--down icon-events icon-events--expand-resting-small"></span>',
        '</div>',
      '</div>'
    ].join('');
    return markup;
  };

  module.renderFeaturedEvent = function(singleEvent,venuesArray) {
    var markup = [
      '<div data-event-id="' + singleEvent.id +  '" class="events-featured__event">',
        '<div class="events-list__event__wrapper">',
          '<img class="events-featured__event__image" src="http:' + singleEvent.image['url'] + '">',
          '<div class="events-featured__event__info">',
            '<p class="events-featured__event__name">' + singleEvent.title + '</p>',
            '<p class="events-featured__event__date-time">' + module.dateString(singleEvent.date,'short') +  ' ' + module.timeString(singleEvent) +  '</p>',
            '<p class ="events-featured__event__location">' + module.locationString(singleEvent,venuesArray) + '</p>',
            '<div class="events-list__event-more-info"></div>',
          '</div>',
          '<span class="events-list__expand-icon--down icon-events icon-events--expand-resting-small"></span>',
        '</div>',
      '</div>'
    ].join('');
    return markup;
  };

  module.renderPagination = function(eventsArray) {
    var pageMarkup = function() {
      var pages = Math.ceil(eventsArray.length/5);
      var pagination = '';
      for(var i = 1; i <= pages; i++) {
        pagination += '<p class="events-featured__pagination js-events-pagintion-' + i + '" page=' + i + '>' + i + '</p>';
      }
      // pagination += '<a href=/entertainment/events class="events-featured__pagination events-featured__see-more">See More</a>';
      return pagination;
    };
    var markup = [
      '<p class="events-featured__prev">&lt;</p>',
      pageMarkup(),
      '<p class="events-featured__next">&gt;</p>'
    ].join('');
    return markup;
  };

  // ------------------------------------------------------------
  //  * Search Functions
  // ------------------------------------------------------------

  _search.init = function() {
    _search.$nearbySearch = $('.events-search__nearby-button');
  };

  _search.afterAjaxLoad = function(typeOfEvent) {
    
    _search.$someEvent = typeOfEvent === 'featured' ? $('.events-featured__event'): $('.events-list__event');

    _search.$someEvent.on('click', function() {
      
      var $this = $(this);
      if ($this.find('.events-list__event-more-info').has('p').length) {
        module.flipExpanderArrow($this);
        $this.find('.events-list__event-more-info').slideToggle(500,'linear');
      } else {
        module.getMoreInfo(($this).data('event-id'), $this);
      }
    });
  };

  _search.afterSearchAjaxLoad = function(typeOfSearch) {
    
    _search.$someEvent = typeOfSearch === 'quick' ? $('.q-search-result__event') : $('.search-result__event');
    _search.$someEvent.on('click', function() {
      
      var $this = $(this);
      if ($this.find('.events-list__event-more-info').has('p').length) {
        module.flipExpanderArrow($this);
        $this.find('.events-list__event-more-info').slideToggle(500,'linear');
      } else {
        module.getMoreInfo(($this).data('event-id'), $this);
      }
    });
  };

  _search.textSearch = function() {
    $('.search-form__main-search').children('span').removeClass('bdc-icon--search-medium');
    $('.search-form__main-search').children('span').addClass('bdc-icon--close-medium');
    _search.$miles = $('.events-search__filter-dropdown option:selected').attr('id');
    _search.$zip = $('.events-search__filter-input').val();
    _search.$desktopFilters = $('.chosen-choices').children('.search-choice').children('span');
    // _search.$mobileFilters = $('.icon-events--checkmark-active').parent().text();
    $('.searched-events').empty();
    _search.$query = $('.spingo-search__input').val();
    
    var userFilters = '';
    var distance = 100; //default, search events within 100 mile radius
    var city = "02118"; //default, central area of Boston
    var nocache = new Date().getTime();

    if (_search.$desktopFilters.length) {
      for (var i = 0; i < _search.$desktopFilters.length; i++) {
        userFilters += userFilters + _search.$desktopFilters[i].innerText;
      }
    }
    if (_filters.items.length) {
      for (var i = 0; i < _filters.items.length; i++) {
        userFilters += userFilters + _filters.items[i];
      }
    }
    if (_search.$miles) { distance = _search.$miles; }
    if (_search.$zip.length) {city = _search.$zip; }

    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/search',
      dataType: 'jsonp',
      data: {
        auth_token: module.spingGoToken,
        search: _search.$query + '+' + userFilters,
        radius_miles: distance,
        postal_code: city,
        limit: 25
      },
      cache: nocache,

      beforeSend: function() {
        $('.searched-events').next().show();
      },

      success: function(data) {
        var e = data['event_results']['events'];
        var v = data['event_results']['venues'];

        if (e.length < 1) {
          _search.$resultsHeader.html('Sorry, No Results Found');
        } else {
          _search.$resultsHeader.html('Search results (' + e.length + ')');
          for (var i = 0; i < e.length; i++) {
            _search.renderSearchEvent(e[i],v);
          }
        }
        $('.searched-events').prepend(_search.$resultsHeader);
      },
      error: function (response) {
        $('.searched-events').html($('Sorry, No Results Found'));
      },
      complete: function() {
        $('.searched-events').next().hide();
        module.activateExpanderArrow('searched');
        _search.afterSearchAjaxLoad('main');
        // checkThing("something");
      }
    });
  };

  _search.quickSearch = function() {
    
    $('.quicksearch__button').children('span').removeClass('bdc-icon--search-medium');
    $('.quicksearch__button').children('span').addClass('bdc-icon--close-medium');

    var $qSearchQuery = $('.quicksearch__input').val();
    var $qSearchHeader = $('<p class="quicksearch-header results-header"></p>');
    var $qSearchResults = $('.events-quicksearch-results');
    var nocache = new Date().getTime();

    $qSearchResults.empty();
    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/search',
      dataType: 'jsonp',
      data: {
        search: $qSearchQuery,
        auth_token: module.spingGoToken
      },
      cache: nocache,

      beforeSend: function() {
        $('.events-quicksearch-results').next().show();
      },

      success: function(data) {
        
        var e = data['event_results']['events'];
        var v = data['event_results']['venues'];

        if (e.length < 1) {
          $qSearchHeader.html('Sorry, No Results Found');
        } else {
          $qSearchHeader.html('Search results (' + e.length + ')');
          for (var i = 0; i < e.length; i++) {
            _search.renderQSearchEvent(e[i],v);
          }
        }
        $qSearchResults.prepend($qSearchHeader);
      },
      error: function(response) {
        alert('there was an error');
        
      },
      complete: function() {
        $('.events-quicksearch-results').next().hide();
        module.activateExpanderArrow('q-searched');
        _search.afterSearchAjaxLoad('quick');
        // checkThing("something");
      }
    });
  };

  /////// GEOLOCATION //////////////

  _search.getLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(_search.getNearbyEvents, _search.errors, geoOptions);
    } else {
      alert('Sorry, unable to get your location');
    }
  };

  var geoOptions = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0
  };

  _search.getNearbyEvents = function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var nocache = new Date().getTime();

    $.ajax({
      url: 'http://calendarapi.spingo.com/v1/events',
      dataType: 'jsonp',
      data: {
        latitude: lat,
        longitude: lng,
        radius_miles: 5, // for demonstration purposes, should be less
        auth_token: module.spingGoToken
      },
      cache: nocache,
      success: function(data) {
        
        var e = data['events'];
        var v = data['venues'];

        if (e.length < 1) {
          _search.$resultsHeader.html('Sorry, No Results Found');
        } else {
          _search.$resultsHeader.html('Search results (' + e.length + ')');
          for (var i = 0; i < e.length; i++) {
            _search.renderSearchEvent(e[i],v);
          }
          $('.searched-events').prepend(_search.$resultsHeader);
        }
      },
      error: function(response) {
        console.log(response);
      },
      complete: function() {
        module.activateExpanderArrow('list');
        _search.afterAjaxLoad('list');
      }
    });
  };

  _search.renderQSearchEvent = function(singleEvent,venuesArray) {
    var markup = [
      '<div data-event-id="' + singleEvent.id +  '" class="events-list__event q-search-result__event ">',
        '<div class="events-list__event__wrapper">',
          // '<a href="/entertainment/events#/event/' + singleEvent.id + '" rel="' + singleEvent.id + '" class="events-featured__event__link">',
            '<img class="events-list__event__image " src="http:' + singleEvent.image['url'] + '">',
            '<div class="events-list__event__info ">',
              '<p class="events-list__event__name ">' + singleEvent.title + '</p>',
              '<p class="events-list__event__date-time ">' + module.dateString(singleEvent.date, 'short' ) +  ' ' + module.timeString(singleEvent) +  '</p>',
              '<p class ="events-list__event__location">' + module.locationString(singleEvent,venuesArray) + '</p>',
              '<div class="events-list__event-more-info"></div>',
            '</div>',
            '<span class="events-list__expand-icon--down icon-events icon-events--expand-resting-small"></span>',
          '</div>',
        '</div>'
    ].join('');
    $('.events-quicksearch-results').append(markup);
  };


  // maybe pass in another variable representing
  // what element to append markup to or class name (DRY)
  _search.renderSearchEvent = function(singleEvent,venuesArray) {
    var markup = [
      '<div data-event-id="' + singleEvent.id +  '" class="events-list__event search-result__event">',
        '<div class="events-list__event__wrapper">',
          // '<a href="/entertainment/events#/event/' + singleEvent.id + '" rel="' + singleEvent.id + '" class="events-featured__event__link">',
            '<img class="events-list__event__image " src="http:' + singleEvent.image['url'] + '">',
            '<div class="events-list__event__info ">',
              '<p class="events-list__event__name ">' + singleEvent.title + '</p>',
              '<p class="events-list__event__date-time ">' + module.dateString(singleEvent.date, 'short' ) +  ' ' + module.timeString(singleEvent) +  '</p>',
              '<p class ="events-list__event__location">' + module.locationString(singleEvent,venuesArray) + '</p>',
              '<div class="events-list__event-more-info"></div>',
            '</div>',
            '<span class="events-list__expand-icon--down icon-events icon-events--expand-resting-small"></span>',
          '</div>',
        '</div>'
    ].join('');
    $('.searched-events').append(markup);
  };

  // ------------------------------------------------------------
  //  * Search Filters
  // ------------------------------------------------------------


  _filters.init = function() {
    var search = $('.events-search__chosen-select');
    if (search.length) {
      search.chosen();
    }
  };

  _filters.showFilters = function() {
    if($(window).width() < 960 && $('.popup-modal').length) {
      $(function () {
        $('.popup-modal').magnificPopup({
          type: 'inline',
          preloader: false,
          modal: true
        });
      });
    }
  };

  _filters.closeFilters = function() {
    $.magnificPopup.close();
  };

  _filters.addFilter = function(filter) {
    _filters.items.push(filter.text());
    _filters.$filterList.empty();

    
    filter.children('span').removeClass('icon-events--checkmark-inactive').addClass('icon-events--checkmark-active');
    _filters.displayFilters(_filters.items);
  };

  _filters.displayFilters = function(items) {
    _filters.$filterList.empty();
    if(items.length <= 3) {
      for (var i = 0; i < items.length; i++) {
        _filters.$filterList.prepend('<li><span>' + items[i] + '</span></li>');
        // if(items.length < 3) {
        //   _filters.$filterList.prepend('<li><span>' + items[i] + '</span></li>');
        // }
        // } else {
        //   _filters.$filterList.prepend('<li><span>' + items[i] + '</span>,</li>');
        // }
      }
    } else {
      var firstThree = items.slice(0, 3);
      for (var i = 0; i < firstThree.length; i++) {
        _filters.$filterList.prepend('<li><span>' + firstThree[i] + '</span></li>');
      }
      _filters.$filterList.append('<li> and <span>' + (items.length - 3) + ' more</span></li>');
    }
  };

  _filters.removeFilter = function(filter) {
    filter.children('span').removeClass('icon-events--checkmark-active').addClass('icon-events--checkmark-inactive');
    filter.css('background', 'none');
    var index = _filters.items.indexOf(filter.text());
    _filters.items.splice(index, 1);
    _filters.displayFilters(_filters.items);
  };

  var checkThing = function(param) {
    var elem;
    if (param === "button") {
      elem = $('.search-form__button');
    }
    // check the state of the search box (ready for search/clear previous search)
    elem.on('click', function(event){
      if ($(this).children('span').hasClass('bdc-icon--search-medium')) {
        module.logAnalytics(event, $(this));
      }
    });
  };

  // ------------------------------------------------------------
  //  * Event Handlers
  // ------------------------------------------------------------

  module.eventHandlers = function() {
    module.$eventsListMore.on('click', function(){
      if(module.$eventsListWrapper.height() === 1025) {
        module.$eventsListWrapper.animate({height:'100%'}, 500);
        module.$eventsListMore.html('SHOW FEWER EVENTS');
      } else {
        module.$eventsListWrapper.animate({height: '1025px'}, 500);
        module.$eventsListMore.html('SHOW MORE EVENTS');
      }
    });

    $('.search-form__button').on('click', checkThing("button"));

    $('.spingo-search__input').on('click', function() {
      $('.events-search--expanded').slideDown();
    });


    $('.events-search__bottom-submit').on('click', function(event) {
      event.preventDefault();
      _search.textSearch();
    });

    $('.search-form__main-search').on('click', function(event) {
      event.preventDefault();
      if($(this).children('span').hasClass('bdc-icon--search-medium')) {
        _search.textSearch();
      } else {
        $('.searched-events').empty();
        $(this).children('span').removeClass('bdc-icon--close-medium');
        $(this).children('span').addClass('bdc-icon--search-medium');
        $('.spingo-search__input').val('');
      }
    });

    $('.quicksearch__button').on('click', function(event) {
      event.preventDefault();
      if($(this).children('span').hasClass('bdc-icon--search-medium')) {
        _search.quickSearch();
      } else {
        $('.events-quicksearch-results').empty();
        $(this).children('span').removeClass('bdc-icon--close-medium');
        $(this).children('span').addClass('bdc-icon--search-medium');
        $('.quicksearch__input').val('');
      }
    });

    _filters.$openPopup.on('click', function() {
      if($(window).width() <= 960 ) {
        _filters.showFilters();
      }
    });

    _filters.$closePopup.on('click', function(e) {
      e.preventDefault();
      _filters.closeFilters();
    });
    _filters.$filter.on('click', function(e){
      e.preventDefault();
      if($(this).children().hasClass("icon-events--checkmark-inactive")) {
        _filters.addFilter($(this));
      } else {
        _filters.removeFilter($(this));
      }
    });

    _search.$nearbySearch.on('click', function(event) {
      event.preventDefault();
      _search.getLocation();
    });



    if(module.$zebraDatepicker) {
      module.$zebraDatepicker.html(module.dateString());
      module.$zebraDatepicker.Zebra_DatePicker({
        days_abbr: ['S','M','T','W','T','F','S'],
        default_position: 'below',
        direction: [true,false],
        first_day_of_week: 0,
        header_navigation: ['<span class="bdc-icon bdc-icon--arrow-left"></span>','<span class="bdc-icon bdc-icon--arrow-right"></span>'],
        offset: [-300, 25],
        show_clear_date: false,
        show_icon: false,
        show_select_today: 'Today',

        onSelect: function(date) {
          module.datePlaceholder = date;
          module.$eventListMorning.html('');
          module.$eventListAfternoon.html('');
          module.$eventListEvening.html('');
          var newDate = new Date();
          if(date === module.uglifyDate(newDate)) {
            module.$listHeader.html('Today');
          } else {
            module.$listHeader.html(module.dateString(date, 'short'));
          }
          module.$zebraDatepicker.html(module.dateString(date, 'long'));
          module.getEventInfo();
        }
      });
    }
  };

  module.logAnalytics = function(event, element) {
    window.s.linkTrackVars = 'prop15,prop16';
    window.s.linkTrackEvents = event;

    var query;
    var distanceFilter = $('.events-search__filter-dropdown option:selected').attr('id') || '100';
    var zipcodeFilter = $('.events-search__filter-input').val() || '02118';
    if (element.hasClass('quicksearch__button')) { query = element.prev().val(); }
    if (element.hasClass('search-form__main-search') || element.hasClass('events-search__bottom-submit')) { query = $('.spingo-search__input').val(); }
    if (distanceFilter || zipcodeFilter) { window.s.prop16 = zipcodeFilter+' | '+distanceFilter+' miles';}
    if (typeof window.s !== "object" && typeof window.s.t !== "function") return;
    window.s.prop15 = query;
    // fires link tracking for properties in window.s.linkTrackVars
    window.s.tl(element, 'o', event);
  };

  // ------------------------------------------------------------
  //  * Featured Event Handlers
  // ------------------------------------------------------------

    _featured.eventHandlers = function() {
      $('.events-featured__pagination').on('click', function() {
        $('.js-event-shown').hide();
        $('.events-featured__list').removeClass('js-event-shown');
        $('.events-featured__pagination').removeClass('js-event-page');
        $('.events-featured__pagination').css({'text-decoration':'none'});
        $(this).css({'text-decoration':'underline'});
        $(this).addClass('js-event-page');
        $('.js-events-list-' + $(this).attr('page')).show();
        $('.js-events-list-' + $(this).attr('page')).addClass('js-event-shown');
      });

      $('.events-featured__prev').on('click', function() {
        if(parseInt($('.js-event-page').attr('page')) === 1){
          var pageLength = $('.events-featured__pagination').length;
          $('.js-event-shown').hide();
          $('.js-events-list-1').removeClass('js-event-shown');
          $('.js-events-list-' + pageLength).show();
          $('.js-events-list-' + pageLength).addClass('js-event-shown');
          $('.js-events-pagintion-1').css({'text-decoration':'none'});
          $('.js-events-pagintion-1').removeClass('js-event-page');
          $('.js-events-pagintion-' + pageLength).addClass('js-event-page');
          $('.js-event-page').css({'text-decoration':'underline'});
        } else {
          var page = $('.js-event-page').attr('page');
          var prevPage = page - 1;
          $('.js-event-shown').hide();
          $('.js-events-list-' + (page).toString()).removeClass('js-event-shown');
          $('.js-events-list-' + (prevPage).toString()).show();
          $('.js-events-list-' + (prevPage).toString()).addClass('js-event-shown');
          $('.js-event-page').css({'text-decoration':'none'});
          $('.js-events-pagintion-' + (page).toString()).removeClass('js-event-page');
          $('.js-events-pagintion-' + (prevPage).toString()).addClass('js-event-page');
          $('.js-event-page').css({'text-decoration':'underline'});
        }
      });

      $('.events-featured__next').on('click', function() {
        var pageLength = $('.events-featured__pagination').length;
        if(parseInt($('.js-event-page').attr('page')) === pageLength){
          $('.js-event-shown').hide();
          $('.js-events-list-' + pageLength).removeClass('js-event-shown');
          $('.js-events-list-1').show();
          $('.js-events-list-1').addClass('js-event-shown');
          $('.js-events-pagintion-' + pageLength).css({'text-decoration':'none'});
          $('.js-events-pagintion-' + pageLength).removeClass('js-event-page');
          $('.js-events-pagintion-1').addClass('js-event-page');
          $('.js-event-page').css({'text-decoration':'underline'});
        } else {
          var page = parseInt($('.js-event-page').attr('page'));
          var nextPage = page + 1;
          $('.js-event-shown').hide();
          $('.js-events-list-' + (page).toString()).removeClass('js-event-shown');
          $('.js-events-list-' + (nextPage).toString()).show();
          $('.js-events-list-' + (nextPage).toString()).addClass('js-event-shown');
          $('.js-event-page').css({'text-decoration':'none'});
          $('.js-events-pagintion-' + (page).toString()).removeClass('js-event-page');
          $('.js-events-pagintion-' + (nextPage).toString()).addClass('js-event-page');
          $('.js-event-page').css({'text-decoration':'underline'});
        }
      });
    };

  $(window).resize(function() {
    if ($(window).width() >= 960) {
      $('.events-search--expanded').children('a').removeClass('popup-modal');
      $('.events-search--expanded').children('a').removeAttr('href');
    } else {
      $('.events-search--expanded').children('a').addClass('popup-modal');
      $('.events-search--expanded').children('a').attr('href="#test-modal"');
    }
  });

  // ------------------------------------------------------------
  //  * Init
  // ------------------------------------------------------------

  module.init = function() {
    module.$eventList = $('.events-list');
    module.$eventListMorning = $('.js-events-morning');
    module.$eventListAfternoon = $('.js-events-afternoon');
    module.$eventListEvening = $('.js-events-evening');
    module.$zebraDatepicker = $('.datepicker');
    module.$eventsListWrapper = $('.events-list__wrapper');
    module.$eventsListMore = $('.events-list__more');
    module.$listHeader = $('.events-list__header');
    $('.results-header').css('display', 'none');

    // Search
    _search.init();
    _search.$resultsHeader = $('<p class="results-header"></p>');

    // Filter
    _filters.init();
    _filters.$popup = $('.narrow-search');
    _filters.$openPopup = $('.popup-modal');
    _filters.$closePopup = $('.popup-modal-dismiss');
    _filters.$filter = $('.narrow-search__filter-item');
    _filters.$filterList = $('.events-search__narrow-search--mobile');
    _filters.items = [];

    // Modal
    module.datePlaceholder = module.uglifyDate(new Date());

    module.getFeaturedEventInfo();
    module.getEventInfo();
    module.zebraDatepickerInit();
    module.eventHandlers();
  };

  // Kickoff
  $(document).ready(function() {
    if ($('#spingo-container').length) {
     _spingo.init();
    }
    if ($('.events-search__chosen-select').length) { _chosen.init(); }
    if ($('.events-main').length || $('.events-featured').length) { module.init(); }
  });

})(window, jQuery);