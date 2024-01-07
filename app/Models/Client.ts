import { DateTime } from "luxon";
import { BaseModel, column, scope } from "@ioc:Adonis/Lucid/Orm";

export default class Client extends BaseModel {
  public static table = "clients";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public contact: string;

  @column()
  public document: string;

  @column()
  public mail: string;

  @column.dateTime()
  public created_at: DateTime;

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // public updated_at: DateTime;
}
