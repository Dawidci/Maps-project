import { Component, OnInit } from '@angular/core';
import { RouteService } from "../../services/route.service";
import { WarehouseService } from "../../services/warehouse.service";
import { Route } from "../../models/route";
import { Router } from '@angular/router';
import { DestinationService } from "../../services/destination.service";
import { TransportService } from "../../services/transport.service";

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  routes: Route[] = [];
  warehouseNames: string[] = [];

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private transportService: TransportService,
              private router: Router) {}

  ngOnInit() {
    this.loadRoutes();
  }

  loadRoutes() {
    this.routeService.getRoutesList()
      .subscribe(data => {
        this.routes = data;
        this.loadWarehouseNames();
      },error => console.log(error));
  }

  loadWarehouseNames() {
    for(let i = 0; i < this.routes.length; i++) {
      this.warehouseService.getWarehouse(this.routes[i].id_first_warehouse)
        .subscribe(warehouse => {
          this.warehouseNames[i] = warehouse.name;
        }, error => console.log(error));
    }
  }

  deleteRoute(id: number) {
    this.deleteDestinationsByIdRoute(id);
    this.deleteTransportByIdRoute(id);
    this.deleteRouteById(id);
  }

  deleteDestinationsByIdRoute(id: number) {
    this.destinationService.getDestinatonsByRoute(id)
      .subscribe(destinations => {
        for (let i = 0; i < destinations.length; i++) {
          this.destinationService.deleteDestination(destinations[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteTransportByIdRoute(id: number) {
    this.transportService.getTransportByIdRoute(id)
      .subscribe(transport => {
        this.transportService.deleteTransport(transport.id).subscribe();
      },error => console.log(error));
  }

  deleteRouteById(id: number) {
    this.routeService.deleteRoute(id)
      .subscribe(() => this.ngOnInit(), error => console.log(error));
  }

  routeDetails(id: number){
    this.router.navigate(['/routes/details', id]);
  }
}
