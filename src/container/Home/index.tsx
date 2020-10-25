import React, { Component } from "react";
import { Tabs } from "antd";
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
        <Tabs>
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
