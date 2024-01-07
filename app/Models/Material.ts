import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
/**
 *
 *  id
    code
    name
    qty
    sale_cost
    created_at
 */
export default class Material extends BaseModel {
  public static table = "materials";

  @column({ isPrimary: true })
  public id: number;

  @column()
  public code: string;

  @column()
  public name: string;

  @column()
  public qty: string;

  @column()
  public sale_cost: string;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;
}
