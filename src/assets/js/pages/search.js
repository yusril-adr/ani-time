import "../component/anime-list.js";

const searchList = (word) => {
    const base_url = "https://api.jikan.moe/v3";
    const listElement = document.querySelector(".search-page anime-list");

    listElement.connectedCallback();

    fetch(`${base_url}/search/anime?q=${word}`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        }

        return response.json();
    }).then( json => {
        return json.results;
    }).then( animeList => {
        if (animeList.length > 0) listElement.load = animeList;
        else listElement.isEmpty();
    }).catch( error => {
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
    });
};

const loadSearch = () => {
    const searchElement = document.querySelector("#search");
    const listElement = document.querySelector(".search-page anime-list");

    listElement.searchConnected();

    searchElement.addEventListener("keypress", event => {
        if (event.key === "Enter" && searchElement.value !== "") {
            searchList(searchElement.value);
        } else {
            listElement.searchConnected();
        }
    });
}

export default loadSearch;