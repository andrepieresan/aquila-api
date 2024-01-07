import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { FormRequest } from "@ioc:Adonis/Addons/FormRequest";

export default class PartStoreRequest extends FormRequest {
  constructor(protected context: HttpContextContract) {
    super(context);
  }

  public async authorize() {
    return true;
  }

  public rules() {
    return {
      schema: schema.create({
        os_number: schema.string(),
        part_name: schema.string([rules.maxLength(255)]),
        qtd: schema.string(),
        sale_cost: schema.string(),
        sale_value: schema.string(),
        ticket: schema.string(),
        created_at: schema.string(),
      }),
    };
  }
}
