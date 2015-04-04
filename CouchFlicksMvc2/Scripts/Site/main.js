(function() {
  var MainViewModel, MovieStub, gotTrending, mainViewModel, settings,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  mainViewModel = {};

  settings = {
    baseUrl: '/apiproxy/trakt',
    traktUrl: 'https://api-v2launch.trakt.tv/',
    trendingMovies: 'movies/trending'
  };

  MovieStub = (function() {
    function MovieStub(movie) {
      this.title = movie.title, this.tagline = movie.tagline, this.overview = movie.overview, this.rating = movie.rating, this.year = movie.year;
      this.posterUrl = movie.images.poster.medium;
      this.traktId = movie.ids.trakt;
      this.rating = this.rating.toFixed(2);
      if (this.overview.length > 450) {
        this.overview = /.{400}[^\s]*/.exec(this.overview) + '...';
      }
    }

    return MovieStub;

  })();

  MainViewModel = (function() {
    function MainViewModel() {
      this.populateTrending = __bind(this.populateTrending, this);
      this.movies = ko.observableArray([]);
    }

    MainViewModel.prototype.populateTrending = function(parameters) {
      var params, requestUrl;
      requestUrl = settings.traktUrl + settings.trendingMovies;
      params = $.param(parameters || {});
      if (!!params) {
        requestUrl += "?" + params;
      }
      return $.ajax({
        url: settings.baseUrl,
        data: {
          url: requestUrl
        },
        type: 'GET',
        success: function(data) {
          return gotTrending(JSON.parse(data));
        }
      });
    };

    return MainViewModel;

  })();

  $(function() {
    console.log('Ready');
    mainViewModel = new MainViewModel();
    ko.applyBindings(mainViewModel);
    return mainViewModel.populateTrending({
      extended: 'full,images'
    });
  });

  gotTrending = function(data) {
    var m, _i, _len, _results;
    console.log(data);
    mainViewModel.movies([]);
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      m = data[_i];
      _results.push(mainViewModel.movies.push(new MovieStub(m.movie)));
    }
    return _results;
  };

}).call(this);
