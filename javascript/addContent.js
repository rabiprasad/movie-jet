
export function add(fetchObj){
        fetch(fetchObj.url)
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
    

function displayContent(data){
    const arr = [];
    const contentBox = document.querySelector('.content-box');
    console.log(data.results);
    const results = data.results;

    results.forEach(e => {


        arr.push(e.original_title)
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = "../resources/depositphotos_235207814-stock-photo-landscape-winter-hokkaido.jpg";
        const title = document.createElement('h4');

        if(e.original_title){title.textContent = e.original_title;}
        else{title.textContent = e.original_name;}

        const span = document.createElement('span');
        span.textContent = e.vote_average;

        div.append(img,title,span);
        div.dataset.overview = e.overview;
        div.classList.add('movie-template');
        contentBox.append(div);
    })

    console.log(arr);
}