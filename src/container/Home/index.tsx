import React, { Component } from "react";
import { Button, Tabs, Tooltip, Input, Select, Badge } from "antd";
import { Link } from "react-router-dom";
import { List } from "../../components/";
import "./index.less";
const { TabPane } = Tabs;
const { Option } = Select;
const { Search } = Input;
interface CompState {
  cateList: Array<string>;
}

class Home extends Component<{}, CompState> {
  state: CompState = {
    cateList: ["Recent News", "Technology", "Finance", "Politics"],
  };
  render() {
    const { cateList } = this.state;
    return (
      <div className="home-container">
        <div className="action-container">
          <Select defaultValue="Inrupt" style={{ width: 120 }}>
            <Option value="Inrupt">Inrupt.net</Option>
            <Option value="solidProject">solidProject</Option>
          </Select>

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
                cate === "Finance" ? (
                  <Badge count={9}>
                    <div className="tab-content">{cate}</div>
                  </Badge>
                ) : (
                  cate
                )
              }
              key={cate}
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
