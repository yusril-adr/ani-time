import { getUser } from './db.js';
import notFoundContent from '../content/page-404.html'
import homeContent from '../content/home.html';
import loadHome from './pages/home.js';
import topListContent from '../content/top-list.html';
import loadTopList from './pages/top-list.js';
import seasonListContent from '../content/season-list.html';
import loadSeasonList from './pages/season-list.js';
import searchContent from '../content/search.html';
import loadSearch from './pages/search.js';
import yourListContent from '../content/your-list.html';
import loadYourList from './pages/your-list.js'; 
import animeContent from '../content/anime.html';
import loadAnime from './pages/anime.js';
import settingContent from '../content/setting.html';
import loadSetting from './pages/setting.js';

const loadPage = () => {
    const wrapper = document.querySelector(".wrapper");

    // With Animation
    const content = document.createElement("div");
    content.setAttribute("id", "new-content");
    
    //Animation Style
    content.style.width = "100%";
    content.style.position = "fixed";
    content.style.backgroundColor = "white";
    content.style.opacity = 0;
    content.style.zIndex = "998";
    content.style.top = `${outerHeight}px`;
    content.style.bottom = "0";

    let page = location.hash.substr(1);
    if(!page || page === "") page = 'home';

    // Ignore Params in Anime
    if ( page.includes("?") ) {
        page = page.slice(0, page.indexOf("?"))
    }

    let htmlContent;
    switch(page) {
        case 'home':
            htmlContent = homeContent;
        break;

        case "top-list":
            htmlContent = topListContent;
        break;

        case "season-list":
            htmlContent = seasonListContent;
        break;

        case "search":
            htmlContent = searchContent;
        break;

        case "your-list":
            htmlContent = yourListContent;
        break;

        case "anime":
            htmlContent = animeContent;
        break;

        case "setting":
            htmlContent = settingContent;
        break;

        default :
            htmlContent = notFoundContent;
    }

    // Without Animation
    // wrapper.innerHTML = htmlContent;
    // loadJS();

    // Animation
    content.innerHTML = htmlContent;
    wrapper.appendChild(content);
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    $("#new-content").animate({"top": 0, "opacity": 1}, 300, () => {

        $("#new-content").removeAttr("style");
        $("#new-content").removeAttr("id");

        if (wrapper.childNodes.length > 1) {
            wrapper.removeChild(wrapper.childNodes[0]);
        }

        loadJS();
    });
}

const backPage = () => {
    const wrapper = document.querySelector(".wrapper");

    const oldContent = document.createElement("div");
    oldContent.setAttribute("id", "old-content");
    const newContent = document.createElement("div");
    newContent.setAttribute("id", "new-content");
    
    //Animation Style
    oldContent.style.width = "100%";
    oldContent.style.position = "fixed";
    oldContent.style.backgroundColor = "white";
    oldContent.style.opacity = 0;
    oldContent.style.zIndex = "998";
    oldContent.style.top = "0";
    oldContent.style.bottom = "0";

    let page = location.hash.substr(1);
    if(!page || page === "") page = 'home';

    // Ignore Params in Anime
    if ( page.includes("?") ) {
        page = page.slice(0, page.indexOf("?"))
    }

    let htmlContent;
    switch(page) {
        case 'home':
            htmlContent = homeContent;
        break;

        case "top-list":
            htmlContent = topListContent;
        break;

        case "season-list":
            htmlContent = seasonListContent;
        break;

        case "search":
            htmlContent = searchContent;
        break;

        case "your-list":
            htmlContent = yourListContent;
        break;

        case "anime":
            htmlContent = animeContent;
        break;

        case "setting":
            htmlContent = settingContent;
        break;

        default :
            htmlContent = notFoundContent;
    }

    oldContent.innerHTML = wrapper.innerHTML;
    newContent.innerHTML = htmlContent;
    wrapper.innerHTML = "";
    wrapper.appendChild(oldContent);
    wrapper.appendChild(newContent);

    $("#old-content").animate({"top": `${innerHeight}px`, "opacity": 1}, 300, () => {

        $("#new-content").removeAttr("style");
        $("#new-content").removeAttr("id");

        if (wrapper.childNodes.length > 1) {
            wrapper.removeChild(wrapper.childNodes[0]);
        }

        loadJS();
    });
}

const loadJS = () => {
    let page = location.hash.substr(1);
    if(!page || page === "") page = 'home';

    // Ignore Params in Anime
    if ( page.includes("?") ) {
        page = page.slice(0, page.indexOf("?"))
    }

    switch(page) {
        case 'home':
            loadHome();
        break;

        case 'top-list':
            loadTopList();
        break;

        case 'season-list':
            loadSeasonList();
        break;

        case "search":
            loadSearch();
        break;

        case "your-list":
            loadYourList();
        break;

        case "anime":
            loadAnime();
        break;

        case "setting":
            loadSetting();
        break;
    }

    // Sidnav
    const sideNav = document.querySelector('.sidenav');
    if (sideNav) {
        getUser(0)
        .then( data => {
            sideNav.querySelector(".name").innerHTML = data.name;
            sideNav.querySelector(".email").innerHTML = data.email;
        });

        const sideNavInstance = M.Sidenav.init(sideNav, {draggable: true});
        sideNav.addEventListener("click", () => {
            sideNavInstance.close();
        });
    }

    // Back button
    const backBtn = document.querySelector(".back-trigger");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            history.back();
        });
    }
}

export {loadPage, backPage};