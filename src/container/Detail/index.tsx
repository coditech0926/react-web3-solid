import React, { Component } from "react";
import { Button, Tag } from "antd";
import { CommentList } from "../../components";
import { withRouter } from "react-router-dom";
import { PaperClipOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import moment from "moment";
import * as qs from "query-string";
import { News } from "../../services";
import "./index.less";

interface CompProps extends RouteComponentProps {
  webId: string;
}
interface CompState {
  source: any;
  detail: any;
}

class Detail extends Component<CompProps, CompState> {
  state: CompState = {
    source: qs.parse(window.location.search),
    detail: {},
  };
  getDetail = async () => {
    const url: any = qs.parse(window.location.search).news;
    const detail = await News.detail(url);
    this.setState({
      detail,
    });
  };

  componentDidMount() {
    this.getDetail();
  }

  render() {
    const { source, detail } = this.state;
    const { webId } = this.props;
    const {
      name,
      articleBody,
      category,
      createdAt,
      filename,
      fileurl,
    } = detail;

    console.log("----", detail);
    return (
      <div className="detail-container">
        <div className="detail-header">
          <h2 className="detail-title">{name}</h2>
          <div className="detail-info">
            <div className="info-item">
              <span>Leeon</span>
              <span>{moment(createdAt).format("MM-DD HH:mm")}</span>
            </div>
            <Tag color="#87d068">{category}</Tag>
          </div>
        </div>
        <div className="detail-content">{articleBody}</div>

        {filename && (
          <div className="detail-attachment">
            <a href={fileurl} target="__blank">
              <PaperClipOutlined /> {filename}
            </a>
          </div>
        )}
        <CommentList webId={webId} source={source.news} />
      </div>
    );
  }
}

export default withRouter(Detail);
