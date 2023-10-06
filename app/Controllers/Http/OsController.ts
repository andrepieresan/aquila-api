import { formRequest } from "@melchyore/adonis-form-request/build";
import OsHistory from "App/Models/OsHistory";
import OsStoreRequest from "App/Requests/OsStoreRequest";

export default class OsController {
  @formRequest()
  public async store({}, request: OsStoreRequest) {
    try {
      const data = request.validated();
      return OsHistory.create(data);
    } catch (e) {
      let message = `Error: ${e.message}`;
      console.log(message);
      console.log(e.stack);
    }
  }
}
