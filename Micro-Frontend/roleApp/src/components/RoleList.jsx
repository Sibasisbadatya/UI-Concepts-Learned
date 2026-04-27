import { roles } from "../data/roles";

function RoleList({roles,color}) {
  return (
    <div>
      <h2>Role App Sibasis</h2>

      {roles.map((role) => (
        <div key={role.id}>
          <p style={{ color: color }}>{role.name}</p>
          <p style={{ color: color }}>{role.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RoleList;