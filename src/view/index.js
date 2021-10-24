import "../component/quran-list.js";
import "../component/header-nav.js";
import "../component/main-banner.js";
import DataSearch from "../data/data-source.js";



// // fetch API untuk pencarian surah
// class DataSearch {
//     static searchQuran(keyword) {
//         return fetch(`${baseUrl}/search/${keyword}`)
//         .then(response => {
//             return response.json();
//         })
//         .then(result => {
//             if(result.data && result.data.length !== 0) {
//                 return Promise.resolve(result.data);
//             } else {
//                 return Promise.reject(`${keyword} is not found`);
//             }
//         })
//     }
// };
// Main Function
const main = () => {
    // Konstanta element HTML
    const baseUrl = `https://api-alquranid.herokuapp.com/surah`;
    const searchElement = document.querySelector("#searchElement");
    const buttonSearch = document.querySelector("#buttonSearch");
    // const listQuran = document.querySelector("#listQuran");
    const listQuran = document.querySelector("quran-list");
    const deskripsi = document.querySelector(".banner__content");
    const mainBanner = document.querySelector("main-banner");
    const closeButton = document.querySelector(".close");
    const bacaQuran = document.querySelector(".baca__quran");

    // Fungsi Button Click untuk Pencarian Surah
    const buttonClicked = () => {
        if(searchElement.value !== "") {
            DataSearch.searchQuran(searchElement.value)
            .then(renderResult)
            .catch(fallbackResult)
        }
    };

    // Fetch API untuk memanggil JSON semua data surah
    const getQuran = () => {
        fetch(`${baseUrl}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            renderAllQuran(result.data);
        })
        .catch(error => {
            alert(error = "Koneksi Gagal, Periksa Jaringan Anda");
        })
    };

    // Fungsi untuk menampilkan semua surah
    const renderAllQuran = (qurans) => {
        // listQuran.innerHTML = '';

        // qurans.forEach(quran => {
        //     listQuran.innerHTML += `
        //         <div class="cards__item">
        //             <h3>${quran.nama}</h3>
        //             <p>Nomor Surah: ${quran.nomor}</p>
        //             <p>Jumlah Ayat: ${quran.ayat}</p>
        //             <div class="button">
        //                 <button class="baca" id="${quran.nomor}">Baca</button>
        //                 <button class="keterangan">Keterangan</button>
        //             </div>
        //         </div>
        //     `;
        // });

        listQuran.qurans = qurans;

         // untuk setiap button keterangan jalankan fungsi tampilkan keterangan surah
        const keterangan = document.querySelectorAll(".keterangan");
        keterangan.forEach(ket => {
            ket.addEventListener("click", () => {
                let namaSurah = ket.parentNode.parentNode.children[0].textContent;
                tampilkan(namaSurah);
                mainBanner.classList.add("active");
            })
        });

        // untuk setiap button baca jalankan fungsi tampilkan ayat-ayat surah
        const baca = document.querySelectorAll(".baca");
        baca.forEach(el => {
            el.addEventListener("click", (event) => {
                let nomorSurah = event.target.id;
                tampilkanHalaman(nomorSurah);
                bacaQuran.classList.add("halaman__baca");
                setTimeout(() => {
                    listQuran.style.display = "none";
                }, 1000);
            })
        })
    };

    // fungsi dari hasil pencarian surah
    const renderResult = (data) => {
        listQuran.innerHTML = '';
        data.forEach(el => {
            listQuran.innerHTML += `
            <div class="cards__item" style="width: 80%;">
                <h3>${el.nama}</h3>
                <p>Nomor Surah: ${el.nomor}</p>
                <p>Jumlah Ayat: ${el.ayat}</p>
                <h3>${el.keterangan}</h3>
                <div class="button">
                    <button class="baca" style="font-size: 20px;" id="${el.nomor}">Baca</button>
                </div>
            </div>
        `
        });

         // untuk setiap button baca jalankan fungsi tampilkan ayat-ayat surah
        const baca = document.querySelectorAll(".baca");
        baca.forEach(el => {
            el.addEventListener("click", (event) => {
                let nomorSurah = event.target.id;
                tampilkanHalaman(nomorSurah);
                bacaQuran.classList.add("halaman__baca");
                setTimeout(() => {
                    listQuran.style.display = "none";
                }, 1000);
            })
        })
    };

    // fungsi dari hasil pencarian surah yang gagal
    const fallbackResult = (message) => {
        listQuran.innerHTML = `<h1>${message}</h1>`;
    };

    // fetch API untuk memanggil keterangan surah
    const tampilkan = (ketSurah) => {
        fetch(`${baseUrl}/search/${ketSurah}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
           renderKeterangan(result.data);
        })
        .catch(error => {
            alert(error = "Koneksi Gagal, Periksa Jaringan Anda");
        })
    };

    // fungsi untuk menampilkan keterangan surah
    const renderKeterangan = (info) => {
        info.forEach(e => {
            deskripsi.innerHTML = `
                <h3>${e.keterangan}</h3>
            `
        })
    };

    // fetch API untuk memanggil ayat-ayat surah
    const tampilkanHalaman = (idSurah) => {
        fetch(`${baseUrl}/${idSurah}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            renderHalamanBaca(result.data)
        })
        .catch(error => {
            alert(error = "Koneksi Gagal, Periksa Jaringan Anda");
            bacaQuran.classList.remove("halaman__baca");
            listQuran.style.display = "flex";
        })
    };

    // fungsi untuk menampilkan ayat-ayat surah
    const renderHalamanBaca = (ayatSurah) => {
        bacaQuran.innerHTML = `
            <div class="div__button__back">
                <button class="button__back"><i class="fas fa-arrow-left"></i></button>
            </div>
        `;
        ayatSurah.forEach(ayat => {
            bacaQuran.innerHTML += `
                <div class="ayat__surah">
                    <div class="nomor__ayat"><h3>${ayat.nomor}</h3></div>
                    <p>${ayat.ar}</p>
                    <p>${ayat.tr}</p>
                    <p>${ayat.id}</p>
                </div>
            `;
        });

        const buttonBack = document.querySelector(".button__back");

        // ketika tombol kembali diklik hilangkan halaman baca quran
        buttonBack.addEventListener("click", () => {
            if(bacaQuran.classList.contains("halaman__baca")) {
                bacaQuran.innerHTML = `
                <div class="div__button__back">
                    <button class="button__back"><i class="fas fa-arrow-left"></i></button>
                </div>
                `;
                bacaQuran.classList.remove("halaman__baca");
                listQuran.style.display = "flex";
            }
        });
    };

    // ketika konten diload tampilkan nama-nama surah
    document.addEventListener("DOMContentLoaded", () => {
        getQuran();
    });
    // ketika tombol pencarian ditekan tampilkan hasil pencarian
    buttonSearch.addEventListener("click", () => {
        buttonClicked();
    });
    // ketika keyboard enter ditekan tampilkan hasil pencarian
    searchElement.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            buttonClicked();
        }
    });

    // ketika tombol close ditekan hilangkan keterangan surah
    closeButton.addEventListener("click", () => {
        deskripsi.innerHTML = "";
        mainBanner.classList.remove("active");
    });

};

// jalankan fungsi main
// document.addEventListener("DOMContentLoaded", main());

export default main;
 