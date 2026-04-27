import React, { useState } from "react";
import RoleList from "./components/RoleList";
import { roles } from "./data/roles";
import { useDispatch, useSelector } from "react-redux";
import { changeColor } from "./reducers/roleSlice";

function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.role.color);
  const handleClick = () => {
    dispatch(changeColor(color === "black" ? "orange" : "black"));
  };

  return (
    <div>
      <h1>Role Management</h1>
      <button onClick={handleClick}>Change Color</button>
      <RoleList roles={roles} color={color} />
    </div>
  );
}

export default App;