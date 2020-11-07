/**
 * 评论组件，用于详情页中评论内容展示
 * 由 评论列表 以及 评论区 两部分组成
 */
import React, { Component } from "react";
import { Comment, Tooltip, Input, Button, message } from "antd";
import { Comment as CommentService, PublicComment } from "../../services";
import { Value } from "@solid/react";
import { SolidAvatar } from "../../components";
import moment from "moment";
import "./index.less";

const { TextArea } = Input;
interface CompProps {
  type: string;
}
// 组件参数包括 source 和 webId
// source 是 news 的 url
// webId 用户用户评论
class CommentList extends Component<{ source: string; webId: string }> {
  state: {
    commentList: {
      url: string;
      name: string;
      profile: string;
      source: string;
      description: string;
      created: Date;
    }[];
    commentIn: string;
  } = {
    commentList: [],
    commentIn: "",
  };

  // 获取评论内容
  getComment = async () => {
    const { source } = this.props;
    let commentList = await PublicComment.list(source);

    let commentContent: Array<any> = [];
    for (const iterator of commentList) {
      let data = await CommentService.detail(iterator.commentUrl);
      commentContent.push(data);
    }

    this.setState({
      commentList: commentContent,
    });
  };

  componentDidMount() {
    this.getComment();
  }
  onChange = (val) => {
    this.setState({
      commentIn: val,
    });
  };
  // 发表评论
  onComment = async () => {
    const { commentIn } = this.state;
    const { source, webId } = this.props;
    const data = {
      description: commentIn,
      profile: webId,
      source,
    };
    let res = await CommentService.create(data);

    await PublicComment.create({
      commentUrl: res.url,
      newsUrl: source,
    });

    message.success("comment successfully");
    this.setState({
      commentIn: "",
    });

    this.getComment();
  };

  render() {
    const { commentList, commentIn } = this.state;
    return (
      <div className="comment-list">
        <div className="comment-header">Comment</div>
        <div className="comment-content">
          {commentList.map((item) => (
            <Comment
              key={item.url}
              author={<Value src={`[${item.profile}].name`}></Value>}
              avatar={<SolidAvatar src={item.profile} />}
              content={<p>{item.description}</p>}
              datetime={
                <Tooltip
                  title={moment(item.created).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(item.created).format("MM-DD  HH:mm:ss")}</span>
                </Tooltip>
              }
            />
          ))}
        </div>
        <div className="comment-form">
          <TextArea
            placeholder="leave your comment"
            rows={4}
            value={commentIn}
            onChange={(e) => this.onChange(e.target.value)}
          />
          <Button
            className="submit-btn"
            onClick={() => this.onComment()}
            type="primary"
          >
            Add Comment
          </Button>
        </div>
      </div>
    );
  }
}

export default CommentList;
