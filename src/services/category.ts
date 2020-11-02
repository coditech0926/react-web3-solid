import Soukai from "soukai";
import { Category } from "../models";
import { SolidEngine } from "soukai-solid";
import SolidAuthClient from "solid-auth-client";

const datasets = "https://leeonfield.inrupt.net/category/";

class Cate {
  constructor() {
    Soukai.loadModels({ Category });
    Soukai.useEngine(
      new SolidEngine(SolidAuthClient.fetch.bind(SolidAuthClient))
    );
    Category.at(datasets);
  }
  list = async (): Promise<any> => {
    const list = await Category.from(datasets).all();
    const data = list.map((item) => item.getAttributes());
    return data;
  };

  create = async (values: { name: string; description: string }) => {
    await Category.create(values);
  };
}

export default new Cate();
