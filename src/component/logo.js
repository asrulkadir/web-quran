class Logo extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = `<h1><a href="/"><i class="fas fa-quran"></i> Web Quran</a></h1>`;
    }
}

customElements.define("logo-quran", Logo);