//tmdm
let lang = ''

const en = document.querySelector('#btn-en')
const pt = document.querySelector('#btn-pt')
const form = document.querySelector('#form')

pt.addEventListener('click', (e) => {
    e.preventDefault()
    lang = '&language=pt-BR'
    getMovies(API_URL + lang)
})

en.addEventListener('click', (e) => {
    e.preventDefault()
    lang = ''
    getMovies(API_URL + lang)
})


const API_KEY = 'api_key=7ece54c7a152880382bf96c3e7f96e01';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY ;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const main = document.querySelector('#main')

const search = document.querySelector('#search')
const searchUrl = BASE_URL + '/search/movie?' + API_KEY;


const getColor = (vote) => {

    if(vote >= 8){
        return 'green'
    }else if(vote >= 5){
        return 'orange'
    }
    return 'red'
}

const showMovies = (data) => {
    main.innerHTML = '';
console.log(data);
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = ` 
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">

            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(movieEl)
    })
}

const getMovies = async (url) => {
    const response = await fetch(url);
    const data = await response.json().then(data => data.results);
    
    showMovies(data)
}

getMovies(API_URL)

search.addEventListener('input', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchUrl + lang + '&query=' + searchTerm)
    }else {
        getMovies(API_URL + lang)
    }
})

 