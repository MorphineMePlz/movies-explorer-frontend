import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found__heading">404</h1>
      <h2 className="not-found__subheading">Страница не найдена</h2>
      <button className="not-found__button" onClick={() => navigate(-1)}>
        Назад
      </button>
    </div>
  );
}
