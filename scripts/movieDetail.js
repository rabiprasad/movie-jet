import * as endPoint from './endPoint.js';
import {showMovieDetailContainer} from './app.js'

const movieDetailContainer = document.querySelector('.movie-detail-container');

export function visitCompanyWebsite(companyId){
    fetch(endPoint.companyWebsiteURL(companyId))
        .then(response => response.json())
        .then(companyDetail => window.open(`${companyDetail.homepage}`,"_blank"))    
        .catch(err => console.log(err));
}   

export function showMovieDetail(movieId){
    const url = endPoint.movieDetailURL(movieId) + `&append_to_response=videos`; 
    fetch(url)                                 //fetches movie detail with videos detail.
        .then( response =>  response.json())
        .then(movieDetail => addDetail(movieDetail))
        .catch(err => console.log(err));    //It will log errors as all company logos are unavailable
}

function addDetail(movieDetail){  

    addHeader(movieDetail);
    addBasicInfo(movieDetail);
    addProviders(movieDetail.id);
    addStats(movieDetail);
    addProductionCompanies(movieDetail.production_companies);
    movieDetailContainer.style.backgroundImage = 
        `url('https://image.tmdb.org/t/p/w1280${movieDetail.backdrop_path}')`;
    
    showMovieDetailContainer();
}

/*---- Helper functions ----*/
function addHeader(movieDetail){
    const title = movieDetail.title || movieDetail.name || movieDetail.original_title || movieDetail.original_name;
    const header = movieDetailContainer.querySelector('.movie-detail-header');
    header.querySelector('h4').textContent = title;
    header.querySelector('span').textContent = movieDetail.genres[0].name; 
}

function addBasicInfo(movieDetail){
    
    let trailerLink;             //Its add no trailer link if API doesn't provide any link
    if(movieDetail.videos.results.length > 0) {trailerLink = movieDetail.videos.results[0].key;}
    else {trailerLink = "#";}

    let tempString = 
        `<img class="movie-image" src="https://image.tmdb.org/t/p/w780${movieDetail.backdrop_path}" alt="movie banner" >
        <div class="overview">
            <h4>overview</h4>
            <p>${movieDetail.overview}</p>
        </div>
        <a class="watch-trailer" href="https://www.youtube.com/watch?v=${trailerLink}" target="_blank">watch trailer</a>
        <h4>Release Date</h4> 
        <p class="release-date">${movieDetail.release_date}</p>`;
    
    const basicInfoElement = movieDetailContainer.querySelector('.basic-info');
    basicInfoElement.innerHTML = tempString;

}

function addProviders(movieId){
    fetch(endPoint.movieProviderURL(movieId))
        .then(response => response.json())
        .then(json => addFunction(json))
        .catch(err => console.log(err));
    
    function addFunction(providers){
        let providersArray = [];
        //will choose countryProvider in order India -> US -> first available country.
        const countryProviders = providers.results.US || providers.results[Object.keys(providers.results)[0]]; 
        const keys = Object.keys(countryProviders);
        const watchLink = countryProviders[keys[0]];   
        let tempString = ``;

        for(let i=1; i<keys.length; i++){
            countryProviders[keys[i]].forEach(platform => {
                if(!providersArray.includes(platform.provider_name)){ //checks if provider is repeated.
                    tempString += 
                    `<a data-name="${platform.provider_name}" href="${watchLink}" target="_blank">
                        <img src="https://image.tmdb.org/t/p/w45${platform.logo_path}" alt="">
                    </a>`;
                    providersArray.push(platform.provider_name);
                }
            });
        }
        movieDetailContainer.querySelector('.platforms').innerHTML = tempString;
    }
}

function addStats(movieDetail){
    let tempString = 
        `<li>Rating: ${movieDetail.vote_average} <i class="fas fa-star"></i></li>
        <li>Popularity: ${movieDetail.popularity.toFixed(1)}</li>
        <li>Runtime: ${movieDetail.runtime} min</li>
        <li>Rated by: ${movieDetail.vote_count}</li>
        <li>Budget: ${(movieDetail.budget/1000000).toFixed(1)} M</li>
        <li>Revenue: ${(movieDetail.revenue/1000000).toFixed(1)} M</li>`;

    movieDetailContainer.querySelector('.stats ul').innerHTML = tempString;
}

function addProductionCompanies(productionCompanies){
    const element = movieDetailContainer.querySelector('.companies-detail');
    let tempString = ``;
    productionCompanies.forEach(company => {
        tempString += 
            `<div class="company-logo" data-name="${company.name}" data-company-id="${company.id}">
            <img src="https://image.tmdb.org/t/p/w45${company.logo_path}" alt=""></div>`
    });
    element.innerHTML = tempString;
}
