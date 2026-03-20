import UserList from "./components/UserList";
import { users } from "./data/users";
function App() {
  return (
    <div>
      <h1>User Management</h1>
      <UserList users={users} />
    </div>
  );
}

export default App;