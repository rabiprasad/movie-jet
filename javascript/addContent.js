//fetches movies from tmdb using appropriate url.
export function addContent(url){
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            displayContent(data);
        })
        .catch(err => {
            console.log(err);
        });
    }    
    
//Adds movies in webpage.
function displayContent(data){
    const contentBox = document.querySelector('.content-box');
    const results = data.results;

    results.forEach(e => {
        const element = document.createElement('div');
        element.dataset.id = e.id;
        element.dataset.popularity = e.popularity;
        let title = e.name || e.original_name || e.original_title;

        const content = `<img src="https://image.tmdb.org/t/p/w300/${e.poster_path}" alt="Movie Poster">
                        <h4 data-rating="${e.vote_average}" >${title}</h4>
                        <div class="release-date">${e.release_date || ""}</div>`;

        element.innerHTML = content;
        element.classList.add('movie-template');
        contentBox.append(element);
    })    
}
