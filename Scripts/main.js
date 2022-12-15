


let apiKey = 'be0402057a6eaa4903c4026b94c82661';
let searchBar = document.getElementById('searchBar');
let searchButton = document.getElementById('searchButton');
let searchResults = document.getElementById('searchResults');
let showOrMovie = document.getElementById('showOrMovie');
searchButton.addEventListener('click', function(){
  if (searchBar.value !== ''){
    searchButton.addEventListener('click', searchAPI());
  }else if(searchBar.value == ''){
    searchResults.innerHTML = 'Please enter a TV or Movie title into the searchbar'
    searchResults.style.color = 'red';
    searchResults.style.fontWeight = 700;
  }
});
searchBar.addEventListener('keypress', function(event){
  if (event.key === 'Enter' && searchBar.value !== ''){
    searchButton.addEventListener('click', searchAPI());
  }else if(event.key === 'Enter' && searchBar.value == ''){
    searchResults.innerHTML = 'Please enter a TV or Movie title into the searchbar'
    searchResults.style.color = "red";
    searchResults.style.fontWeight = 700;
  }
});



function searchAPI() {
    searchResults.innerHTML = ''
    searchResults.style.fontWeight = 400;
    searchResults.style.color = "black";
    let castContainerChecker = document.getElementById('cast-container')
    if(typeof(castContainerChecker) != 'undefined' && castContainerChecker != null){
      castContainerChecker.remove()}
    let crewContainerChecker = document.getElementById('crew-container')
    if(typeof(crewContainerChecker) != 'undefined' && crewContainerChecker != null){
     crewContainerChecker.remove()}
  let searchTerm = searchBar.value;

if(showOrMovie.checked == false){
  url = 'https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + searchTerm;
}else{
  url = 'https://api.themoviedb.org/3/search/tv?api_key=' + apiKey + '&query=' + searchTerm;
};
  


  
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let results = data.results;
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let poster = result.poster_path;
        let overview = result.overview;
        let releaseDate = result.release_date;
        let releaseDateTV = result.first_air_date;
        let voteAverage = result.vote_average;
        let movie = document.createElement('div');
        movie.className = 'movie';
        let movieSummary = document.createElement('p');
        movieSummary.className = 'movieSummary'
        movieSummary.innerHTML = `Summary`;
        let movieOverview = document.createElement('p');
        movieOverview.className = 'movieOverview'
        movieOverview.innerHTML = overview;
        let movieVoteAverage = document.createElement('p');
        movieVoteAverage.innerHTML = `${voteAverage}/10`;
        if(result.name == undefined){
          let movieTitle = document.createElement('h2');
          movieTitle.innerHTML = result.title;
        movie.appendChild(movieTitle);
      }else if(result.title == undefined){
          let movieTitle = document.createElement('h2');
          movieTitle.innerHTML = result.name;
          movie.appendChild(movieTitle);
        }
        if(result.poster_path == null){
          let moviePoster = document.createElement("img");
          moviePoster.src = './img/Unavailable.jpg';
          movie.appendChild(moviePoster);}else{
          let moviePoster = document.createElement('img');
          moviePoster.src = 'https://image.tmdb.org/t/p/w500' + poster;
          movie.appendChild(moviePoster);}
          movie.appendChild(movieSummary);
        movie.appendChild(movieOverview);
        if(result.first_air_date == undefined){
          let movieReleaseDate = document.createElement('p');
          movieReleaseDate.innerHTML = releaseDate;
          movie.appendChild(movieReleaseDate);
        }else if(result.release_date == undefined){
          let movieReleaseDate = document.createElement('p');
          movieReleaseDate.innerHTML = releaseDateTV;
          movie.appendChild(movieReleaseDate);
        }
        movie.appendChild(movieVoteAverage);
        searchResults.appendChild(movie);
      }
      if(showOrMovie.checked === false){
        let searchSummary = document.createElement('div');
        tvOrMovie = 'movie'
        searchSummary.className = 'searchSummaryStyle'
        searchSummary.innerHTML = `Movie results for "${searchTerm}"`;
        searchResults.prepend(searchSummary);
      }else{
        let searchSummary = document.createElement('div');
        tvOrMovie = 'tv'
        searchSummary.className = 'searchSummaryStyle'
        searchSummary.innerHTML = `TV Show results for "${searchTerm}"`;
        searchResults.prepend(searchSummary);};
        let movieButton = document.getElementsByClassName('movie');
console.log(results)
        history.pushState(results,'' ,`index.html#${tvOrMovie}/${searchTerm}` )

