import React, { Component } from "react";
import { Button } from "antd";
import auth from "solid-auth-client";
class Login extends Component {
  goLogin = async () => {
    try {
      const selectedProvider = "https://inrupt.net/auth";
      let callbackUri = `${window.location.origin}/`;

      await auth.login(selectedProvider, {
        callbackUri,
        storage: localStorage,
      });
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
          marginTop: 100,
        }}
      >
        <Button onClick={() => this.goLogin()}>Login</Button>
      </div>
    );
  }
}

export default Login;
