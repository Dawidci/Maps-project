import { WarehouseService } from "../../services/warehouse.service";
import { MapService } from "../../services/map.service";
import { Warehouse } from "../../models/warehouse";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { RouteListComponent } from "../route-list/route-list.component";
import { RouteService } from "../../services/route.service";
import { DestinationService } from "../../services/destination.service";
import { ResourceService } from "../../services/resource.service";

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: Warehouse[] = [];

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
  }

  reloadData() {
    this.warehouseService.getWarehousesList()
      .subscribe(warehouses => {
        this.warehouses = warehouses;
        this.mapService.showWarehousesWithParameters(warehouses);
      }, error => console.log(error));
  }

  deleteWarehouse(id: number) {
    this.deleteResourcesByIdWarehouse(id);
    this.deleteDestinationsByIdWarehouse(id);
    this.deleteRoutesByWarehouseId(id);
    this.deleteWarehouseById(id);
  }

  deleteResourcesByIdWarehouse(id: number) {
    this.resourceService.getResourcesByIdWarehouse(id)
      .subscribe(resources => {
        resources.forEach(resource => {
          this.resourceService.deleteResource(resource.id).subscribe(error => console.log(error));
        });
      }, error => console.log(error));
  }

  deleteDestinationsByIdWarehouse(id: number) {
    this.destinationService.getDestinatonsByWarehouse(id)
      .subscribe(destinations => {
        destinations.forEach(destination => {
          this.destinationService.deleteDestination(destination.id).subscribe(error => console.log(error));
        });
      }, error => console.log(error));
  }

  deleteRoutesByWarehouseId(id: number) {
    this.routeService.getRoutesByWarehouse(id)
      .subscribe(routes => {
        routes.forEach(route => {
          this.routeListComponent.deleteRoute(route.id);
        });
      }, error => console.log(error));
  }

  deleteWarehouseById(id: number) {
    this.warehouseService.deleteWarehouse(id).subscribe(() => this.reloadData(),error => console.log(error));
  }

  updateWarehouse(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

  warehouseDetails(id: number) {
    this.router.navigate(['warehouses/details', id]);
  }
}
