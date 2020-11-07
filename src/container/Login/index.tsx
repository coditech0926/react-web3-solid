/**
 * 登录页面
 */
import React, { Component } from "react";
import auth from "solid-auth-client";
import { Button } from "antd";
import { LoginOutlined } from "@ant-design/icons";
class Login extends Component {
  goLogin = async () => {
    try {
      const selectedProvider = "https://inrupt.net/auth";
      let callbackUri = `${window.location.origin}/`;
      const session = await auth.currentSession();
      if (!session) {
        localStorage.removeItem("solid-auth-client");

        await auth.login(selectedProvider, {
          callbackUri,
          storage: localStorage,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Button
          type="primary"
          onClick={() => this.goLogin()}
          icon={<LoginOutlined />}
        >
          Login with inrupt.net
        </Button>
      </div>
    );
  }
}

export default Login;
