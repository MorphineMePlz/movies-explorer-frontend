import React from 'react';
import { Link } from 'react-router-dom';
import './Project.css'

function Project() {
  return (
    <section className="project">
      <div className="project__heading-container">
        <h1 className="project__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
      <nav className="project__nav-box">
        <div className="project__nav-link-container">
        <Link to={'1'} className="project__nav-link">О проекте</Link>
        </div>
        <div className="project__nav-link-container">
        <Link to={'1'} className="project__nav-link">Технологии</Link>
        </div>
        <div className="project__nav-link-container">
        <Link to={'1'} className="project__nav-link">Студент</Link>
        </div>
      </nav>
    </section>
  );
}

export default Project;