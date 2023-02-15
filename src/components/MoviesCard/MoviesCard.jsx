import { useState } from "react";
import './MoviesCard.css'
// import { CurrentUserContext } from "../../context/CurrentUserContext";
// import { useContext } from "react";


const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ""}`;
}

export default function MoviesCard({ data, isSavedMovies, onMovieLike }) {
    const { nameRU, duration, image, trailerLink } = data;
    const [saved, setSaved] = useState(false);
    const handleDeleteMovie = (nameRU) => {
        console.log("delete", nameRU)
    }


    return (<li className='card'>
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
                    onClick={() => onMovieLike(data)}
                />
            }
        </div>
        <a href={trailerLink} target="_blank" rel="noreferrer"><img src={isSavedMovies ? image : "https://api.nomoreparties.co/" + image.url} alt={nameRU} className="card__image" /></a>
    </li>)
}