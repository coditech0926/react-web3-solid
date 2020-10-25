import React, { Component } from "react";
import { Button, Pagination } from "antd";
import "./index.less";
class Admin extends Component {
  render() {
    return (
      <div className="admin-container">
        {[0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => (
          <div className="news-item" key={item}>
            <div className="news-content">
              This is a new about the Chrom cache control
            </div>
            <Button size="small" danger type="text">
              Delete
            </Button>
          </div>
        ))}
        <Pagination className="list-pagination" defaultCurrent={1} total={30} />
      </div>
    );
  }
}

export default Admin;
