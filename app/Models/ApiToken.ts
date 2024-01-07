import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ApiToken extends BaseModel {
  public static table = "api_tokens";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public token: string;

  @column()
  public user_id: number;

  @column.dateTime()
  public expires_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;
}
