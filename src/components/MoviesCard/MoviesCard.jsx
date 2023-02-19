import { useState } from "react";

import './MoviesCard.css'

const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}ч${minutes > 0 ? ` ${minutes}м` : ""}`;
}

export default function MoviesCard(
    {
        movie,
        isSavedMovies,
        onMovieLike,
        onMovieDelete,
        savedMovieData
    }) {
    const { nameRU, duration, image, trailerLink } = movie;
    const [isAdded, setIsAdded] = useState(Boolean(savedMovieData));

    const savedMovieId = isSavedMovies ? movie._id : savedMovieData ? savedMovieData._id : null;

    return (<li className='card'>
        <div className='card__box'>
            <span className='card__text-box'>
                <h3 className='card__title'>{nameRU}</h3>
                <p className='card__subtitle'>{toHoursAndMinutes(duration)
                }</p>
            </span>
            {isSavedMovies ?
                <button type="button"
                    className={`card__button card__button_delete`}
                    onClick={() => savedMovieId && onMovieDelete(savedMovieId)}
                /> :
                <button type="button"
                    className={`card__button ${isAdded ? "card__button_saved" : ""}`}
                    onClick={() => {
                        if (isAdded) {
                            onMovieDelete(savedMovieId)
                            setIsAdded(false)
                        } else {
                            onMovieLike(movie);
                            setIsAdded(true);
                        }
                    }}
                />
            }
        </div>
        <a href={trailerLink} target="_blank" rel="noreferrer">
            <img src={isSavedMovies ? image : `https://api.nomoreparties.co/${image.url}`}
                alt={nameRU} className="card__image"
            />
        </a>
    </li>)
}