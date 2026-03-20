import { roles } from "../data/roles";

function RoleList({roles}) {
  return (
    <div>
      <h2>Role App</h2>

      {roles.map((role) => (
        <div key={role.id}>
          <p>{role.name}</p>
          <p>{role.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RoleList;