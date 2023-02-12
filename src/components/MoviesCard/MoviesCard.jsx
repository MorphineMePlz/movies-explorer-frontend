import { useState } from "react";
import './MoviesCard.css'

const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ""}`;
}

export default function MoviesCard({ data, isSavedMovies }) {
    console.log(data)
    const { nameRU, duration, image, isSaved } = data;
    const [saved, setSaved] = useState(isSaved);

    const handleSaveMovie = (nameRU) => {
        setSaved(!saved);
        console.log(nameRU)
    }

    const handleDeleteMovie = (nameRU) => {
        console.log("delete", nameRU)
    }


    return <li className='card'>
        <div className='card__box'>
            <span>
                <h3 className='card__title'>{nameRU}</h3>
                <p className='card__subtitle'>{toHoursAndMinutes(duration)
                }</p>
            </span>
            {isSavedMovies ?
                <button type="button"
                    className={`card__button card__button_delete`}
                    onClick={() => handleDeleteMovie(nameRU)}
                /> :
                <button type="button"
                    className={`card__button ${saved ? "card__button_saved" : ""}`}
                    onClick={() => handleSaveMovie(nameRU)}
                />

            }
        </div>
        <img src={"https://api.nomoreparties.co/" + image.url} alt={nameRU} className="card__image" />
    </li>
}