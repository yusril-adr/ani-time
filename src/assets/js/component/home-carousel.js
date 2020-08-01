import "./home-item.js";

class HomeCarousel extends HTMLElement {
    connectedCallback() {
        this.innerHTML = 
        `
        <div class="progress light-blue lighten-4">
            <div class="indeterminate light-blue"></div>
        </div>
        `;
    }

    set load(list) {
        this.list = list;
        this.render();
    }

    render() {
        this.innerHTML = "";

        const owlContainer = document.createElement("div");
        owlContainer.classList.add("owl-carousel", "owl-theme");

        this.list.forEach( anime => {
            const itemElement = document.createElement("home-item");
            itemElement.classList.add("center-align");

            itemElement.load = anime;

            owlContainer.appendChild(itemElement);
        });

        this.appendChild(owlContainer);
    }

    noInternet() {
        this.innerHTML = 
        `
        <div class="center-align">
            <h4>No Internet Access.</h4>
        </div>
        `;
    }
}

customElements.define("home-carousel", HomeCarousel);