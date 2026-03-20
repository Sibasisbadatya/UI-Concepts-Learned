
function UserList({users}) {
  return (
    <div>
      <h2>User App</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;