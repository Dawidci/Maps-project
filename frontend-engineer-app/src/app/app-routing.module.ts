import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseListComponent } from "./warehouse-list/warehouse-list.component";
import { WarehouseCreateComponent } from "./warehouse-create/warehouse-create.component";
import { WarehouseUpdateComponent } from "./warehouse-update/warehouse-update.component";
import { RouteCreateComponent } from "./route-create/route-create.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { RouteDetailsComponent } from "./route-details/route-details.component";
import { DestinationsCreateComponent } from "./destinations-create/destinations-create.component";
import { ResourceTypeCreateComponent } from "./resource-type-create/resource-type-create.component";
import { ResourceTypeListComponent } from "./resource-type-list/resource-type-list.component";
import { ResourceTypeUpdateComponent } from "./resource-type-update/resource-type-update.component";
import { WarehouseDetailsComponent } from "./warehouse-details/warehouse-details.component";

const routes: Routes = [
  { path: '', redirectTo: 'warehouses', pathMatch: 'full' },

  { path: 'warehouses', component: WarehouseListComponent },
  { path: 'warehouses/add', component: WarehouseCreateComponent },
  { path: 'warehouses/update/:id', component: WarehouseUpdateComponent },
  { path: 'warehouses/details/:id', component: WarehouseDetailsComponent },

  { path: 'routes', component: RouteListComponent },
  { path: 'routes/add', component: RouteCreateComponent },
  { path: 'routes/details/:id', component: RouteDetailsComponent },

  { path: 'resource-types', component: ResourceTypeListComponent },
  { path: 'resource-types/add', component: ResourceTypeCreateComponent },
  { path: 'resource-types/update/:id', component: ResourceTypeUpdateComponent },

  { path: 'destinations/create/route/:id', component: DestinationsCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
