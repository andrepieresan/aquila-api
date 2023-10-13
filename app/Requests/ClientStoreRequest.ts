import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { FormRequest } from "@ioc:Adonis/Addons/FormRequest";

export default class ClientStoreRequest extends FormRequest {
  constructor(protected context: HttpContextContract) {
    super(context);
  }

  public async authorize() {
    return true;
  }

  public rules() {
    return {
      schema: schema.create({
        name: schema.string([rules.maxLength(64)]),
        phone: schema.string([rules.maxLength(20)]),
        document: schema.string.optional([rules.maxLength(64)]),
        mail: schema.string.optional([rules.maxLength(255)]),
      }),
    };
  }
}
