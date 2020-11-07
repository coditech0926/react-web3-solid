// 该组件对于用户的头像进行了封装，可以通过用户 webid 返回头像组件
import React from "react";
import { Avatar } from "antd";
import { Value } from "@solid/react";

const SolidAvatar = (props) => {
  return (
    <Avatar
      shape="square"
      style={{
        flexShrink: 0,
      }}
      src={
        props.src
          ? Value({ src: `[${props.src}].vcard_hasPhoto` })
          : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      }
    />
  );
};
export default SolidAvatar;
