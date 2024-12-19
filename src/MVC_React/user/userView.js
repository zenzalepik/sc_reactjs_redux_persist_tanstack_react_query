// UserView.js
import React from "react";

const UserView = ({ users, loading }) => {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
