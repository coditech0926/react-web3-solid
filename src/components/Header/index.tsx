import React from "react"; //  useCallback, useEffect, Component
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  HomeOutlined,
  ControlOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import auth from "solid-auth-client";
import { Value } from "@solid/react";
import { withWebId } from "@inrupt/solid-react-components";
import { SolidAvatar } from "../../components";

import "./index.less";

const Header = ({ webId }) => {
  const logout = async () => {
    await auth.logout();
    localStorage.removeItem("solid-auth-client");
    window.location.href = window.location.origin + "/login";
  };

  return (
    <div className="header">
      <div className="header-content">
        <Link to="/">
          <HomeOutlined /> &nbsp; Home
        </Link>

        {webId && (
          <div>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to="new">
                      <EditOutlined />
                      Post News
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/admin">
                      <ControlOutlined />
                      Manage News
                    </Link>
                  </Menu.Item>
                  <Menu.Item onClick={() => logout()}>
                    <LogoutOutlined />
                    Logout
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <span className="header-user-info">
                <SolidAvatar src={webId}></SolidAvatar>
                <span className="header-user-name">
                  {Value({ src: `[${webId}].name` })}
                </span>
              </span>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default withWebId(Header);
