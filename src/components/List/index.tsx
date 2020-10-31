import React, { Component } from "react";
import { Avatar, Badge, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.less";
class List extends Component {
  render() {
    return (
      <div className="news-list">
        {[0].map((item) => (
          <Link to="/detail/2" key={item}>
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
              <Badge
                className="site-badge-count-109"
                count={1}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
          </Link>
        ))}
        <Pagination className="list-pagination" defaultCurrent={1} total={30} />
      </div>
    );
  }
}

export default List;
