import Soukai from "soukai";
import { Comment as CommentModel } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";
import { getContainerUrl } from "./utils";

const COMMENT_PATH = "/public/comments/";

class Comment {
  constructor() {
    Soukai.loadModels({ CommentModel });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
  }
  list = async (source: string): Promise<any> => {
    return {};
  };
  detail = async (url: string) => {
    if (!url) return;
    let containerUrl = await getContainerUrl(COMMENT_PATH, url);
    let list = await CommentModel.at(containerUrl).all();
    for (const iterator of list) {
      if (iterator.getAttributes().url === url) {
        return iterator.getAttributes();
      }
    }
    return {};
  };
  create = async (values: {
    profile: string;
    source: string;
    description: string;
  }) => {
    let containerUrl = await getContainerUrl(COMMENT_PATH);

    let res = await CommentModel.at(containerUrl).create({
      ...values,
      created: new Date(),
    });
    return res.getAttributes();
  };
}

export default new Comment();
