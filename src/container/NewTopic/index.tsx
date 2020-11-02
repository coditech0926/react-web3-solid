import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { Category, News } from "../../services";
import { UploadOutlined } from "@ant-design/icons";
import "./index.less";
const { Option } = Select;

interface CompState {
  cateList: { url: string; name: string; description: string }[];
}

interface CompProps extends RouteComponentProps {
  webId: string;
}

class NewTopic extends Component<CompProps, CompState> {
  state: CompState = {
    cateList: [],
  };

  onSave = async (values) => {
    const { webId } = this.props;
    let data = {
      ...values,
      author: webId,
    };
    await News.create(data);
    message.success("Add successfully !");
    this.props.history.push("/");
  };
  getCateList = async () => {
    let cateList = await Category.list();
    this.setState({
      cateList,
    });
  };
  componentDidMount() {
    this.getCateList();
  }

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
      action: "",
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
    const { cateList } = this.state;
    return (
      <div className="create-news">
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSave}
          // onFinishFailed={onFinishFailed}
        >
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
                <Option key={item.url} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="name"
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
            label="Detail"
            name="articleBody"
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

export default withRouter(NewTopic);
