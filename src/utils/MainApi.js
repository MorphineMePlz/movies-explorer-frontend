export const BASE_URL = "http://localhost:3000";

class MainApi {
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

    signUp({ name, email, password }) {
        return fetch(`${this._address}/signup`, {
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
        return fetch(`${this._address}/signin`, {
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

    logout = () => {
        return fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    checkTokenValidity = () => {
        return fetch(`${BASE_URL}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    getUserInformation() {
        return fetch(`${this._address}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        }).then((res) => this.handleResponse(res));
    }

    editUserInformation({ name, email }) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name,
                email,
            }),
        }).then((res) => this.handleResponse(res));
    }

    createMovie(obj) {
        return fetch(`${this._address}/movies`, {
            method: "POST",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ ...obj.body }),
        }).then((res) => this.handleResponse(res));
    }

    getSavedMovies() {
        return fetch(`${this.__address}/movies`, {
            headers: this._headers
        })
            .then((res) => this.handleResponse(res));
    }

    deleteMovie(data) {
        return fetch(`${this._address}/movies/${data}`, {
            method: "DELETE",
            credentials: 'include',
            headers: this._headers,
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