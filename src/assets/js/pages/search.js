import "../component/anime-list.js";

const searchList = (word) => {
    const base_url = "https://api.jikan.moe/v3";
    const listElement = document.querySelector(".search-page anime-list");

    fetch(`${base_url}/search/anime?q=${word}`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        }

        return response.json();
    }).then( json => {
        return json.results;
    }).then( animeList => {
        listElement.load = animeList;
    }).catch( () => {
        listElement.error();
    });
};

const loadSearch = () => {
    const searchElement = document.querySelector("#search");
    const listElement = document.querySelector(".search-page anime-list");

    listElement.searchConnected();

    searchElement.addEventListener("keypress", event => {
        if (event.key === "Enter" && searchElement.value !== "") {
            searchList(searchElement.value);
        }
    });
}

export default loadSearch;