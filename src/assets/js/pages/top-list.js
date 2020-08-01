import "../component/anime-list.js";

const fetchList = (type) => {
    const base_url = "https://api.jikan.moe/v3";
    const listElement = document.querySelector(".top-list-page anime-list");

    fetch(`${base_url}/top/anime`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        }

        return response.json();
    }).then( json => {
        if (!type) return json.top.slice(0, 10);

        return json.top.filter( anime => {
            return !anime.r18 && anime.type === type;
        }).slice(0, 10);
    }).then( animeList => {
        listElement.load = animeList;
    }).catch( () => {
        listElement.error();
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