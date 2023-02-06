import "./Container.css";

export default function Container({ className = "", children }) {
    return <div className={`wrapper ${className}`}>
        {children}
    </div>
}