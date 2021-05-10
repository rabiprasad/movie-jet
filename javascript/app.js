import endPoint from "./endPoint.js";
import {addContent} from './addContent.js';

//selecting elements from web page.
const contentBox = document.querySelector('.content-box');
const categoryBar = document.querySelector('.category-bar');
const categories = categoryBar.children;

let currentCategory;
let page = 1;      //page number to fetch movies from specific page

//Adds movies(now_playing i.e. trending) when page is loaded for first time.
document.addEventListener('DOMContentLoaded', () => {
    currentCategory = 'now_playing';
    addContent(endPoint(currentCategory,page++));
    addContent(endPoint(currentCategory,page++));
    
    highlightCurrentCategory(currentCategory);
    //fetchConfig();
});

//Adds movies when specific category is selected.
categoryBar.addEventListener('click', e => {
    contentBox.innerHTML = ``;      //clearing movies of previous category.
    page = 1;                       //resetting page count to 1.

    currentCategory = e.target.id;
    addContent(endPoint(currentCategory,page++));
    addContent(endPoint(currentCategory,page++));
    highlightCurrentCategory(currentCategory);
});

//Adds more movies if user reaches to end of page.
window.addEventListener('scroll',() => {
    let webPageHeight = document.body.offsetHeight;
    let ScreenBottom = screen.height+window.pageYOffset;
    
    if(ScreenBottom >= webPageHeight){
        addContent(endPoint(currentCategory,page++));
        webPageHeight = document.body.offsetHeight;
    }
});












/*helper functions */
function highlightCurrentCategory(currentCategory){
    Array.from(categories).forEach(category => {
        if(category.id === currentCategory){
            category.classList.add('current-category');
        }
        else{
            category.classList.remove('current-category');
        }
    })
}
/* development functions */
function fetchConfig() {
    fetch(endPoint.fetchConfig.url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
}

