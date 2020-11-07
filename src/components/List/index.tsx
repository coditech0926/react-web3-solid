/**
 * List 组件用户展示 news 列表
 */
import React, { Component } from "react";
import { Badge, Empty } from "antd";
import { Link } from "react-router-dom";
import { PublicNews } from "../../services";
import { Value } from "@solid/react";
import { SolidAvatar } from "../../components";
import { Pagination } from "antd";
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
  current: number;
}

// 该组件会传入 keyword 和 type 参数
// keyword 用于用户搜索关键字筛选
// type 用户分类切换
class List extends Component<CompProps, CompState> {
  state: CompState = {
    newsList: [],
    current: 1,
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
  onPageChange = (current) => {
    this.setState({
      current,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.keyword !== prevProps.keyword) {
      this.setState({
        current: 1,
      });
    }
  }

  render() {
    const { newsList, current } = this.state;
    const { keyword = "" } = this.props;

    const filterList = newsList.filter(
      (item) => item.name.indexOf(keyword) > -1
    );
    const sliceList = filterList.slice((current - 1) * 10, current * 10);
    return (
      <div className="news-list">
        {sliceList.map((item) => (
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
        {filterList.length === 0 ? (
          <Empty description="No news " />
        ) : (
          <Pagination
            pageSize={10}
            defaultCurrent={current}
            total={filterList.length}
            onChange={this.onPageChange}
            style={{
              marginTop: 20,
            }}
          />
        )}
      </div>
    );
  }
}

export default List;
