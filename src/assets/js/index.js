import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';

import "../css/style.css";

// Import unknwon image
import "../img/unknown.png";

import { loadPage, backPage } from "./loadPage.js";

// Register Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("service-worker.js")
    });
} else {
    Swal.fire({
        title: 'PWA is not supported by this browser',
        text: 'Some feature may not available',
        icon: 'warning',
    })
}

const isBack = (now, then) => {
    const pageOfList = [
        "top-list", 
        "season-list",
        "search",
        "your-list"
    ];

    if ( now === "anime" && pageOfList.indexOf(then) !== -1 ) {
        return true;
    }

    if ( then === "home") {
        return true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadPage();

    const loading = document.querySelector(".loading-container");
    document.body.removeChild(loading);

    const topBtn = document.querySelector('.fixed-action-btn');
    const topBtnInstance = M.FloatingActionButton.init(topBtn);

    document.querySelector("html").removeAttribute("style");
    topBtn.addEventListener("click", () => {
        document.querySelector("html").style.scrollBehavior = "smooth";
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    });

    document.addEventListener("scroll", () => {
        if (document.body.scrollTop > 85 || document.documentElement.scrollTop > 85) {
            topBtn.setAttribute("id", "btn-appear");
        } else {
            topBtn.setAttribute("id", "btn-disappear");
        }
    });
    
    window.onhashchange = function(data) {
        // Before URL
        let URL = data.oldURL;
        let str = URL.split("/#");
        let before = str[1];
        if(!before || before === "") before = 'home';
        // Ignore Params in Anime
        if ( before.includes("?") ) {
            before = before.slice(0, before.indexOf("?"));
        }

        // After URL
        URL = document.URL;
        str = URL.split("/#");
        let after = str[1];
        if ( !after || after === "" ) after = 'home';
        // Ignore Params in Anime
        if ( after.includes("?") ) {
            after = after.slice(0, after.indexOf("?"));
        }

        if ( isBack(before, after) ) {
            backPage();
        } else {
            loadPage();
        }
    }
});