import "./anime-item.js";

class AnimeList extends HTMLElement {
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

  searchConnected() {
    this.innerHTML = 
    `
    <div class="container empty-container center-align">
      <div class="empty-text">
        <i class="material-icons large">search</i>
        <h5>Search your anime first.</h5>
      </div>
    </div>
    `;
  }

  set load(list) {
      this.list = list;
      this.render();
  }

  render() {
    const row = document.createElement("div");
    row.classList.add("row")

    this.innerHTML = "";  
    this.list.forEach( anime => {
        const colomn = document.createElement("div");
        colomn.classList.add("col", "s12", "m6", "l4");
        const href = document.createElement("a");
        href.setAttribute("href", `#anime?id=${anime.mal_id}`);

        const itemElement = document.createElement("anime-item");

        itemElement.load = anime;

        href.appendChild(itemElement);
        colomn.appendChild(href);

        const divider = document.createElement("hr");
        colomn.appendChild(divider);

        row.appendChild(colomn);
    });

    this.appendChild(row)
  }

  isEmpty() {
    this.innerHTML = 
    `
    <div class="container empty-container center-align">
      <div class="empty-text">
        <i class="material-icons large">block</i>
        <h4>Not Found</h4>
      </div>
    </div>
    `
  }

  savedIsEmpty() {
    this.innerHTML = 
    `
    <div class="container empty-container center-align">
      <div class="empty-text">
        <i class="material-icons large">list</i>
        <h4>Your list is empty.</h4>
      </div>
    </div>
    `
  }

  noInternet() {
    this.innerHTML = 
    `
    <div class="container empty-container center-align">
      <div class="empty-text">
        <i class="material-icons large">portable_wifi_off</i>
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
        <i class="material-icons large">error_outline</i>
        <h4>Something went wrong.</h4>
      </div>
    </div>
    `
  }
}

customElements.define("anime-list", AnimeList);