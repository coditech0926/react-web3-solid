import { FieldType } from "soukai";
import { SolidModel } from "soukai-solid";

export default class Category extends SolidModel {
  public static timestamps = false;

  public static rdfContexts = {
    schema: "https://schema.org/",
  };

  public static rdfsClasses = ["schema:CategoryCodeSet"];

  public static fields = {
    name: FieldType.String,
    description: FieldType.String,
  };
}
