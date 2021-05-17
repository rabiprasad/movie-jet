const errorPage = document.querySelector('.error-page');

//fetches movies from tmdb using appropriate url.
//function has been make async so that fillWholePage(function) can be synchronies.
export  async function addContent(url){
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            const page = url.slice(-1);            //determining page number from last character of url.
            if(data.results.length <= 0 && url.slice(-1) == 1){
                errorPage.classList.add('show-error-message');
            }
            displayContent(data);
        })
        .catch(err => console.log(err));
}    
    
//Adds movies in webpage.
function displayContent(data){
    const contentBox = document.querySelector('.content-box');
    const results = data.results;

    results.forEach(e => {
        const element = document.createElement('div');
        element.dataset.genre = e.genre_ids;
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
