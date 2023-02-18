import Preloader from "../Preloader/Preloader";
import "./LoadingPopup.css";


export default function LoadingPopup({ isOpen }) {
    console.log(isOpen)

    return (
        <div className={`popup ${isOpen ? "popup_active" : ""}`}>
            <Preloader />
        </div>
    )
}