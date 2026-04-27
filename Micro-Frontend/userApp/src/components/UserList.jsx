
function UserList({users, color}) {
  return (
    <div>
      <h2 style={{color:color}}>User App</h2>

      {users.map((user) => (
        <div key={user.id}>
          <p style={{color:color}}>{user.name}</p>
          <p style={{color:color}}>{user.email}</p>
          <p style={{color:color}}>{user.role}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;