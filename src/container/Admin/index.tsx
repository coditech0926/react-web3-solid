/**
 * 管理 news
 */
import React, { Component } from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { News, PublicNews } from "../../services";
import "./index.less";
interface CompState {
  newsList: {
    url: string;
    name: string;
    author: string;
    articleBody: string;
    category: string;
  }[];
}
class Admin extends Component<{}, CompState> {
  state: CompState = {
    newsList: [],
  };
  // 获取当前用户所有发表的 news
  getList = async () => {
    let newsList = await News.list();
    this.setState({ newsList });
  };
  componentDidMount() {
    this.getList();
  }
  // 删除对应的 news
  onRemove = async (url) => {
    await News.remove(url);
    await PublicNews.remove(url);
    message.success("delete successfully");
    this.getList();
  };
  render() {
    const { newsList } = this.state;
    return (
      <div className="admin-container">
        {newsList.map((item) => (
          <div className="news-item" key={item.url}>
            <div className="news-content">{item.name}</div>
            <Popconfirm
              title="Confirm to delete this news ?"
              onConfirm={() => this.onRemove(item.url)}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" icon={<DeleteOutlined />} danger type="text">
                Delete
              </Button>
            </Popconfirm>
          </div>
        ))}
      </div>
    );
  }
}

export default Admin;
