import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ApiToken from "App/Models/ApiToken";
import jwt from "jsonwebtoken";
import Env from "@ioc:Adonis/Core/Env";
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

  public async checkToken({ request, response }: HttpContextContract) {
    try {
      let token = request.header("Authorization");
      let user_id = request.header("xid");

      if (!token || !user_id) {
        return response.unauthorized("no have credentials");
      }

      const apiUser = await ApiToken.query()
        .where({ user_id })
        .andWhere({ token })
        .firstOrFail();

      await jwt.verify(apiUser.token, Env.get("API_KEY"));
      // token = await auth.authenticate();
      return response.status(200) && response.send({ message: "autheticated" });
    } catch (e) {
      // console.log('estamos aquiaaa')
      let message = "E_UNAUTHORIZED_ACCESS";
      response.status(401);
      response.send({ message });
      response.finish();
      throw new Error(message);
    }
  }
  public async login({ request, response }) {
    try {
      let { email, password } = request.body();

      console.log({ email, password });

      const user = await User.query()
        .whereNotNull("active")
        .where("email", email)
        .firstOrFail();

      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized("Invalid credentials");
      }

      let token = await jwt.sign({ data: user.password }, Env.get("API_KEY"), {
        expiresIn: "15 minutes",
      });

      const data = { user_id: user.id, token };

      response.cookie("x-api", token);
      response.cookie("x-id", data.user_id);

      ApiToken.create(data);
      // let token = await auth.attempt(email, password);
      return { data };

      // const token = await auth.generate(user, {
      //   expiresIn: "3 seconds",
      // });

      // return token;
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
    }
  }
}
