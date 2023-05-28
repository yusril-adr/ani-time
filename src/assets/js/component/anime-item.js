class AnimeItem extends HTMLElement {
    set load(anime) {
        this.anime = anime;
        this.render();
    }
    render() {
        let title = this.anime.title;
        if ( this.anime.title.length > 50) {
            title = this.anime.title.slice(0, 50) + "...";
        }

        let score = this.anime.score;
        if (this.anime.score === null || !this.anime.score) {
            score = "???";
        }

        let episodes = this.anime.episodes;
        if (this.anime.episodes === null || !this.anime.episodes) {
            episodes = "?";
        }

        this.innerHTML = 
        `
        <div class="item-img">
            <img class="anime-img" src="${this.anime.images.jpg.image_url}" alt="${this.anime.title} Banner">
        </div>
        <div class="item-caption">
            <span class="item-title">${title}</span>
            <div class="item-subcaption">
                <span class="item-rating">${score}</span>
                <span class="item-type">${this.anime.type}</span>
                <span class="item-episodes">${episodes} Episodes</span>
            </div>
        </div>
        `;

        this.imageCheck();
    }

    imageCheck() {
        fetch(this.anime.images.jpg.image_url, {mode: "no-cors"})
        .catch( error => {
            if (error.message === "Failed to fetch") {
                this.querySelector(".anime-img").setAttribute("src", "assets/img/unknown.png");
            }
        })
    }
}

customElements.define("anime-item", AnimeItem);