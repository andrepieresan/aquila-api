import { AuthenticationException } from "@adonisjs/auth/build/standalone";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import ApiToken from "App/Models/ApiToken";
import Env from "@ioc:Adonis/Core/Env";
import jwt from "jsonwebtoken";

export default class AuthMiddleware {
  /**
   * The URL to redirect to when request is Unauthorized
   */
  protected redirectTo = "/login";

  /**
   * Authenticates the current HTTP request against a custom set of defined
   * guards.
   *
   * The authentication loop stops as soon as the user is authenticated using any
   * of the mentioned guards and that guard will be used by the rest of the code
   * during the current request.
   */
  protected async authenticate(
    auth: HttpContextContract["auth"],
    request: HttpContextContract["request"],
    response: HttpContextContract["response"]
  ) {
    const throwException = () => {
      // console.log('estamos aquiaaa')
      let message = "E_UNAUTHORIZED_ACCESS";
      response.status(401);
      response.send({ message });
      response.finish();
      throw new Error(message);
    };
    let token = request.header("Authorization");
    let user_id = request.header("xid");

    if (!token || !user_id) {
      throwException();
    }

    const apiUser = await ApiToken.query()
      .where({ user_id })
      .andWhere({ token })
      .firstOrFail();

    jwt.verify(apiUser.token, Env.get("API_KEY"));
  }

  /**
   * Handle request
   */
  public async handle(
    { auth, request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    await this.authenticate(auth, request, response);
    await next();
  }
}
