import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import OsHistory from "App/Models/OsHistory";

export default class OsController {
  public update({ request }: HttpContextContract) {
    try {
      let {
        os_number: id,
        defect_obs,
        part_name,
        part_cost,
        service_name,
        service_cost,
        ticket_amount,
      } = request.body();

      console.log(defect_obs, part_cost, service_cost);

      return Database.from("os_history")
        .where("os_history.id", `${id}`)
        .update({
          defect_obs,
          part_name,
          part_cost,
          service_name,
          service_cost,
          ticket_amount,
        });
    } catch (e) {}
  }

  public getById({ params: { id } }: HttpContextContract) {
    try {
      return Database.from("os_history")
        .select(
          "branchs.name as branch_name",
          "clients.mail as mail",
          "clients.name as client_name",
          "clients.contact as client_phone",
          "os_history.service_code",
          "os_history.material_code",
          "os_history.id as os_number",
          "os_history.created_at",
          "os_history.product",
          "os_history.status",
          "os_history.product_serial",
          "os_history.defect_obs"
        )
        .join("branchs", "os_history.branch_id", "=", "branchs.id")
        .join("clients", "os_history.client_id", "=", "clients.id")
        .where("os_history.id", `${id}`)
        .firstOrFail();
    } catch (e) {}
  }

  public changeStatus({ request, params: { id } }: HttpContextContract) {
    try {
      const data = request.body();
      console.log(data);
      return Database.from("os_history")
        .where("os_history.id", `${id}`)
        .update(data);
    } catch (e) {}
  }

  public show({ request }: HttpContextContract) {
    try {
      let { from, to } = request.body();
      console.log(from, to);
      let xid = request.header("xid");
      return Database.from("os_history")
        .select(
          "branchs.name as branch_name",
          "clients.name as client_name",
          // "os_history.send_at",
          "os_history.id as os_number",
          "os_history.created_at",
          "os_history.product",
          "os_history.status",
          "os_history.product_serial",
          "os_history.defect_obs"
        )
        .join("branchs", "os_history.branch_id", "=", "branchs.id")
        .join("clients", "os_history.client_id", "=", "clients.id")
        .where("os_history.created_by_user_id", `${xid}`)
        .whereBetween(`os_history.created_at`, [`${from} 00:00:00`, `${to}`]);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  public async store({ request }) {
    try {
      let {
        branch_id,
        client_id,
        created_at,
        created_by_user_id,
        defect_obs,
        product,
        product_serial,
        status,
      } = request.body();

      return OsHistory.create({
        branch_id,
        client_id,
        created_at,
        created_by_user_id,
        defect_obs,
        product,
        product_serial,
        status,
      });
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
