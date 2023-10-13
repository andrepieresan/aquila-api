// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/core/build/standalone";
import { formRequest } from "@melchyore/adonis-form-request/build";
import Client from "App/Models/Client";
import ClientStoreRequest from "App/Requests/ClientStoreRequest";

export default class ClientsController {
  public show({ params: { name, phone } }: HttpContext) {
    try {
      console.log(name);
      return Client.query()
        .whereILike("name", `%${name}%`)
        .orWhereILike(`phone`, `%${phone}%`);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  @formRequest()
  public store({}, request: ClientStoreRequest) {
    try {
      const data = request.validated();
      return Client.create(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
    const data = request.validated();
    return Client.create(data);
  }
}
