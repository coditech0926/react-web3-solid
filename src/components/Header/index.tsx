import React from "react"; //  useCallback, useEffect, Component
import { Link } from "react-router-dom";
import { Avatar, Menu, Dropdown } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { withWebId } from "@inrupt/solid-react-components";

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
                    <Link to="new">Post News</Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                    <Link to="/admin">Manage News</Link>
                  </Menu.Item> */}
                </Menu>
              }
              placement="bottomLeft"
            >
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default withWebId(Header);
