import React, { Component } from "react";
import { Comment, Tooltip, Avatar, Input, Button, message } from "antd";
import { Comment as CommentService, PublicComment } from "../../services";
import moment from "moment";
import "./index.less";

const { TextArea } = Input;
interface CompProps {
  type: string;
}
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
              author={<span>{item.name}</span>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png#"
                  alt={item.name}
                />
              }
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
