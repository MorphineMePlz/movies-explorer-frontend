export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

class Api {
    constructor(setting) {
        this._address = setting.baseUrl;
        this._headers = setting.headers;
    }

    handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    getMovies() {
        return fetch(`${this._address}`, {
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

}

export const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
