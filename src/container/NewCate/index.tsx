import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import "./index.less";
const { Option } = Select;
const cateList: Array<string> = ["Technology", "Finance", "Politics"];
class NewCate extends Component {
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
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
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
            name="infomation"
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

export default NewCate;
