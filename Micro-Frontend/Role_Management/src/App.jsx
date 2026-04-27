import React, { useState } from 'react';

import './App.css'
import { lazy } from 'react'
import { Suspense } from 'react'
import { Link, NavLink, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
function App() {

  const roleColor = useSelector((state) => state.role.color);
  const navStyle = ({ isActive }) => ({
    margin: isActive ? "0 10px" : "0px",
    color: isActive ? "purple" : "pink",
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "bold" : "normal"
  });
  const [page, setPage] = useState("home");

  return (
    <div>
      <nav>

        {/* Link and NavLink prevents from reloading but NavLink have some better feature */}

        {/* <Link to="/">Home</Link> | {""}   
        <Link to="/about">About</Link> | {""}
        <Link to="/contact">Contact</Link> */}

        <NavLink to="/" style={navStyle} >Home</NavLink> | {""}
        <NavLink to="/about" style={navStyle}>About</NavLink> | {""}
        <NavLink to="/about?name=sibasis&age=24#category2" state={{ from: "Browser" }} style={navStyle}>About Info</NavLink> | {""}
        <NavLink to="/contact" style={navStyle}>Contact</NavLink> | {""}
        <NavLink to="/dashboard" style={navStyle}>Dashboard</NavLink> | {""}
        <NavLink to="/roleApp" style={navStyle}>Roles</NavLink> | {""}
        <NavLink to="/userApp" style={navStyle}>Users</NavLink>
      </nav>
      <Suspense fallback={<div >Loading Component</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App
