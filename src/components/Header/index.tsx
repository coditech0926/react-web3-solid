import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { HomeOutlined, EditOutlined } from "@ant-design/icons";
import "./index.less";
class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-content">
          <Link to="/">
            <HomeOutlined /> &nbsp; Home
          </Link>

          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to="new">Post News</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/admin">Manage News</Link>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
