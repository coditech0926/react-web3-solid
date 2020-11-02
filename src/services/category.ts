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
  list = async () => {
    const list = await Category.from(datasets).all();
    return list.map((item) => item.getAttributes());
  };

  create = async (values: { name: String; description: String }) => {
    await Category.create(values);
  };
}

export default new Cate();
