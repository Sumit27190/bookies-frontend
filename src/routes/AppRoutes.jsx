import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Exchange from "../pages/Exchange/Exchange";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/explore"
        element={
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        }
      />

      <Route
        path="/exchange"
        element={
          <PrivateRoute>
            <Exchange />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
