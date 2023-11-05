import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class OsHistory extends BaseModel {
  public static table = "os_history";

  @column()
  public id: number;

  @column()
  public client_id: number;

  @column()
  public branch_id: number;

  @column()
  public product: string;

  @column()
  public product_serial: string;

  @column()
  public defect_obs: string;

  @column()
  public status: string;

  @column()
  public ticket_amount: number;

  @column()
  public service_cost: number;

  @column()
  public part_cost: number;

  @column.dateTime()
  public send_at: DateTime;

  @column.dateTime()
  public finished_at: DateTime;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;

  @column()
  public created_by: number;

  @column()
  public deleted: number;

  @column()
  public deleted_at: DateTime;

  @column()
  public deleted_by_user_id: number;
}
