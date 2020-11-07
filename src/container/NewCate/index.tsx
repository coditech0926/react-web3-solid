/**
 * 新建分类页面
 */
import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { Category } from "../../services";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import "./index.less";

class NewCate extends Component<RouteComponentProps> {
  // 保存分类
  onSave = async (values) => {
    await Category.create(values);
    message.success("save successfully !");
    this.props.history.push("/");
  };

  render() {
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 18,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    return (
      <div className="create-news">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSave}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input the news name",
              },
            ]}
          >
            <Input placeholder="category name" />
          </Form.Item>

          <Form.Item
            label="Infomation"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the category detail",
              },
            ]}
          >
            <Input.TextArea showCount placeholder="category detail" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Create Category Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default withRouter(NewCate);
