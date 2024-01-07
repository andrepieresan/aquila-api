import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Branch extends BaseModel {
  public static table = "branchs";

  @column({ isPrimary: true })
  public id: number;
  @column()
  public name: string;
  @column()
  public active: number;
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;
}
