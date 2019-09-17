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
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  { path: '', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'addEmp', component: CreateEmployeeComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  { path: 'update/:id', component: UpdateEmployeeComponent },
  { path: 'warehouses', component: WarehouseListComponent },
  { path: 'warehouses/add', component: WarehouseCreateComponent },
  { path: 'map', component: MapComponent },
  { path: 'warehouses/update/:id', component: WarehouseUpdateComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
