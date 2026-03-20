import RoleList from "./components/RoleList";
import { roles } from "./data/roles";
function App() {
  return (
    <div>
      <h1>Role Management</h1>
      <RoleList roles={roles} />
    </div>
  );
}

export default App;