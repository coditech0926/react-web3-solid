import Soukai from "soukai";
import { PublicComment, PublicNews } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";

const datasets = "https://leeonfield.inrupt.net/newslist/";
const commentSets = "https://leeonfield.inrupt.netlist/";

class PublicNewsService {
  constructor() {
    Soukai.loadModels({ PublicComment, PublicNews });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
    PublicNews.at(datasets);
    PublicComment.at(commentSets);
  }

  list = async (type?: string): Promise<any> => {
    let condition: {} = !type ? {} : { category: type };
    const res = await await PublicNews.from(datasets).all(condition);
    const list = res.map((item) => item.getAttributes());
    const commentData = await PublicComment.all();
    const commentList = commentData.map((item) => item.getAttributes());

    const data = list
      .map((item) => {
        let commentCount = commentList.filter(
          (comment) => comment.newsUrl === item.newsUrl
        ).length;
        return {
          commentCount,
          ...item,
        };
      })
      .sort((a: any, b: any) => b.createdAt.getTime() - a.createdAt.getTime());
    return data;
  };

  create = async (values) => {
    await PublicNews.create(values);
  };

  remove = async (url: string) => {
    let list = await PublicNews.all();
    for (const iterator of list) {
      if (iterator.getAttributes().newsUrl === url) {
        await iterator.delete();
      }
    }
  };
}

export default new PublicNewsService();
