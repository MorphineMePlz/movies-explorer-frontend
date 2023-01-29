import './Portfolio.css'

function Portfolio() {
    return (
        <ul className="portfolio">
            <li className="portfolio__list-item">
                <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Статичный сайт
                </a>
            </li>
            <li className="portfolio__list-item">
                <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Адаптивный сайт</a>
            </li>
            <li className="portfolio__list-item">
                <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="portfolio__link">Одностраничное приложение</a>
            </li>
        </ul>

    );
}

export default Portfolio;