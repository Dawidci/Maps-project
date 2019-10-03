import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseCreateComponent } from './warehouse-create/warehouse-create.component';
import { WarehouseUpdateComponent } from './warehouse-update/warehouse-update.component';
import { RouteCreateComponent } from './route-create/route-create.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { DestinationsCreateComponent } from './destinations-create/destinations-create.component';
import { ResourceTypeCreateComponent } from './resource-type-create/resource-type-create.component';
import { ResourceTypeListComponent } from './resource-type-list/resource-type-list.component';
import { ResourceTypeUpdateComponent } from './resource-type-update/resource-type-update.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
