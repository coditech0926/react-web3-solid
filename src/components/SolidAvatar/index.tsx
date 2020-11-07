import React from "react";
import { Avatar } from "antd";
import { Value } from "@solid/react";

const SolidAvatar = (props) => {
  return (
    <Avatar
      src={
        props.src
          ? Value({ src: `[${props.src}].vcard_hasPhoto` })
          : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
      }
    />
  );
};
export default SolidAvatar;
