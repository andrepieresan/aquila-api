/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("", "AuthController.login");
}).prefix("/login");

Route.get("/checkToken", "AuthController.checkToken");

Route.group(() => {
  Route.get("", "UserController.show");
  Route.post("store", "UsersController.store");
}).prefix("/user");

Route.group(() => {
  Route.get("", "OsController.show");
  Route.post("store", "OsController.store");
})
  .prefix("/services")
  .middleware("auth");

Route.group(() => {
  Route.get(":name/:?phone", "ClientsController.show");
  Route.post("store", "ClientsController.store");
})
  .middleware("auth")
  .prefix("/client");
