import { HttpContext } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import { formRequest } from "@melchyore/adonis-form-request/build";
import OsHistory from "App/Models/OsHistory";
import OsStoreRequest from "App/Requests/OsStoreRequest";
import { DateTime } from "luxon";

export default class OsController {
  public getById({ params: { id } }: HttpContext) {
    try {
      return Database.from("os_history")
        .select(
          "branchs.name as branch_name",
          "clients.name as client_name",
          "clients.phone as client_phone",
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

  public show({ request, params: { from, to } }: HttpContext) {
    try {
      let xid = request.header("xid");
      // console.log(from, to);
      return Database.from("os_history")
        .select(
          "branchs.name as branch_name",
          "clients.name as client_name",
          "os_history.id as os_number",
          "os_history.created_at",
          "os_history.product",
          "os_history.status",
          "os_history.product_serial",
          "os_history.defect_obs"
        )
        .join("branchs", "os_history.branch_id", "=", "branchs.id")
        .join("clients", "os_history.client_id", "=", "clients.id")
        .where("os_history.created_by", `${xid}`)
        .whereBetween(`os_history.created_at`, [from, to]);
      // .toSQL();
      // console.log(r);;
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  // @formRequest()
  public async store({ request }) {
    // public async store({}, request: OsStoreRequest) {
    try {
      let data = request.body();
      // data.created_at = DateTime.fromISO(data.created_at).toSQL();
      // const data = request.validated();
      return OsHistory.create(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
