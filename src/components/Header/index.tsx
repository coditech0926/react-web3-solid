import React from "react"; //  useCallback, useEffect, Component
import { Link } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { EditOutlined } from "@ant-design/icons";
import {
  HomeOutlined,
  ControlOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Value, withWebId } from "@solid/react";

import "./index.less";

const Header = ({ webId }) => {
  // const { thing, error } = useThing(
  //   "https://leeonfield.inrupt.net/profile/card",
  //   webId
  // );
  // if (error) console.log("error", error);
  // console.log("---->>>>>", thing);
  // useEffect(() => {
  //   if (webId) {
  //     (async () => {
  //       console.log("==========", webId);
  //       let profile = SolidData[webId];
  //       const name = await profile.label;
  //       console.log("==========", name);
  //     })();
  //   }
  // }, [webId]);

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
                  <Menu.Item>
                    <Link to="/admin">
                      <LogoutOutlined />
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu>
              }
              placement="bottomLeft"
            >
              <span className="header-user-info">
                <Avatar
                  src={
                    Value({ src: `[${webId}].vcard_hasPhoto` }) ||
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                />
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
