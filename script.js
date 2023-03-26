const initialURL = "https://api.themoviedb.org/3/discover/movie?api_key=05a9d32cebaf91a7932d095644c5e2b1&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_watch_monetization_types=flatrate";
const searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=05a9d32cebaf91a7932d095644c5e2b1&query=';
const imageURL = "https://image.tmdb.org/t/p/w500";

const main = document.querySelector(".main");
const search = document.querySelector(".search");
const form = document.querySelector("#form");

search.focus();
getMovies(initialURL);

form.addEventListener("submit", e => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm !== "") {
        getMovies(`${searchURL}"${searchTerm}"`);
        console.log(`${searchURL}"${searchTerm}"`);
    } else {
        location.reload();
    }
})

async function getMovies(URL) {
    const res = await fetch(URL);
    const data = await res.json();
    showMovies(data.results);
    console.log(data.results);
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach(movie => {
        const {title, vote_average, overview, poster_path} = movie;
        const rating = parseFloat(vote_average).toFixed(1);
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `<img src="${imageURL+poster_path}" alt="${title}" class="movie__poster">
        <div class="movie__info">
            <h3 class="movie__name">${title}</h3>
            <span class="movie__rating ${getMovieRatingClass(rating)}">${rating}</span>
        </div>
        <p class="movie__overview">${overview}</p>`
        main.appendChild(movieEl);
    });
}

function getMovieRatingClass(vote) {
    if (vote >= 8) {
        return "green";
    }
    else if (vote >= 7) {
        return "yellow";
    }
    else if (vote >= 6) {
        return "orange";
    }
    else {
        return "red"
    }
}