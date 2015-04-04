mainViewModel = {}

settings = 
    baseUrl: '/apiproxy/trakt'
    traktUrl: 'https://api-v2launch.trakt.tv/'
    trendingMovies: 'movies/trending'

class MovieStub
    constructor: (movie)->
        { @title, @tagline, @overview } = movie
        @posterUrl = movie.images.poster.medium
        @traktId = movie.ids.trakt

class MainViewModel
    constructor: ->
        @movies = ko.observableArray [] # from cache later?

    populateTrending: (parameters) =>
        requestUrl = settings.traktUrl + settings.trendingMovies
        params = $.param parameters || {}
        requestUrl += "?#{ params }" unless !params
        $.ajax {
            url: settings.baseUrl
            data: { url: requestUrl }
            type: 'GET'
            success: (data) ->
                gotTrending JSON.parse(data)
        }

$ ->
    console.log 'Ready'
    mainViewModel = new MainViewModel()
    ko.applyBindings mainViewModel
    mainViewModel.populateTrending { extended: 'full,images' }

    #scroll rubbish
    $('.posterGridCell').parallax('50%', 0.5)

gotTrending = (data) ->
    console.log data
    mainViewModel.movies [] #clear array
    for m in data 
        mainViewModel.movies.push new MovieStub(m.movie)