import { useState } from "react";
import './MoviesCard.css'
export default function MoviesCard({ data }) {
    const { title, length, image, isSaved } = data;

    const [saved, setSaved] = useState(isSaved);

    const handleSaveMovie = (title) => {
        setSaved(!saved);
        console.log(title)
    }

    return <li className='card'>
        <div className='card__box'>
            <span>
                <h3 className='card__title'>{title}</h3>
                <p className='card__subtitle'>{length}</p>
            </span>
            <button type="button" className={`card__button ${saved ? "card__button_saved" : ""}`} onClick={() => handleSaveMovie(title)} />
        </div>
        <img src={image} alt={title} className="card__image" />
    </li>
}