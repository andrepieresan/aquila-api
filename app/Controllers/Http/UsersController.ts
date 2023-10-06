// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { formRequest } from "@melchyore/adonis-form-request/build";
import User from "App/Models/User";
import UserStoreRequest from "App/Requests/UserStoreRequest";

export default class UsersController {
  @formRequest()
  public async store({ }, request: UserStoreRequest) {
    try {
      const data = request.validated()
      return User.create(data)
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
