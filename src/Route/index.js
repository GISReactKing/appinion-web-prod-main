import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { CreateSpecialist, Login, Users } from "../screens";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.js";

class Routers extends Component {
  render() {
    const { isAuthenticated, setLogin } = this.props;
    return (
      <Routes>
        <Route>
          <Route exact path="login" element={<Login setLogin={setLogin} />} />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isAuthenticated}>
                <CreateSpecialist />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="users"
            element={
              <ProtectedRoute isLoggedIn={isAuthenticated}>
                <Users />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    );
  }
}

export default Routers;
