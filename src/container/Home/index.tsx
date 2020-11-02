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
}

class Home extends Component<{ webId: string }, CompState> {
  state: CompState = {
    cateList: [],
  };

  getCateList = async () => {
    let cateList = await Category.list();
    console.log(cateList);
    this.setState({
      cateList,
    });
  };

  componentDidMount() {
    this.getCateList();
  }

  render() {
    const { cateList } = this.state;
    return (
      <div className="home-container">
        <div className="action-container">
          {/* <Select defaultValue="Inrupt" style={{ width: 120 }}>
            <Option value="Inrupt">Inrupt.net</Option>
            <Option value="solidProject">solidProject</Option>
          </Select> */}

          <Search
            placeholder="search for news"
            // onSearch={onSearch}
            enterButton
          />
        </div>
        <Tabs
          tabBarExtraContent={
            <Tooltip title="Create new Category">
              <Link to="category">
                <Button type="text">New</Button>
              </Link>
            </Tooltip>
          }
        >
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
              <List></List>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Home;
