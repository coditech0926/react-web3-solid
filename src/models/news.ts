import { FieldType } from "soukai";
import { SolidModel } from "soukai-solid";

export default class News extends SolidModel {
  public static timestamps = false;

  public static rdfContexts = {
    schema: "https://schema.org/",
  };

  public static rdfsClasses = ["schema:Report"];

  public static fields = {
    name: FieldType.String,
    author: FieldType.String,
    articleBody: FieldType.String,
  };

  // public actions: WatchAction[] | undefined;
  // public relatedActions: SolidHasManyRelation<
  //   Movie,
  //   WatchAction,
  //   typeof WatchAction
  // >;

  // public actionsRelationship(): Relation {
  //   return this.hasMany(WatchAction, "object");
  // }
}
