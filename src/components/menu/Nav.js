import "../../App.css";
import React, { Component } from "react";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { Drawer, Button } from "antd";
import "antd/dist/antd.css";
import whiteLogo from "../../assets/whiteLogo.png";

class Navbar extends Component {
  state = {
    current: "mail",
    visible: false,
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { setLogin } = this.props;
    return (
      <nav
        className="menuBar"
        style={{
          backgroundColor: "#32B7BC",
        }}
      >
        <div className="logo">
          <img
            src={whiteLogo}
            alt="logo"
            height={50}
            width={70}
            style={{
              marginTop: 20,
            }}
          />
        </div>
        <div className="menuCon">
          <div
            className="leftMenu"
            style={{ width: "50%", backgroundColor: "#32B7BC" }}
          >
            <LeftMenu onClose={this.onClose} isMobile={false} />
          </div>
          <div className="rightMenu">
            <RightMenu setLogin={setLogin} onClose={this.onClose} />
          </div>
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Appinion"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu onClose={this.onClose} isMobile={true} />
            <RightMenu setLogin={setLogin} onClose={this.onClose} />
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Navbar;
