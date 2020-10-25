import React, { Component } from "react";
import { Button, Tabs } from "antd";
import { List } from "../../components/";
const { TabPane } = Tabs;

interface CompState {
  cateList: Array<string>;
}

class Home extends Component<{}, CompState> {
  state: CompState = {
    cateList: ["Technology", "Finance", "Politics"],
  };
  render() {
    const { cateList } = this.state;
    return (
      <div>
        <Tabs tabBarExtraContent={<Button type="text">New</Button>}>
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
