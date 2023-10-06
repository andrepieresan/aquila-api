/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  Route.get('', 'UserController.show');
  Route.post('store', 'UsersController.store')
}).prefix('/user')


Route.group(()=>{
  Route.get('', 'UserController.show');
  Route.post('store', 'OsController.store')
}).prefix('/services')
