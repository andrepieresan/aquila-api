import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { formRequest } from "@melchyore/adonis-form-request/build";
import Client from "App/Models/Client";

export default class ClientsController {
  public show({ request }: HttpContextContract) {
    try {
      let { name, phone } = request.body();
      console.log(name, phone);
      return Database.from("clients")
        .select(
          "clients.id as client_id",
          "clients.name as client_name",
          "clients.phone as phone",
          "clients.document",
          "clients.mail"
        )
        .where(`clients.phone`, phone)
        .andWhereRaw(`INSTR(clients.name,'${name}') > 0`)
        .firstOrFail();
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  public async update({ request }: HttpContextContract) {
    try {
      let data = request.body();
      return Database.from("clients")
        .select(
          "clients.id as client_id",
          "clients.name as client_name",
          "clients.phone as phone",
          "clients.document",
          "clients.mail"
        )
        .where(`clients.phone`, data.phone)
        .andWhereRaw(`INSTR(clients.name,'${data.name}%') > 0`)
        .update(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  @formRequest()
  public async store({ request }: HttpContextContract) {
    try {
      let { name, phone } = request.body();

      const exist = await Database.from("clients")
        .select("clients.id as client_id")
        .whereILike(`clients.phone`, `${phone}`)
        .whereILike(`clients.name`, `${name}`)
        .first();
      if (!exist) {
        const cData = {
          name,
          phone,
        };

        let new_client = await Client.create(cData);
        return new_client.id;
      }
      return exist.client_id;
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