for (let i = 0; i < movieButton.length; i++) {
  movieButton[i].addEventListener('click', clicked);
function clicked() {
  if(results[i].name == undefined){
    searchResults.innerHTML = `Movie credits for ${results[i].title}`}else{
    searchResults.innerHTML = `TV Show credits for ${results[i].name}`};
  if(results[i].name == undefined){
    movieID = results[i].id;
    movieURLFetch = 'https://api.themoviedb.org/3/movie/' + movieID + '/credits?api_key=' + apiKey;
;fetch(movieURLFetch)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      let cast = myJson.cast;
      let crew = myJson.crew;
      let castContainer = document.createElement('div');
      castContainer.innerHTML = '';
      castContainer.id = 'cast-container';
      castContainer.className = 'cast-container';
      let crewContainer = document.createElement('div');
      crewContainer.innerHTML = '';
      crewContainer.id = 'crew-container';
      crewContainer.className = 'crew-container';
      document.body.appendChild(castContainer);
      document.body.appendChild(crewContainer);
      for (let i = 0; i < cast.length; i++) {
        let castCard = document.createElement('div');
        castCard.className = 'cast-card';
        let castName = document.createElement('div');
        castName.className = 'cast-name';
        castName.innerHTML = cast[i].name;
        let castCharacter = document.createElement('div');
        castCharacter.className = 'cast-character';
        castCharacter.innerHTML = cast[i].character;
        let castPopularity = document.createElement('div');
        castPopularity.className = 'cast-popularity';
        castPopularity.innerHTML = cast[i].popularity;
        let castImage = document.createElement('img');
        castImage.className = 'cast-image';
        if(cast[i].profile_path == null){castImage.src = './img/Unavailable.jpg'}else{
          castImage.src = 'https://image.tmdb.org/t/p/w500' + cast[i].profile_path};
        castCard.appendChild(castName);
        castCard.appendChild(castCharacter);
        castCard.appendChild(castPopularity);
        castCard.appendChild(castImage);
        castContainer.appendChild(castCard);
      }
      for (let i = 0; i < crew.length; i++) {
        let crewCard = document.createElement('div');
        crewCard.className = 'crew-card';
        let crewJob = document.createElement('div');
        crewJob.className = 'crew-job';
        crewJob.innerHTML = crew[i].job;
        let crewName = document.createElement('div');
        crewName.className = 'crew-name';
        crewName.innerHTML = crew[i].name;
        let crewPopularity = document.createElement('div');
        crewPopularity.className = 'crew-popularity';
        crewPopularity.innerHTML = crew[i].popularity;
        let crewImage = document.createElement('img');
        crewImage.className = 'crew-image';
        if(crew[i].profile_path == null){crewImage.src = './img/Unavailable.jpg'}else{
          crewImage.src = 'https://image.tmdb.org/t/p/w500' + crew[i].profile_path};
        crewCard.appendChild(crewJob);
        crewCard.appendChild(crewName);
        crewCard.appendChild(crewImage);
        crewCard.appendChild(crewPopularity);
        crewContainer.appendChild(crewCard);
        console.log(movieID)
        history.pushState(results,'' ,`credits.html#/movie/${movieID}/${searchTerm}` )
      }
    });;}else{
    movieID = results[i].id;
    movieURLFetch = 'https://api.themoviedb.org/3/tv/' + movieID + '/credits?api_key=' + apiKey;
    fetch(movieURLFetch)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      let cast = myJson.cast;
      let crew = myJson.crew;
      let castContainer = document.createElement('div');
      castContainer.innerHTML = '';
      castContainer.id = 'cast-container';
      castContainer.className = 'cast-container';
      let crewContainer = document.createElement('div');
      crewContainer.innerHTML = '';
      crewContainer.id = 'crew-container';
      crewContainer.className = 'crew-container';
      document.body.appendChild(castContainer);
      document.body.appendChild(crewContainer);
      for (let i = 0; i < cast.length; i++) {
        let castCard = document.createElement('div');
        castCard.className = 'cast-card';
        let castName = document.createElement('div');
        castName.className = 'cast-name';
        castName.innerHTML = cast[i].name;
        let castCharacter = document.createElement('div');
        castCharacter.className = 'cast-character';
        castCharacter.innerHTML = cast[i].character;
        let castPopularity = document.createElement('div');
        castPopularity.className = 'cast-popularity';
        castPopularity.innerHTML = cast[i].popularity;
        let castImage = document.createElement('img');
        castImage.className = 'cast-image';
        if(cast[i].profile_path == null){castImage.src = './img/Unavailable.jpg'}else{
          castImage.src = 'https://image.tmdb.org/t/p/w500' + cast[i].profile_path};
        castCard.appendChild(castName);
        castCard.appendChild(castCharacter);
        castCard.appendChild(castPopularity);
        castCard.appendChild(castImage);
        castContainer.appendChild(castCard);
      }
      for (let i = 0; i < crew.length; i++) {
        let crewCard = document.createElement('div');
        crewCard.className = 'crew-card';
        let crewJob = document.createElement('div');
        crewJob.className = 'crew-job';
        crewJob.innerHTML = crew[i].job;
        let crewName = document.createElement('div');
        crewName.className = 'crew-name';
        crewName.innerHTML = crew[i].name;
        let crewPopularity = document.createElement('div');
        crewPopularity.className = 'crew-popularity';
        crewPopularity.innerHTML = crew[i].popularity;
        let crewImage = document.createElement('img');
        crewImage.className = 'crew-image';
        if(crew[i].profile_path == null){crewImage.src = './img/Unavailable.jpg'}else{
          crewImage.src = 'https://image.tmdb.org/t/p/w500' + crew[i].profile_path};
        crewCard.appendChild(crewJob);
        crewCard.appendChild(crewName);
        crewCard.appendChild(crewImage);
        crewCard.appendChild(crewPopularity);
        crewContainer.appendChild(crewCard);
        history.pushState(results,'' ,`credits.html#/tv/${movieID}/${searchTerm}` )
      }
    })
  };
}}})  .catch(err => searchResults.innerHTML = ("[Fetch Error]:", err));}

;
