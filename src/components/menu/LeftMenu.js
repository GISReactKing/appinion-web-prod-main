import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

class LeftMenu extends Component {
  render() {
    const { onClose, isMobile } = this.props;
    return (
      <Menu
        mode={isMobile ? "inline" : "horizontal"}
        style={{ backgroundColor: "#32B7BC" }}
      >
        <Menu.Item
          key="Home"
          style={{
            color: "white",
            backgroundColor: "#32B7BC",
          }}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              backgroundColor: "#32B7BC",
            }}
          >
            Home
          </Link>
        </Menu.Item>
        <Menu.Item
          key="mail"
          style={{
            color: "white",
            backgroundColor: "#32B7BC",
          }}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <Link to="/users" style={{ color: "white" }}>
            Users
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
