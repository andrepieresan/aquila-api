import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Material from "App/Models/Material";

export default class MaterialsController {
  public async show({ request }: HttpContextContract) {
    try {
      return Database.from("materials")
        .select(
          "materials.name",
          "materials.code",
          "materials.qty",
          "materials.sale_cost"
        )
        .where(`materials.qty`, ">=", `1`);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
  public store({ request }: HttpContextContract) {
    try {
      let { code, name, qty, sale_cost } = request.body();

      const data = {
        code,
        name,
        qty,
        sale_cost,
      };

      console.log({ data });

      return Material.create(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
