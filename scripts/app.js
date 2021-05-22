import * as endPoint from "./endPoint.js";
import {showMovieDetail,visitCompanyWebsite} from "./movieDetail.js";
import {addContent} from './addContent.js';

//selecting elements from web page.
const mainHeader = document.querySelector('.main-header');
const contentBox = document.querySelector('.content-box');
const categoryBar = document.querySelector('.category-bar');
const errorPage = document.querySelector('.error-page');
const categories = categoryBar.children;

let currentCategory;  //keeps track of current category selected
let searchBoxStatus = false;  //keeps track if search box is active of not.
let page = 1;      //page number to fetch movies from specific page

//Adds movies(now_playing i.e. trending) when page is loaded for first time.
document.addEventListener('DOMContentLoaded', async () => {  //made async so that fillWholePage() executes after addContent()
    currentCategory = 'now_playing';
    await addContent(endPoint.movieCollectionURL(currentCategory,page++));
    await addContent(endPoint.movieCollectionURL(currentCategory,page++));
    fillWholePage();    
    highlightCurrentCategory(currentCategory);
});

//Adds movies when specific category is selected.
categoryBar.addEventListener('click', e => {
    if(Array.from(movieDetailContainer.classList).includes('show-container')){ 
        hideMovieDetailContainer();
        return;
    }
    
    contentBox.innerHTML = ``;      //clearing movies of previous category.
    page = 1;                       //resetting page number to 1.
    searchBoxStatus = false;
    errorPage.classList.remove('show-error-message');        

    currentCategory = e.target.id;
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    addContent(endPoint.movieCollectionURL(currentCategory,page++));
    highlightCurrentCategory(currentCategory);
});

//Adds more movies if user reaches to end of page.
window.addEventListener('scroll',() => {
    let webPageHeight = document.body.offsetHeight;
    let screenBottom = window.innerHeight + window.pageYOffset;
    
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
    if(!movieName) {return;}
    movieName = movieName.split(" ").join("%20");

    contentBox.innerHTML = ``;      //clearing movies of previous category.
    page = 1;                       //resetting page number to 1.
    currentCategory = movieName;
    searchBoxStatus = true;
    errorPage.classList.remove('show-error-message');

    addContent(endPoint.movieSearchURL(movieName,page++));
    addContent(endPoint.movieSearchURL(movieName,page++));

    searchBox.value = "";
    highlightCurrentCategory(currentCategory);
});


/*----- movie-detail-Container events----*/
//Shows detail of movies upon clicking of it's poster
contentBox.addEventListener('click',e => {
    if(Array.from(movieDetailContainer.classList).includes('show-container')){ 
        hideMovieDetailContainer();
    }
    else{
        const movieId = e.target.closest('.movie-template').dataset.id;
        showMovieDetail(parseInt(movieId));
    }
});

//visit company's website if clicked on its log
const companiesDetail = document.querySelector('.companies-detail');
companiesDetail.addEventListener('click', e => {
    const companyId = e.target.closest('.company-logo').dataset.companyId;
    visitCompanyWebsite(companyId);
});

//closes movie detail container
const closeContainerBtn = document.querySelector('.close-btn');
closeContainerBtn.addEventListener('click',() => {
    hideMovieDetailContainer();    
});
//closes movie detail container when clicked anywhere except movie-detail-container
mainHeader.addEventListener('click',() =>{
    if(Array.from(movieDetailContainer.classList).includes('show-container')){
        hideMovieDetailContainer();
    }
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

/* Adds more content if page is not filled by initial functions, useful when using ultra wide monitors*/
async function fillWholePage(){
    const webpageHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
    if(windowHeight >= webpageHeight){
        await addContent(endPoint.movieCollectionURL(currentCategory,page++));
        fillWholePage();
    }
}
function hideMovieDetailContainer(){ 
    movieDetailContainer.classList.remove('show-container');
    mainHeader.classList.remove('filter-background');
    contentBox.classList.remove('filter-background');
}

//Makes movie-detail-container visible exported to movieDetails.js
export function showMovieDetailContainer(){
    movieDetailContainer.classList.add('show-container');
    mainHeader.classList.add('filter-background');
    contentBox.classList.add('filter-background');
}
