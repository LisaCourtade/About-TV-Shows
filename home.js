const list = document.querySelector("#fav-shows");

const getFavoriteShows = async function () {
  const favoriteShowsId = [31365, 69, 49, 431];
  const getfavoriteShows = favoriteShowsId.map(async (showId) => {
    const result = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
    const response = result.data;
    return response;
  });
  const finalResult = await Promise.all(getfavoriteShows);

  for (let show of finalResult) {
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    newImg.src = show.image.medium;
    newImg.classList.add("fav-image");
    newLi.appendChild(newImg);
    list.appendChild(newLi);
    newLi.classList.add("list-item");
    const showId = show.id;
    newImg.addEventListener("click", async () => {
      document.location.href = `http://localhost:3000/tv-shows/${showId}`;
    });
  }
};

getFavoriteShows();
