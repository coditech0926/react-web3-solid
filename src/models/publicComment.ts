import { FieldType } from "soukai";
import { SolidModel } from "soukai-solid";

export default class Comment extends SolidModel {
  public static timestamps = ["createdAt"];
  public createdAt!: Date;
  public updatedAt!: Date;

  public static rdfContexts = {
    schema: "https://schema.org/",
  };

  public static rdfsClasses = ["schema:Comment"];

  public static fields = {
    commentUrl: FieldType.String,
    newsUrl: FieldType.String,
  };
}
