import "../component/anime-list.js";

const searchList = (word) => {
    const base_url = "https://api.jikan.moe/v4";
    const listElement = document.querySelector(".search-page anime-list");

    listElement.connectedCallback();

    fetch(`${base_url}/anime?q=${word}&sfw=true`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        }

        return response.json();
    }).then( animeList => {
        if (animeList.data.length > 0) listElement.load = animeList.data;
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