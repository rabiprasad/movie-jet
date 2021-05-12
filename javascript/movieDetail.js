import * as endPoint from './endPoint.js';

const searchBox = document.querySelector('.search-box');

//returns promise containing Id of movie. Takes movieName as input.
export function getMovieId(movieName){
    const url = endPoint.movieOverviewURL(movieName);

    const movieId = fetch(url)
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(json => {
            console.log(json);
            return json.results[0].id;
            
        })
        .catch(err => {
            searchBox.placeholder = 'Enter valid movie';
            searchBox.classList.add('danger');
        });

    return movieId;
}

export function showMovieDetail(movieId){
   
    fetch(endPoint.movieDetailURL(movieId))
        .then( response =>  response.json())
        .then(json => {
            searchBox.value = '';
            addDetail(json);
        })
        .catch(err => console.log(err));
}

function addDetail(detail){   //incomplete function:
    console.log(detail);
    const movieId = detail.id;
    const title = detail.title || detail.name || detail.original_title || detail.original_name;



    const movieDetailContainer = document.querySelector('.movie-detail-container');
    movieDetailContainer.classList.add('show-container');
}