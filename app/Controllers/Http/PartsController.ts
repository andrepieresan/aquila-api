import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Database from "@ioc:Adonis/Lucid/Database";
import { formRequest } from "@melchyore/adonis-form-request/build";
import PartsReport from "App/Models/PartsReport";
import PartStoreRequest from "App/Requests/PartStoreRequest";

export default class PartsController {
  public show({ params: { name, phone } }: HttpContextContract) {
    try {
      return (
        Database.from("clients")
          .select(
            // "branchs.name as branch_name",
            // "branchs.id as branch_id",
            "clients.id as client_id",
            "clients.name as client_name",
            "clients.phone as phone",
            "clients.document",
            "clients.mail"
          )
          .whereILike(`clients.phone`, `%${phone}%`)
          // .join("branchs", "clients.branch_id", "=", "branchs.id")
          .firstOrFail()
      );
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

  public store({ request }) {
    try {
      let {
        created_at,
        os_number,
        part_name,
        qtd,
        sale_cost,
        sale_value,
        ticket,
      } = request.body();

      const data = {
        created_at,
        os_number,
        part_name,
        qtd,
        sale_cost,
        sale_value,
        ticket,
      };
      console.log({ data });
      return PartsReport.create(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
    const data = request.validated();
    return PartsReport.create(data);
  }
}
