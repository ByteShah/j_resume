import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="font-opensans text-gray-800">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Education />
        <Achievements />
        <Projects />
        <Contact />
        <Analytics />
      </main>
      <Footer />
    </div>
  );
}

export default App;