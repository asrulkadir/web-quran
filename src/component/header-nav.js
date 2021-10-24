import "./logo.js";
import "./search-bar.js";

class HeaderNav extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav>
                <logo-quran></logo-quran>
                <search-bar></search-bar>
            </nav>
        `;
    }
}

customElements.define("header-nav", HeaderNav)