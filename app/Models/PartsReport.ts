import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PartsReport extends BaseModel {
  public static table = "parts_report";

  @column({ isPrimary: true })
  public id: number;
  @column()
  public os_number: string;
  @column()
  public part_name: string;
  @column()
  public qtd: string;
  @column()
  public sale_cost: string;
  @column()
  public sale_value: string;
  @column()
  public ticket: string;
  @column()
  public created_at: string;
}
