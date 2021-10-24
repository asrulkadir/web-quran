const baseUrl = `https://api-alquranid.herokuapp.com/surah`;

// fetch API untuk pencarian surah
class DataSearch {
    static searchQuran(keyword) {
        return fetch(`${baseUrl}/search/${keyword}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            if(result.data && result.data.length !== 0) {
                return Promise.resolve(result.data);
            } else {
                return Promise.reject(`${keyword} is not found`);
            }
        })
    }
};

export default DataSearch;