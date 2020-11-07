/**
 * 服务首页
 * 功能包括：搜索、分类 tab、news list、news 分页
 */
import React, { Component } from "react";
import { Button, Tabs, Tooltip, Input, Badge } from "antd";
import { Link } from "react-router-dom";
import { List } from "../../components/";
import { Category } from "../../services";
import "./index.less";
const { TabPane } = Tabs;
const { Search } = Input;
interface CompState {
  cateList: { url: string; name: string; description: string }[];
  keyword: string;
}

class Home extends Component<{ webId: string }, CompState> {
  state: CompState = {
    cateList: [],
    keyword: "",
  };

  // 获取分类列表
  getCateList = async () => {
    let cateList = await Category.list();
    this.setState({
      cateList,
    });
  };
  // 分类 tab 切换回调函数
  onChangeKeyword = (keyword) => {
    this.setState({
      keyword,
    });
  };

  componentDidMount() {
    this.getCateList();
  }

  render() {
    const { cateList, keyword } = this.state;
    return (
      <div className="home-container">
        <div className="action-container">
          <Search
            placeholder="search for news"
            onChange={(e) => this.onChangeKeyword(e.target.value)}
            enterButton
          />
        </div>
        <Tabs
          onChange={() => {
            this.onChangeKeyword("");
          }}
          tabBarExtraContent={
            <Tooltip title="Create new Category">
              <Link to="category">
                <Button type="text">New</Button>
              </Link>
            </Tooltip>
          }
        >
          <TabPane tab="Recent">
            <List keyword={keyword} type="recent" />
          </TabPane>
          {cateList.map((cate) => (
            <TabPane
              tab={
                cate.name === "Finance" ? (
                  <Badge count={9}>
                    <div className="tab-content">{cate.name}</div>
                  </Badge>
                ) : (
                  cate.name
                )
              }
              key={cate.url}
            >
              <List keyword={keyword} type={cate.name} />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Home;
