import UserList from "./components/UserList";
import { users } from "./data/users";
import { useSelector,useDispatch } from "react-redux";
import { changeColor } from "./reducers/slice";
function App() {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.user.color);
  console.log("color",color);
  
  const handleClick = () => {
    dispatch(changeColor(color === "black" ? "yellow" : "black"));
  };
  return (
    <div>
      <h1>User Management</h1>
      <button onClick={handleClick}>Change Color</button>
      <UserList users={users} color={color} />
    </div>
  );
}

export default App;