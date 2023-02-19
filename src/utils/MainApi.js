export const BASE_URL = "https://api.aziz-movies-diplom.nomoredomains.rocks";

class MainApi {
    constructor(setting) {
        this._headers = setting.headers;
    }

    handleResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
        }
        return res.json();
    }

    signUp({ name, email, password }) {
        return fetch(`${BASE_URL}/signup`, {
            method: "POST",
            credentials: 'include',
            mode: "cors",
            headers: this._headers,
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        }).then((res) => this.handleResponse(res));
    }

    signIn({ email, password }) {
        return fetch(`${BASE_URL}/signin`, {
            method: "POST",
            credentials: 'include',
            mode: "cors",
            headers: this._headers,
            body: JSON.stringify({
                email,
                password,
            }),
        }).then((res) => this.handleResponse(res));
    }

    logout() {
        return fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    checkTokenValidity() {
        return fetch(`${BASE_URL}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    getUserInformation() {
        return fetch(`${BASE_URL}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    editUserInformation(name, email) {
        return fetch(`${BASE_URL}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                email,
            }),
        }).then((res) => this.handleResponse(res));
    }

    createMovies(data) {
        return fetch(`${BASE_URL}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                trailerLink: data.trailerLink,
                image: 'https://api.nomoreparties.co' + data.image.url,
                thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
            .then(this._handleResponse)
    }

    getSavedMovies() {
        return fetch(`${BASE_URL}/movies`, {
            headers: this._headers,
            credentials: 'include',

        })
            .then((res) => this.handleResponse(res));
    }

    deleteMovie(movieId) {
        return fetch(`${BASE_URL}/movies/${movieId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
            params: {
                movieId
            }
        }).then((res) => this.handleResponse(res));
    }
}

export const mainApi = new MainApi({
    baseUrl: BASE_URL,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
});