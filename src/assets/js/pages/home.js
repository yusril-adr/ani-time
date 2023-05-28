import '../component/home-carousel.js';

// Import logo
import logoImg from '../../img/logo.png';

const dataLimit = 10;

const loadHome = async () => {
    const base_url = "https://api.jikan.moe/v4";

    document.querySelector(".logo-img").setAttribute("src", logoImg);

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
    await fetch(`${base_url}/schedules?sfw=true&filter=${day}&limit=${dataLimit}`)
    .then( response => {
        return response.json();
    }).then( responseJson => {
        const listElement = document.querySelector("home-carousel.today-list");
        listElement.load = responseJson.data;
    }).catch( error => {
        const listElement = document.querySelector("home-carousel.today-list");
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
    });

    // Fetch Top List
    await fetch(`${base_url}/top/anime?limit=${dataLimit}&page=${1}`)
    .then( response => {
        return response.json();
    }).then( responseJson => {
        const listElement = document.querySelector("home-carousel.top-list");
        listElement.load = responseJson.data;
    }).catch( error => {
        const listElement = document.querySelector("home-carousel.top-list");
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
    });

    // Fetch Season List
    await fetch(`${base_url}/seasons/${year}/${season}?limit=${dataLimit}`)
    .then( response => {
        return response.json();
    }).then( responseJson => {
        const listElement = document.querySelector("home-carousel.season-list");
        listElement.load = responseJson.data;
    }).catch( error => {
        console.log(error)
        const listElement = document.querySelector("home-carousel.season-list");
        if (error.message === "Failed to fetch") {
            listElement.noInternet();
        } else {
            listElement.error();
        }
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

    document.querySelector(".about-trigger").addEventListener("click", () => {
        Swal.fire({
            title: 'About',
            html: `
                <div class= "about">
                    <span>Created by Yusril A. P.</span>
                    <span>Logo by Dwi Randi R.</span>
                    <span>Thanks to <a href="https://jikan.moe">jikan API</a></span>
                </div>
            `,
            footer: `
                <div class= "about-footer center-align">
                    <a href="https://www.instagram.com/yusril_adr"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.facebook.com/yusril.adr"><i class="fab fa-facebook"></i></a>
                    <a href="https://github.com/yusril-adr"><i class="fab fa-github"></i></a>
                </div>
            `,
            // icon: 'info',
            imageUrl: "icon.png",
            imageAlt: "ANi-TIME Icon",
            imageWidth: 100,
            imageHeight: 100,
        })
    });
}

export default loadHome;