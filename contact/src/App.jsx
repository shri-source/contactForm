import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
