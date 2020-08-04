const updateList = (year, season, type) => {
    const base_url = "https://api.jikan.moe/v3";
    const listElement = document.querySelector("anime-list");

    listElement.connectedCallback();

    fetch(`${base_url}/season/${year}/${season}`)
    .then( response => {
        if ( response.status !== 200 ) { 
            return Promise.reject();
        };

        return response.json();
    }).then( json => {
        return json.anime.filter( anime => {
            return !anime.r18 && anime.type === type;
        });
    }).then( animeList => {
        if (animeList.length > 1) {
            listElement.load = animeList;
        } else {
            listElement.isEmpty();
        }
    }).catch( error => {
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
    });
}

const loadSeasonList = () => {
    // Initiating Date & Season
    const date = new Date();
    let currentYear = date.getFullYear();
    let currentSeason;
    if (date.getMonth() <= 2) {
        currentSeason = "winter";
    } else if (date.getMonth() <= 5) {
        currentSeason = "spring";
    } else if (date.getMonth() <= 8) {
        currentSeason = "summer";
    } else if (date.getMonth() <= 11) {
        currentSeason = "fall";
    }

    // Selecting current year by default
    const yearElem = document.querySelector("#year-input");
    yearElem.setAttribute("value", currentYear);

    // Selecting current Season by Default
    const seasonElem = document.querySelector('select#season');
    const seasonList = ["winter", "spring", "summer", "fall"];
    seasonElem.options.selectedIndex = seasonList.indexOf(currentSeason);

    // Selecting Tv type by default
    const typeElem = document.querySelector('select#type');

    // Initial Select
    const selectElems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(selectElems);

    M.updateTextFields();

    // Fetch Current List
    updateList(currentYear, currentSeason, typeElem.value);

    yearElem.addEventListener("keydown", event => {
        if (event.key === "Enter" && yearElem.value !== "") {
            updateList(yearElem.value, seasonElem.value, typeElem.value);
        }
    });

    seasonElem.addEventListener("change", () => {
        updateList(yearElem.value, seasonElem.value, typeElem.value);
    });

    typeElem.addEventListener("change", () => {
        updateList(yearElem.value, seasonElem.value, typeElem.value);
    });
}

export default loadSeasonList;