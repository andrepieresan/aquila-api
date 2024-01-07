import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { FormRequest } from "@ioc:Adonis/Addons/FormRequest";

export default class OsStoreRequest extends FormRequest {
  constructor(protected context: HttpContextContract) {
    super(context);
  }

  public async authorize() {
    return true;
  }

  public rules() {
    return {
      schema: schema.create({
        id: schema.number.optional(),
        client_id: schema.number.optional(),
        branch_id: schema.number.optional(),
        product: schema.string.optional([rules.maxLength(255)]),
        product_serial: schema.string.optional([rules.maxLength(255)]),
        status: schema.string.optional([rules.maxLength(255)]),
        defect_obs: schema.string.optional([rules.maxLength(255)]),
        created_at: schema.string.optional(),
      }),
    };
  }
}
