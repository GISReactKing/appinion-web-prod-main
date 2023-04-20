/* eslint-disable default-case */
import React from "react";
import { Route } from "react-router-dom";

function ProtectRoute({ path, element }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    switch (path) {
      case "/":
        return <Route path="/" element={element} />;
      case "users":
        return <Route path="users" element={element} />;
    }
  }
  return <Route path="login" element={element} />;
}

export default ProtectRoute;
