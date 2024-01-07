import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { formRequest } from "@melchyore/adonis-form-request/build";
import Client from "App/Models/Client";

export default class ClientsController {
  public show({ request }: HttpContextContract) {
    try {
      let { name, contact } = request.body();
      return Database.from("clients")
        .select(
          "clients.id as client_id",
          "clients.name as client_name",
          "clients.contact as phone",
          "clients.document",
          "clients.mail"
        )
        .where(`clients.contact`, contact)
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
      let client = await Client.findByOrFail("contact", data.contact);
      client.merge(data).save();
      client.serialize();
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  @formRequest()
  public async store({ request }: HttpContextContract) {
    try {
      let { name, contact } = request.body();

      const exist = await Database.from("clients")
        .select("clients.id as client_id")
        .whereILike(`clients.contact`, `${contact}`)
        .whereILike(`clients.name`, `${name}`)
        .first();

      if (!exist) {
        const cData = {
          name,
          contact,
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
