class SearchBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="inputForm">
                <input type="text" placeholder="Cari surah..." id="searchElement" autocomplete="off" required>
                <button type="submit" id="buttonSearch"><i class="fas fa-search" id="icon"></i></button>
            </div>
        `;
    }
}

customElements.define("search-bar", SearchBar);