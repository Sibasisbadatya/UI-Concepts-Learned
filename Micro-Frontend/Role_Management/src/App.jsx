import React,{useState} from 'react';

import './App.css'
import { lazy } from 'react'
import { Suspense } from 'react'
const Home = lazy(()=>import("./Components/Home.jsx"));
const About = lazy(()=>import("./Components/About.jsx"));
import Logo from '../src/assets/react.svg'
// import Home from "./Components/Home.jsx";
// import About from "./Components/About.jsx";
function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>

      <Suspense fallback={<h2>Loading...</h2>}>
        {page === "home" ? <Home /> : <About />}
      </Suspense>
      <img src={Logo} />
    </div>
  );
}

export default App
