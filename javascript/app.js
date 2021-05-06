import endPoint from "./request.js";
import setGenres from './setGenres.js';
import {add} from './addContent.js';

//console statement
console.log('hi');




let currentGenre;
document.addEventListener('DOMContentLoaded',() => {

    //setGenres.set(endPoint.fetchGenre);
    const currentGenre = document.querySelector('.genre li[data-genre-id="0"]');
    currentGenre.classList.add('current-genre')

    add(endPoint.fetchTrending);
    //fetchConfig();
});

function fetchConfig() {
    fetch(endPoint.fetchConfig.url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
}

