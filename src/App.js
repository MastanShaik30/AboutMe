import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import CurrentProject from "./components/CurrentProject";
import Skills from "./components/Skills";
import Resume from "./components/Resume";

export default function App() {
  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Navbar />
      <About />
      <CurrentProject />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
