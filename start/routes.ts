/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("", "AuthController.show");
  Route.post("", "AuthController.login");
}).prefix("/login");

Route.group(() => {
  Route.get("", "UserController.show");
  Route.post("store", "UsersController.store");
}).prefix("/user");

Route.group(() => {
  Route.get("", "OsController.show");
  Route.post("store", "OsController.store");
}).prefix("/services");

Route.group(() => {
  Route.get(":name/:?phone", "ClientsController.show");
  Route.post("store", "ClientsController.store");
})
  .middleware("auth")
  .prefix("/client");
