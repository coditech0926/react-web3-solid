/**
 * 新建 news
 * 包括选择分类、输入 title、news detail、上传附件
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { Category, News, File, PublicNews } from "../../services";
import { UploadOutlined } from "@ant-design/icons";
import "./index.less";
const { Option } = Select;

interface CompState {
  cateList: { url: string; name: string; description: string }[];
  fileList: Array<any>;
}

interface CompProps extends RouteComponentProps {
  webId: string;
}

class NewTopic extends Component<CompProps, CompState> {
  state: CompState = {
    cateList: [],
    fileList: [],
  };

  // 保存 news
  onSave = async (values) => {
    const { webId } = this.props;
    const { fileList } = this.state;
    const { name: filename, url: fileurl } = fileList[0] || {
      name: "",
      url: "",
    };
    let data = {
      ...values,
      filename,
      fileurl,
      author: webId,
    };

    const res = await News.create(data);
    const { name, category } = values;
    await PublicNews.create({
      name,
      category,
      author: webId,
      newsUrl: res.url,
    });
    message.success("Add successfully !");
    this.props.history.push("/");
  };

  // 获取分类列表
  getCateList = async () => {
    let cateList = await Category.list();
    this.setState({
      cateList,
    });
  };

  componentDidMount() {
    this.getCateList();
  }

  // 上传附件
  upload = async (file) => {
    this.setState({
      fileList: [
        {
          uid: file.name,
          name: file.name,
          status: "uploading",
        },
      ],
    });
    let res = await File.upload(file);
    let { url } = res;
    if (url) {
      this.setState({
        fileList: [
          {
            uid: file.name,
            name: file.name,
            status: "done",
            url,
          },
        ],
      });
    } else {
      this.setState({
        fileList: [],
      });
    }
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

    const uploadProps = {
      name: "file",
      beforeUpload: (file) => {
        this.upload(file);
        return false;
      },
    };
    const { cateList, fileList } = this.state;
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
            <Upload {...uploadProps} fileList={fileList}>
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
