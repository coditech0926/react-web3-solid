import React, { Component } from "react";
import { Button, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { List } from "../../components/";
const { TabPane } = Tabs;

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
      <div>
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
            <TabPane tab={cate} key={cate}>
              <List></List>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default Home;
