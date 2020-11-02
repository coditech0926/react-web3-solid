import React, { Component } from "react";
import { Button } from "antd";
import { CommentList } from "../../components";
import { withRouter } from "react-router-dom";
import { PaperClipOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import * as qs from "query-string";
import { News } from "../../services";
import "./index.less";

interface CompProps extends RouteComponentProps {
  webId: string;
}

class Detail extends Component<CompProps> {
  state: {
    source: any;
  } = {
    source: qs.parse(window.location.search),
  };
  getDetail = async () => {
    const url: any = qs.parse(window.location.search);
    const data = await News.detail(url);
  };

  componentDidMount() {
    this.getDetail();
  }

  render() {
    const { source } = this.state;
    const { webId } = this.props;
    const content = `
Microsoft TileCode is a game creation app that allows you to design and play games directly on low-cost gaming handhelds or in a web browser. TileCode games are similar to board games with pieces that can move from one tile of the board to a nearby tile. 
          
TileCode runs on
any MakeCode Arcade device - here are detailed instructions on how to download and copy the TileCode UF2 file file to your Arcade device.You also can run TileCode in the web-based MakeCode Arcade simulator at bottom of this screen or in a separate tab - clicking on the lower right corner of the screen (arrow icon pointing down and to the right) expands the game simulator to full screen mode. 
          
Both the UF2 file and the game simulator come loaded with six sample games. The game in slot #1 is a very simple example. The games in slots #4 - #8 are simplified versions of five popular games that together demonstrate all of TileCode’s programming features.
    `;
    return (
      <div className="detail-container">
        <div className="detail-header">
          <h2 className="detail-title">Microsoft TileCode</h2>
          <div className="detail-info">
            <div className="info-item">Leeon Lee</div>
          </div>
        </div>
        <div className="detail-content">{content}</div>

        <div className="detail-attachment">
          <Button type="text" icon={<PaperClipOutlined />}>
            attachment.gz
          </Button>
        </div>
        <CommentList webId={webId} source={source.news} />
      </div>
    );
  }
}

export default withRouter(Detail);
