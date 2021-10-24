import "./quran-item.js";

class QuranList extends HTMLElement {
    set qurans(qurans) {
        this._qurans = qurans;
        this.render();
    }

    render() {
        this.innerHTML = "";
        this._qurans.forEach(quran => {
            const quranItemElement = document.createElement("quran-item");
            quranItemElement.quran = quran;
            this.appendChild(quranItemElement);           
        });
    }
}

customElements.define("quran-list", QuranList);