import { Observable } from "rxjs";
import { WarehouseService } from "../../services/warehouse.service";
import { MapService } from "../../services/map.service";
import { Warehouse } from "../../models/warehouse";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import {RouteListComponent} from "../route-list/route-list.component";
import {RouteService} from "../../services/route.service";
import {DestinationService} from "../../services/destination.service";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  wart: any;
  map: any;

  constructor(private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private routeService: RouteService,
              private destinationService: DestinationService,
              private routeListComponent: RouteListComponent,
              private resourceService: ResourceService,
              private mapService: MapService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
  }

  reloadData() {
    this.warehouses = this.mapService.loadWarehouses();
  }

  deleteWarehouse(id: number) {
    this.deleteResourcesByIdWarehouse(id);
    this.deleteDestinationsByIdWarehouse(id);
    this.deleteRoutesByWarehouseId(id);
    this.deleteWarehouseById(id);
  }

  deleteResourcesByIdWarehouse(id) {
    this.resourceService.getResourcesByIdWarehouse(id)
      .subscribe(resources => {
        for(let i = 0; i < resources.length; i++) {
          this.resourceService.deleteResource(resources[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteDestinationsByIdWarehouse(id) {
    this.destinationService.getDestinatonsByWarehouse(id)
      .subscribe(destinations => {
        for (let i = 0; i < destinations.length; i++) {
          this.destinationService.deleteDestination(destinations[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteRoutesByWarehouseId(id) {
    this.routeService.getRoutesByWarehouse(id)
      .subscribe(routes => {
        for(let i = 0; i < routes.length; i++) {
          this.routeListComponent.deleteRoute(routes[i].id);
        }
      }, error => console.log(error));
  }

  deleteWarehouseById(id) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(
        data => {
          this.reloadData();
        },error => console.log(error));
  }

  updateWarehouse(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

  warehouseDetails(id: number) {
    this.router.navigate(['warehouses/details', id]);
  }
}
