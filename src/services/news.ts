import Soukai from "soukai";
import { News, Comment } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";

const datasets = "https://leeonfield.inrupt.net/test/news/";
const commentSets = "https://leeonfield.inrupt.net/comments/";

class NewsService {
  constructor() {
    Soukai.loadModels({ News, Comment });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
    News.at(datasets);
    Comment.at(commentSets);
  }
  list = async (type?: string): Promise<any> => {
    let condition: {} = !type ? {} : { category: type };
    const list = await News.from(datasets).all(condition);
    const commentData = await Comment.all();
    const commentList = commentData.map((item) => item.getAttributes());

    const data = list.map((item) => {
      let commentCount = commentList.filter(
        (comment) => comment.source === item.url
      ).length;
      return {
        commentCount,
        ...item.getAttributes(),
      };
    });
    return data;
  };

  create = async (values: {
    name: string;
    author: string;
    articleBody: string;
  }) => {
    await News.create(values);
  };
  detail = async (url: string) => {
    if (!url) return;
    let list = await News.all();
    for (const iterator of list) {
      if (iterator.getAttributes().url === url) {
        return iterator.getAttributes();
      }
    }
    return {};
  };
  remove = async (url: string) => {
    let list = await News.all();
    for (const iterator of list) {
      if (iterator.getAttributes().url === url) {
        await iterator.delete();
      }
    }
  };
}

export default new NewsService();
