class QuranItem extends HTMLElement {
    set quran(quran) {
        this._quran = quran;
        this.render();
    }

    // connectedCallback() {
    //     this.render();
    // }

    render() {
        this.innerHTML = `
                <div class="cards__item">
                    <h3>${this._quran.nama}</h3>
                    <p>Nomor Surah: ${this._quran.nomor}</p>
                    <p>Jumlah Ayat: ${this._quran.ayat}</p>
                    <div class="button">
                        <button class="baca" id="${this._quran.nomor}">Baca</button>
                        <button class="keterangan">Keterangan</button>
                    </div>
                </div>
            `;
    }
}

customElements.define("quran-item", QuranItem);