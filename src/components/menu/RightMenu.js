import React from "react";
import { Menu } from "antd";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const RightMenu = ({ setLogin, onClose }) => {
  const navigate = useNavigate();
  return (
    <Menu
      mode="horizontal"
      style={{
        backgroundColor: "#32B7BC",
      }}
    >
      <Menu.Item key="mail">
        <Button
          type="dashed"
          shape="circle"
          onClick={() => {
            localStorage.setItem("isLoggedIn", "");
            setLogin(false);
            navigate("/login");
            if (onClose) {
              onClose();
            }
          }}
        >
          <LogoutOutlined />
        </Button>
      </Menu.Item>
    </Menu>
  );
};
export default RightMenu;
