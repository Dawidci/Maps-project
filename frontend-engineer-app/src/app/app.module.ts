import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { WarehouseCreateComponent } from './components/warehouse-create/warehouse-create.component';
import { WarehouseUpdateComponent } from './components/warehouse-update/warehouse-update.component';
import { RouteCreateComponent } from './components/route-create/route-create.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { DestinationsCreateComponent } from './components/destinations-create/destinations-create.component';
import { ResourceTypeCreateComponent } from './components/resource-type-create/resource-type-create.component';
import { ResourceTypeListComponent } from './components/resource-type-list/resource-type-list.component';
import { ResourceTypeUpdateComponent } from './components/resource-type-update/resource-type-update.component';
import { WarehouseDetailsComponent } from './components/warehouse-details/warehouse-details.component';
import {AllWarehousesResolverService} from "./all-warehouses-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    WarehouseListComponent,
    WarehouseCreateComponent,
    WarehouseUpdateComponent,
    RouteCreateComponent,
    RouteListComponent,
    RouteDetailsComponent,
    DestinationsCreateComponent,
    ResourceTypeCreateComponent,
    ResourceTypeListComponent,
    ResourceTypeUpdateComponent,
    WarehouseDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AllWarehousesResolverService],
  bootstrap: [AppComponent],
})
export class AppModule { }
