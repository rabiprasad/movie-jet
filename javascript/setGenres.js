
export default {
        set(requestObj){
        fetch(requestObj.url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            addGenres(data);
        })
        .catch(err => {
            console.log(err);
        });
    
        
    
    }
}

function addGenres(data){
    const genreNav = document.querySelector('.genre');
    data.genres.forEach( (genre) => {
        let element = document.createElement('li');
        element.dataset.genreId = genre.id;
        element.textContent = genre.name;
        genreNav.append(element);
    });
}