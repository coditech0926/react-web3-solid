import React, { Component } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";
class List extends Component {
  render() {
    return (
      <div className="news-list">
        {[0, 2, 3, 4].map((item) => (
          <div className="news-item" key={item}>
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
            <div className="news-content">
              <div className="desc">
                This is a new about the Chrom cache control
              </div>
              <div className="news-info">
                <strong className="author">Leeon</strong>
                <div className="time">May '19</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default List;
