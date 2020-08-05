class Homeitem extends HTMLElement {
    set load(anime) {
        this.anime = anime;
        this.render();
    }
    render() {
        let title;
        if(this.anime.title.length > 18) {
            title = this.anime.title.slice(0, 18)+"...";
        } else {
            title = this.anime.title;
        }
        
        this.innerHTML = 
        `
        <a href="#anime?id=${this.anime.mal_id}">
            <div class="item-container center-align">
                <div class="img-container">
                    <img class="anime-img" src="${this.anime.image_url}" alt="${title}-Banner">
                </div>
                <span class="carousel-title black-text">${title}</span>
            </div>
        </a>
        `;

        this.imageCheck();
    }

    imageCheck() {
        fetch(this.anime.image_url)
        .catch(error => {
            if (error.message === "Failed to fetch", {mode: "no-cors"}) {
                this.querySelector(".anime-img").setAttribute("src", "assets/img/unknown.png");
            }
        })
    }
}

customElements.define("home-item", Homeitem);