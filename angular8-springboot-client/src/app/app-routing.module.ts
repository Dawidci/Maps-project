import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UpdateEmployeeComponent } from "./update-employee/update-employee.component";
import { WarehouseListComponent } from "./warehouse-list/warehouse-list.component";
import { WarehouseCreateComponent } from "./warehouse-create/warehouse-create.component";
import { MapComponent } from "./map/map.component";
import { WarehouseUpdateComponent } from "./warehouse-update/warehouse-update.component";
import { CreateComponent } from "./create/create.component";
import { RouteCreateComponent } from "./route-create/route-create.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { RouteDetailsComponent } from "./route-details/route-details.component";
import { DestinationsCreateComponent } from "./destinations-create/destinations-create.component";

const routes: Routes = [
  { path: '', redirectTo: 'warehouses', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'addEmp', component: CreateEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent },
  { path: 'map', component: MapComponent },
  { path: 'create', component: CreateComponent },

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
