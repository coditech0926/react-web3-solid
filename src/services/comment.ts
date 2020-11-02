import Soukai from "soukai";
import { Comment } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";

const datasets = "https://leeonfield.inrupt.net/comments/";

class Cate {
  constructor() {
    Soukai.loadModels({ Comment });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
    Comment.at(datasets);
  }
  list = async (source: string): Promise<any> => {
    const list = await Comment.from(datasets).all({
      source,
    });
    const data = list.map((item) => item.getAttributes());
    return data;
  };

  create = async (values: {
    author: {
      name: string;
      profile: string;
    };
    source: string;
    description: string;
  }) => {
    await Comment.create({ ...values, created: new Date() });
  };
}

export default new Cate();
