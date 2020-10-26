import React, { Component } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
    const uploadProps = {
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info: any) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
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
                message: "Please select the category",
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
                message: "Please input the news detail",
              },
            ]}
          >
            <Input.TextArea showCount placeholder="news detail" />
          </Form.Item>

          <Form.Item label="Attachment" name="attachment">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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
