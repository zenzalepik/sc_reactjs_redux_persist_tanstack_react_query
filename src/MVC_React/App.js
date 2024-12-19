import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useUserController } from "./user/userController";
import UserView from "./user/userView";

function App() {
  const { users, loading } = useUserController();
  return (
    <div>
      <UserView users={users} loading={loading} />
    </div>
  );
}

export default App;
