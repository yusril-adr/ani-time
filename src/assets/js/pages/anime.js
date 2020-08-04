import '../component/anime-detail.js';
import { addAnime, getAnime, deleteAnime } from '../db.js';

const isSaved = () => {
    const saveBtn = document.querySelector("#saveBtn a");
    saveBtn.setAttribute("saved", "true");
    saveBtn.innerHTML = '<i class="material-icons left">bookmark</i><span class="hide-on-small-only">Bookmark</span>';
}

const notSaved = () => {
    const saveBtn = document.querySelector("#saveBtn a");
    saveBtn.setAttribute("saved", "false");
    saveBtn.innerHTML = '<i class="material-icons left">bookmark_border</i><span class="hide-on-small-only">Bookmark</span>';
}

const loadAnime = async () => {
    const base_url = "https://api.jikan.moe/v3";
    const now = Date.now();
    const urlParams = location.hash.substr(location.hash.indexOf("?")+1);
    let animeId = parseInt(urlParams.slice(urlParams.indexOf("id=")+3)) || "";
    const animeElem = document.querySelector("anime-detail");
    let animeData;

    await getAnime(animeId)
    .then( async animeDb => {
        if (animeDb) {
            isSaved();

            animeData = animeDb;

            animeElem.load = animeDb;
        } else {
            await fetch(`${base_url}/anime/${animeId}`)
            .then( response => {
                if ( response.status !== 200 ) { 
                    return Promise.reject();
                }

                return response.json();
            }).then( anime => {
                animeData = anime;

                animeElem.load = anime;
            }).catch( error => {
                if (error.message === "Failed to fetch") {
                    animeElem.noInternet();
                } else {
                    animeElem.error();
                }
            });

            notSaved();
        }
    });
    
    // Save to Db
    const saveBtn = document.querySelector("#saveBtn a");
    saveBtn.addEventListener("click", () => {
        switch(saveBtn.getAttribute("saved")) {
            case "true":
                notSaved();
                M.toast({
                    html: 'Removed from your list.',
                    completeCallback: deleteAnime(animeId)
                });
            break;

            case "false":
                isSaved();
                animeData.date_add_list = now;
                M.toast({
                    html: 'Added to your list.', 
                    completeCallback: addAnime(animeData)
                });
            break;
        }
    });

    // Tab
    const tabsElem = document.querySelector(".tabs");
    const instance = M.Tabs.init(tabsElem);

    document.querySelectorAll(".tab-text").forEach( tab => {
        tab.addEventListener("click", ()=> {
            if(tab.innerHTML.toLowerCase() === "detail") animeElem.detail();
            if(tab.innerHTML.toLowerCase() === "synopsis") animeElem.synopsis();
            if(tab.innerHTML.toLowerCase() === "trailer") animeElem.trailer();
        });
    });
}

export default loadAnime;