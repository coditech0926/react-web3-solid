import React, { Component } from "react";
import { Comment, Tooltip, Avatar, Input, Button } from "antd";
import moment from "moment";
import "./index.less";

const { TextArea } = Input;

class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        <div className="comment-header">Comment</div>
        <div className="comment-content">
          {[0, 1, 2, 3, 4].map((item) => (
            <Comment
              key={item}
              // actions={actions}
              author={<span>Leeon Lee</span>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png#"
                  alt="Han Solo"
                />
              }
              content={
                <p>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </p>
              }
              datetime={
                <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
          ))}
        </div>
        <div className="comment-form">
          <TextArea
            placeholder="leave your comment"
            rows={4}
            onChange={(val) => console.log(val)}
          />
          <Button className="submit-btn" htmlType="submit" type="primary">
            Add Comment
          </Button>
        </div>
      </div>
    );
  }
}

export default CommentList;
