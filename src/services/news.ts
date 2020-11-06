import Soukai from "soukai";
import { News } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";
import { getContainerUrl } from "./utils";

const NEWS_PATH = "/public/news/";

class NewsService {
  constructor() {
    Soukai.loadModels({ News });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
  }
  list = async (type?: string): Promise<any> => {
    let containerUrl = await getContainerUrl(NEWS_PATH);
    let condition: {} = !type ? {} : { category: type };
    const list = await News.from(containerUrl).all(condition);

    const data = list
      .map((item) => item.getAttributes())
      .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    return data;
  };

  create = async (values: {
    name: string;
    author: string;
    articleBody: string;
  }) => {
    let containerUrl = await getContainerUrl(NEWS_PATH);
    let res = await News.at(containerUrl).create(values);
    return res.getAttributes();
  };
  detail = async (url: string) => {
    if (!url) return;
    let containerUrl = await getContainerUrl(NEWS_PATH, url);
    let list = await News.at(containerUrl).all();
    for (const iterator of list) {
      if (iterator.getAttributes().url === url) {
        return iterator.getAttributes();
      }
    }
    return {};
  };
  remove = async (url: string) => {
    let containerUrl = await getContainerUrl(NEWS_PATH, url);
    let list = await News.at(containerUrl).all();
    for (const iterator of list) {
      if (iterator.getAttributes().url === url) {
        await iterator.delete();
      }
    }
  };
}

export default new NewsService();
