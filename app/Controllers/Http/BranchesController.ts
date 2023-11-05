import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Branch from "App/Models/Branch";

export default class BranchesController {
  public async store({ request }: HttpContextContract) {
    try {
      const data = request.body();
      return await Branch.create(data);
    } catch (e) {
      console.log(e);
    }
  }

  public async showOrCreate({ request }: HttpContextContract) {
    try {
      let { branch_name } = request.body();

      const exist = await Database.from("branchs")
        .select("branchs.id as branch_id")
        .whereILike(`branchs.name`, `${branch_name}`)
        .first();
      // .join("branchs", "clients.branch_id", "=", "branchs.id")
      // .firstOrFail();

      if (!exist) {
        const bData = {
          name: branch_name,
          active: 1,
        };
        let new_branch = await Branch.create(bData);
        return new_branch.id;
      }
      return exist.branch_id;
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }

  public async show({ request, params: { branch_name } }) {
    try {
      return (
        Database.from("branchs")
          .select("branchs.id")
          .whereILike(`branchs.name`, `%${branch_name}%`)
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
}
