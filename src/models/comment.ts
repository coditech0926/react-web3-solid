import { FieldType } from "soukai";
import { SolidModel } from "soukai-solid";

export default class Comment extends SolidModel {
  public static timestamps = false;

  public static rdfContexts = {
    schema: "https://schema.org/",
  };

  public static rdfsClasses = ["schema:Comment"];

  public static fields = {
    description: FieldType.String,
    name: FieldType.String,
    profile: FieldType.String,
    created: FieldType.Date,
    source: FieldType.String,
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
