import User from "./Component/User";
import AddUser from "./Component/AddUser";
import EditUser from "./Component/EditUser";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<User />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
      {/* <EditUser /> */}
    </div>
  );
}

export default App;
