import "../component/anime-list.js";

const dataLimit = 10;

const fetchList = (type) => {
    const base_url = "https://api.jikan.moe/v4";
    const listElement = document.querySelector(".top-list-page anime-list");

    listElement.connectedCallback();

    fetch(`${base_url}/top/anime?sfw=${true}&limit=${dataLimit}`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        }

        return response.json();
    }).then( animeList => {
        listElement.load = animeList.data;
    }).catch( error => {
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
    });
}

const loadTopList = () => {
    // Selecting type by default
    const typeElem = document.querySelector('select#type');
    const instances = M.FormSelect.init(typeElem);

    fetchList();

    typeElem.addEventListener("change", () => {
        fetchList(typeElem.value);
    });
}

export default loadTopList;