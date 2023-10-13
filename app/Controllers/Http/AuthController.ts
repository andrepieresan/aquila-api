// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";

export default class AuthController {
  public show({}) {
    try {
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  public async login({ auth, request, response }) {
    try {
      let { email, pwd } = request.body();

      const user = await User.query().where("email", email).firstOrFail();
      console.log(user.pwd);
      if (!(await Hash.verify(user.pwd, pwd))) {
        return response.unauthorized("Invalid credentials");
      }

      const token = await auth.use("api").generate(user, {
        expiresIn: "7 days",
      });

      return token;
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
    }
  }
}
