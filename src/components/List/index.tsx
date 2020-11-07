import React, { Component } from "react";
import { Badge, Empty } from "antd";
import { Link } from "react-router-dom";
import { PublicNews } from "../../services";
import { Value } from "@solid/react";
import { SolidAvatar } from "../../components";
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
    let newsList = await PublicNews.list(type === "recent" ? "" : type);
    this.setState({
      newsList,
    });
  };
  componentDidMount() {
    this.getNews();
  }

  render() {
    const { newsList } = this.state;
    const { keyword = "" } = this.props;

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
              <SolidAvatar src={item.author}></SolidAvatar>
              <div className="news-content">
                <div className="desc">{item.name}</div>
                <div className="news-info">
                  <strong className="author">
                    <Value src={`[${item.author}].name`}></Value>
                  </strong>
                  {/* <div className="time">May '19</div> */}
                </div>
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
