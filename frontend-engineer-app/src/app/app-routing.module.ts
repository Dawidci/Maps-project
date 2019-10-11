import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WarehouseListComponent } from "./components/warehouse-list/warehouse-list.component";
import { WarehouseCreateComponent } from "./components/warehouse-create/warehouse-create.component";
import { WarehouseUpdateComponent } from "./components/warehouse-update/warehouse-update.component";
import { RouteCreateComponent } from "./components/route-create/route-create.component";
import { RouteListComponent } from "./components/route-list/route-list.component";
import { RouteDetailsComponent } from "./components/route-details/route-details.component";
import { DestinationsCreateComponent } from "./components/destinations-create/destinations-create.component";
import { ResourceTypeCreateComponent } from "./components/resource-type-create/resource-type-create.component";
import { ResourceTypeListComponent } from "./components/resource-type-list/resource-type-list.component";
import { ResourceTypeUpdateComponent } from "./components/resource-type-update/resource-type-update.component";
import { WarehouseDetailsComponent } from "./components/warehouse-details/warehouse-details.component";
import {AllWarehousesResolverService} from "./all-warehouses-resolver.service";

const routes: Routes = [
  { path: '', redirectTo: 'warehouses', pathMatch: 'full' },

  { path: 'warehouses', component: WarehouseListComponent, resolve: { warehouses: AllWarehousesResolverService }},
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
  exports: [RouterModule],
  providers: [ AllWarehousesResolverService ]
})
export class AppRoutingModule { }
