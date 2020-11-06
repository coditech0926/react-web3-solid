import React, { Component } from "react";
import { Avatar, Badge, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PublicNews } from "../../services";
import "./index.less";
interface CompProps {
  keyword: string;
  type: string;
}
interface CompState {
  newsList: {
    newsUrl: string;
    name: string;
    author: string;
    category: string;
    commentCount: number;
  }[];
}

class List extends Component<CompProps, CompState> {
  state: CompState = {
    newsList: [],
  };

  getNews = async () => {
    const { type } = this.props;
    console.log("---------->>>>>>", type);
    let newsList = await PublicNews.list(type === "recent" ? "" : type);
    console.log(">>>>>>>>>>>>>>", newsList);
    this.setState({
      newsList,
    });
  };
  componentDidMount() {
    this.getNews();
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("--------", this.props.type);
  //   if (this.props.type !== prevProps.type) {
  //     this.getNews();
  //   }
  // }

  render() {
    const { newsList } = this.state;
    const { keyword = "" } = this.props;
    console.log("---》》》》》》》》》------->>>>>>", newsList);

    const filterList = newsList.filter(
      (item) => item.name.indexOf(keyword) > -1
    );
    return (
      <div className="news-list">
        {filterList.map((item) => (
          <Link
            to={`/detail?news=${encodeURIComponent(item.newsUrl)}`}
            key={item.name}
          >
            <div className="news-item">
              {/* <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              /> */}
              <div className="news-content">
                <div className="desc">{item.name}</div>
                {/* <div className="news-info">
                  <strong className="author">Leeon</strong>
                  <div className="time">May '19</div>
                </div> */}
              </div>
              <Badge
                className="site-badge-count-109"
                count={item.commentCount}
                style={{ backgroundColor: "#52c41a" }}
              />
            </div>
          </Link>
        ))}
        {filterList.length === 0 && <Empty description="No news " />}
      </div>
    );
  }
}

export default List;
