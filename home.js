const form = document.querySelector('#search-form');
const list = document.querySelector('#list-of-shows');
const input = document.querySelector('#title-searched');
input.value = '';


const getShows = async function (searchedText) {

    const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchedText}`);
    const shows = result.data;
    if (shows.length === 0) {
        const newErr = document.createElement('p');
        newErr.append(`Sorry, no Tv Shows found for: ${searchedText}.`);
        list.appendChild(newErr);
    }
    for (let el of shows) {
        if (el.show.image) {
            const newLi = document.createElement('li');
            const newImg = document.createElement('img');
            newImg.src = el.show.image.medium;
            newImg.classList.add('li-image');
            newLi.appendChild(newImg);
            list.appendChild(newLi);
            newLi.classList.add('list-item');
            const showId = el.show.id;
            newImg.addEventListener('click', async () => {
                document.location.href = `http://localhost:3000/tv-shows/${showId}`;
            })
        } else {
            const newLi = document.createElement('li');
            const newImg = document.createElement('div');
            newImg.innerHTML = '<div class="show-name-li">' + el.show.name + '</div>';
            newImg.classList.add('li-image');
            newImg.classList.add('box-no-img');
            newLi.appendChild(newImg);
            list.appendChild(newLi);
            newLi.classList.add('list-item');
            const showId = el.show.id;
            newImg.addEventListener('click', async () => {
                document.location.href = `http://localhost:3000/tv-shows/${showId}`;
            })
        }
    }    
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (list.innerHTML) {
        list.innerHTML = '';
    }
    const searchedTitle = input.value;
    await getShows(searchedTitle);
})
