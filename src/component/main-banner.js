class MainBanner extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `
            <div class="banner">
                <button class="close">Close <i class="far fa-window-close"></i></button>
                <div class="banner__content"></div>
            </div>
        `;
    }
}

customElements.define("main-banner", MainBanner);