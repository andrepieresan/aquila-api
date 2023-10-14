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
        client_id: schema.number(),
        branch_id: schema.number(),
        product: schema.string([rules.maxLength(255)]),
        product_serial: schema.string([rules.maxLength(255)]),
        status: schema.string([rules.maxLength(255)]),
        defect_obs: schema.string([rules.maxLength(255)]),
        created_by: schema.number(),
      }),
    };
  }
}
