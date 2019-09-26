import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseCreateComponent } from './warehouse-create/warehouse-create.component';
import { MapComponent } from './map/map.component';
import { WarehouseUpdateComponent } from './warehouse-update/warehouse-update.component';
import { RouteCreateComponent } from './route-create/route-create.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { DestinationsCreateComponent } from './destinations-create/destinations-create.component';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseListComponent,
    WarehouseCreateComponent,
    MapComponent,
    WarehouseUpdateComponent,
    RouteCreateComponent,
    RouteListComponent,
    RouteDetailsComponent,
    DestinationsCreateComponent,
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
