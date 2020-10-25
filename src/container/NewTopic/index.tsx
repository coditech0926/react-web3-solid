import React, { Component } from "react";
import { Form, Input, Button, Select } from "antd";
import "./index.less";
const { Option } = Select;
const cateList: Array<string> = ["Technology", "Finance", "Politics"];
class NewTopic extends Component {
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
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the news title",
              },
            ]}
          >
            <Input placeholder="news title" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please select the category!",
              },
            ]}
          >
            <Select style={{ width: 120 }}>
              {cateList.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Detail"
            name="detail"
            rules={[
              {
                required: true,
                message: "Please input the news detail!",
              },
            ]}
          >
            <Input.TextArea showCount placeholder="news detail" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Post Now
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default NewTopic;
