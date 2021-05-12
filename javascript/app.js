import * as endPoint from "./endPoint.js";
import {showMovieDetail, getMovieId} from "./movieDetail.js";
import {addContent} from './addContent.js';

//selecting elements from web page.
const contentBox = document.querySelector('.content-box');
const categoryBar = document.querySelector('.category-bar');
const errorPage = document.querySelector('.error-page');
const categories = categoryBar.children;

let currentCategory;  //keeps track of current category selected
let searchBoxStatus = false;  //keeps track if search box is active of not.
let page = 1;      //page number to fetch movies from specific page

//Adds movies(now_playing i.e. trending) when page is loaded for first time.
document.addEventListener('DOMContentLoaded', () => {
    currentCategory = 'now_playing';
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    
    highlightCurrentCategory(currentCategory);
    //fetchConfig();
});

//Adds movies when specific category is selected.
categoryBar.addEventListener('click', e => {
    contentBox.innerHTML = ``;      //clearing movies of previous category.
    page = 1;                       //resetting page number to 1.
    searchBoxStatus = false;        

    currentCategory = e.target.id;
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    highlightCurrentCategory(currentCategory);
    errorPage.classList.remove('show-error-message');
});

//Adds more movies if user reaches to end of page.
window.addEventListener('scroll',() => {
    let webPageHeight = document.body.offsetHeight;
    let screenBottom = window.innerHeight+window.pageYOffset;
    // console.log('webpageHeight: ',webPageHeight);
    // console.log('windows.innerHeight: ',window.innerHeight,'window.pageYOffset',window.pageYOffset);
    // console.log('ScrrenBottom: ',screenBottom);
    if(screenBottom >= webPageHeight){
        if(searchBoxStatus){
            addContent(endPoint.movieSearchURL(currentCategory,page++));
        }
        else{
        addContent(endPoint.movieCollectionURL(currentCategory,page++));
        }
    }
});

/****  search-bar eventListener  ****/
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const movieDetailContainer = document.querySelector('.movie-detail-container');

searchButton.addEventListener('click',(e) => {
    e.preventDefault();
    let movieName = searchBox.value;
    movieName = movieName.split(" ").join("%20");

    contentBox.innerHTML = ``;      //clearing movies of previous category.
    page = 1;                       //resetting page number to 1.
    currentCategory = movieName;
    searchBoxStatus = true;

    addContent(endPoint.movieSearchURL(movieName,page++));
    addContent(endPoint.movieSearchURL(movieName,page++));

    searchBox.value = "";
    highlightCurrentCategory(currentCategory);
    errorPage.classList.remove('show-error-message');
    
});

//Shows detail of movies upon clicking of it's poster

contentBox.addEventListener('click',e => {
    const movieId = e.target.closest('.movie-template').dataset.id;
    showMovieDetail(parseInt(movieId));
});


//closes movie detail container
const closeContainerBtn = document.querySelector('.movie-detail-container .close-btn');

closeContainerBtn.addEventListener('click',() => {
    movieDetailContainer.classList.remove('show-container');
});

/**********helper functions*********/

/*highlights current category in web page*/
function highlightCurrentCategory(currentCategory){
    if(searchBoxStatus){
        Array.from(categories).forEach(category => {
            category.classList.remove('current-category');
        });
    }
    else{
        Array.from(categories).forEach(category => {
            if(category.id === currentCategory){
                category.classList.add('current-category');
            }
            else {category.classList.remove('current-category');}
        });
    }
}
/* development functions */
function fetchConfig() {
    fetch(endPoint.fetchConfig.url)
        .then(response => response.json())
        .then(data => console.log(data));
}

