import { FieldType } from "soukai";
import { SolidModel } from "soukai-solid";

export default class News extends SolidModel {
  public static timestamps = ["createdAt"];

  public static rdfContexts = {
    schema: "https://schema.org/",
  };

  public static rdfsClasses = ["schema:Report"];
  public createdAt!: Date;
  public updatedAt!: Date;
  public static fields = {
    name: FieldType.String,
    author: FieldType.String,
    newsUrl: FieldType.String,
    category: FieldType.String,
  };
}
