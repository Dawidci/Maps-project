import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseListComponent } from "./warehouse-list/warehouse-list.component";
import { WarehouseCreateComponent } from "./warehouse-create/warehouse-create.component";
import { WarehouseUpdateComponent } from "./warehouse-update/warehouse-update.component";
import { RouteCreateComponent } from "./route-create/route-create.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { RouteDetailsComponent } from "./route-details/route-details.component";
import { DestinationsCreateComponent } from "./destinations-create/destinations-create.component";

const routes: Routes = [
  { path: '', redirectTo: 'warehouses', pathMatch: 'full' },

  { path: 'warehouses', component: WarehouseListComponent },
  { path: 'warehouses/add', component: WarehouseCreateComponent },
  { path: 'warehouses/update/:id', component: WarehouseUpdateComponent },

  { path: 'routes/add', component: RouteCreateComponent },
  { path: 'routes/list', component: RouteListComponent },
  { path: 'routes/details/:id', component: RouteDetailsComponent },

  { path: 'destinations/create/route/:id', component: DestinationsCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }