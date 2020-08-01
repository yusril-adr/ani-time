class AnimeDetail extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <div class="container empty-container center-align">
          <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-red">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-yellow">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
      
            <div class="spinner-layer spinner-green">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
        `;
    }

    set load(anime) {
        this.anime = anime;
        this.render();
    }
    render() {
        const anime = this.anime;
        this.innerHTML = 
        `
        <div class="anime-header light-blue darken-4">
            <div class="container header-container">
                <div class="img-container">
                    <img src="${anime.image_url}" alt="${anime.title} banner">
                </div>
                <div class="header-caption white-text">
                    <span class="header-title">${anime.title}</span>
                    <span class="header-status">${anime.type}, ${anime.status}</span>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                <ul class="tabs tabs-fixed-width light-blue darken-4">
                    <li class="tab col s6"><a class="tab-text">Synopsis</a></li>
                    <li class="tab col s6"><a class="tab-text">Detail</a></li>
                </ul>
                </div>
            </div>
        </div>

        <div class="container anime-content row">
            
        </div>
        `;

        this.synopsis();
    }

    synopsis() {
        const anime = this.anime;
        const contentElem = this.querySelector(".anime-content");
        contentElem.classList.add("fade");

        setTimeout( () => {
            if (contentElem.classList.contains("fade")) contentElem.classList.remove("fade");
        },300);
        
        contentElem.innerHTML =
        `
        <section class="col s12 synopsis light-blue-text">
            <h5>Synopsis</h5><hr>

            <div class="section-item">
                <span>${anime.synopsis}</span>
            </div>
        </section>
        `;
    }

    detail() {
        const anime = this.anime;
        const contentElem = this.querySelector(".anime-content");

        let rank = anime.rank;
        if( anime.rank === "null" || !anime.rank ) rank = "??"; 
        
        let episodes = anime.episodes;
        if( anime.episodes === "null" || !anime.episodes ) episodes = ""; 
        
        contentElem.classList.add("fade");
        setTimeout( () => {
            if (contentElem.classList.contains("fade")) contentElem.classList.remove("fade");
        },300);

        contentElem.innerHTML = 
        `
        <section class="col s12 genre light-blue-text">
            <h5>Genre</h5><hr>

            <div class="row genre-detail center-align"></div><hr>
        </section>

        <section class="col s12 m6 informations light-blue-text">
            <h5>Informations</h5><hr>

            <div class="section-item">
                <span>Statistics</span>

                <div class="section-detail">
                    <span>${rank} Rank</span>
                    <span>${anime.popularity} Popularity</span>
                    <span>${anime.favorites} Favorites</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Episodes</span>

                <div class="section-detail">
                    <span>${episodes}</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Duration</span>

                <div class="section-detail">
                    <span>${anime.duration}</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Source</span>

                <div class="section-detail">
                    <span>${anime.source}</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Studios</span>

                <div class="section-detail studios">
                </div>
            </div><hr>

            <div class="section-item">
                <span>Rating</span>

                <div class="section-detail">
                    <span>${anime.rating}</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Aired</span>

                <div class="section-detail">
                    <span>${anime.aired.string}</span>
                </div>
            </div><hr>
        </section>

        <section class="col s12 m6 titles light-blue-text">
            <h5>Alternative Titles</h5><hr>

            <div class="section-item">
                <span>Japanese</span>

                <div class="section-detail jpn-titles">
                    <span>${anime.title_japanese}</span>
                </div>
            </div><hr>

            <div class="section-item">
                <span>Synonyms</span>

                <div class="section-detail synonyms-titles"></div>
            </div><hr>
        </section>
        `;

        // Add genre
        anime.genres.forEach( genre => {
            this.querySelector(".genre-detail").innerHTML += 
            `<div class="col s4 m2 genre-container">
                <span class="genre-item">${genre.name}</span>
            </div>`;
        });

        // Add studio
        anime.studios.forEach( studio => {
            this.querySelector(".studios").innerHTML += `<span>${studio.name}</span>`;
        });

        // Add synonyms titles
        anime.title_synonyms.forEach( title => {
            this.querySelector(".synonyms-titles").innerHTML += `<span>${title} ;</span>`;
        });
    }

    noInternet() {
        this.innerHTML = 
        `
        <div class="container empty-container center-align">
          <div class="empty-text">
            <h1><i class="fas fa-exclamation-circle"></i></h1>
            <h4>No Internet Access.</h4>
          </div>
        </div>
        `
    }

    error() {
      this.innerHTML = 
      `
      <div class="container empty-container center-align">
        <div class="empty-text">
          <h1><i class="fas fa-exclamation-circle"></i></h1>
          <h4>Something went wrong.</h4>
        </div>
      </div>
      `
    }
}

customElements.define("anime-detail", AnimeDetail);