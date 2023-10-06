import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema,rules} from '@ioc:Adonis/Core/Validator'
import { FormRequest } from '@ioc:Adonis/Addons/FormRequest'

export default class UserStoreRequest extends FormRequest {
  constructor(protected context: HttpContextContract) {
    super(context)
  }

  public async authorize() {
    return true
  }

  public rules() {
    return {
      schema: schema.create({
        username: schema.string([rules.maxLength(255)]),
        name: schema.string([rules.maxLength(255)]),
        role: schema.string([rules.maxLength(255)]),
        token: schema.string.optional([rules.maxLength(255)])
      })
    }
  }
}
