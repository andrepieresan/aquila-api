/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from "@ioc:Adonis/Core/Route";
// Login

Route.group(() => {
  Route.post("", "AuthController.login");
}).prefix("/login");

Route.get("/checkToken", "AuthController.checkToken");

// USER
Route.group(() => {
  Route.get("", "UserController.show");
  Route.post("store", "UsersController.store");
}).prefix("/user");

// branch
Route.group(() => {
  Route.get(":branch_name", "BranchesController.showOrCreate");
  Route.post("", "BranchesController.showOrCreate");
}).prefix("/branch");

// AUTH
Route.group(() => {
  Route.get("", "PartsController.show");
  Route.post("", "PartsController.store");
})
  .prefix("/parts")
  .middleware("auth");

// SERVICES
Route.group(() => {
  Route.get(":id", "OsController.getById");
  Route.post(":id/set-status", "OsController.changeStatus");
  Route.post("", "OsController.show");
  Route.post("store", "OsController.store");
}).prefix("/services");
// .middleware("auth");

// CLIENT
Route.group(() => {
  Route.post("show", "ClientsController.show");
  Route.post("", "ClientsController.store");
  Route.post("update", "ClientsController.update");
})
  // .middleware("auth")
  .prefix("/client");
