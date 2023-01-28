import React from 'react';
import Project from '../Project/Project';
import About from '../About/About';
import Technologies from '../Technologies/Technologies'
import Student from '../Student/Student'

export default function MainPage() {
    return (
      <main>
        <Project />
        <About />
        <Technologies />
        <Student />
      </main>
    )
  }