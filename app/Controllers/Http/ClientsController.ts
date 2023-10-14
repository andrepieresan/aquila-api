// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import { formRequest } from "@melchyore/adonis-form-request/build";
import Client from "App/Models/Client";
import ClientStoreRequest from "App/Requests/ClientStoreRequest";

export default class ClientsController {
  public show({ params: { name, phone } }: HttpContext) {
    try {
      return Database.from("clients")
        .select(
          "branchs.name as branch_name",
          "branchs.id as branch_id",
          "clients.id as client_id",
          "clients.name as client_name",
          "clients.document",
          "clients.mail"
        )
        .whereILike("clients.name", `%${name}%`)
        .orWhereILike(`clients.phone`, `%${phone}%`)
        .join("branchs", "clients.branch_id", "=", "branchs.id")
        .firstOrFail();
      // return Client.query()
      //   .whereILike("name", `%${name}%`)
      //   .orWhereILike(`phone`, `%${phone}%`)
      //   .innerJoin("branchs", "")
      //   .firstOrFail();
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
