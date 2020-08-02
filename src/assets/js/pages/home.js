import '../component/home-carousel.js';

const loadHome = async () => {
    const base_url = "https://api.jikan.moe/v3";

    // Initiating Date & Season
    const date = new Date();
    const dayList = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const day = dayList[date.getDay()];
    const year = date.getFullYear();
    let season;
    if (date.getMonth() <= 2) {
        season = "winter";
    } else if (date.getMonth() <= 5) {
        season = "spring";
    } else if (date.getMonth() <= 8) {
        season = "summer";
    } else if (date.getMonth() <= 11) {
        season = "fall";
    }

    // Fetch Today List
    await fetch(`${base_url}/schedule/${day}`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json[day];
    }).then( animeList => {
        const listElement = document.querySelector("home-carousel.today-list");
        listElement.load = animeList;
    }).catch( () => {
        const listElement = document.querySelector("home-carousel.today-list");
        listElement.noInternet();
    });

    // Fetch Top List
    await fetch(`${base_url}/top/anime`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json.top.slice(0, 10);
    }).then( animeList => {
        const listElement = document.querySelector("home-carousel.top-list");
        listElement.load = animeList;
    }).catch( () => {
        const listElement = document.querySelector("home-carousel.top-list");
        listElement.noInternet();
    });

    // Fetch Season List
    await fetch(`${base_url}/season/${year}/${season}`)
    .then( response => {
        return response.json();
    }).then( json => {
        return json.anime.slice(0, 10);
    }).then( animeList => {
        const listElement = document.querySelector("home-carousel.season-list");
        listElement.load = animeList;
    }).catch( () => {
        const listElement = document.querySelector("home-carousel.season-list");
        listElement.noInternet();
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 7000,
        slideBy: 2,
        responsive: {
            0:{
                items:3
            },
            601:{
                items:4
            },
            1024:{
                items:5
            },
        }
    });
}

export default loadHome;