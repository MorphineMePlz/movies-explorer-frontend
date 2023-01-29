import { useState } from "react";

import Container from '../Container/Container';
import image from "../../assets/images/movie_pic.jpg";

import "./MoviesCardList.css";

const MOCK_DATA = {
    title: "33 слова о дизайне",
    length: "1 ч 47 м",
    image,
    isSaved: false
}

export default function MoviesCardList() {
    const [currentCards, setCurrentCards] = useState(12);

    return (
        <Container>
            <ul className='cards'>
                {Array.from({ length: currentCards }, (_, i) => <MoviesCard data={MOCK_DATA} key={i} />)}
            </ul>
            <button type="button" className='cards__button' onClick={() => setCurrentCards(currentCards + 6)}>Еще</button>
        </Container>
    )
}

function MoviesCard({ data }) {
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

