import Soukai from "soukai";
import { PublicComment } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";

const datasets = "https://leeonfield.inrupt.net/commentslist/";

class Cate {
  constructor() {
    Soukai.loadModels({ PublicComment });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
    PublicComment.at(datasets);
  }
  list = async (newsUrl: string): Promise<any> => {
    const list = await PublicComment.from(datasets).all({
      newsUrl,
    });
    const data = list.map((item) => item.getAttributes());
    return data;
  };

  create = async (values: { commentUrl: string; newsUrl: string }) => {
    await PublicComment.create(values);
  };
}

export default new Cate();
