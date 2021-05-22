import {API_KEY} from '../private.js';

/*returns url according to category and page required.
One page contains limited movie details.
*/
function movieCollectionURL(category,page){
    return `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`;
}
function movieDetailURL(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`; 
}
function movieSearchURL(query,page){
    return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`;
}
function movieProviderURL(movieId){
    return `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`;
}
function companyWebsiteURL(companyId){
    return `https://api.themoviedb.org/3/company/${companyId}?api_key=${API_KEY}`;
}

export {
    movieCollectionURL,
    movieSearchURL,
    movieDetailURL,
    movieProviderURL,
    companyWebsiteURL
};
