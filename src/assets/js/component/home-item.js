class Homeitem extends HTMLElement {
    set load(anime) {
        this.anime = anime;
        this.render();
    }
    render() {
        let title;
        if(this.anime.title.length > 30) {
            title = this.anime.title.slice(0, 30)+"...";
        } else {
            title = this.anime.title;
        }
        
        this.innerHTML = 
        `
        <a href="#anime?id=${this.anime.mal_id}">
            <div class="item-container center-align">
                <div class="img-container">
                    <img src="${this.anime.image_url}" alt="${title}-Banner">
                </div>
                <span class="carousel-title black-text">${title}</span>
            </div>
        </a>
        `;
    }
}

customElements.define("home-item", Homeitem);