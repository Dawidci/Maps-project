import { Component, OnInit } from '@angular/core';
import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { Destination } from "../../models/destination";
import { DestinationService } from "../../services/destination.service";
import { MapService } from "../../services/map.service";
import { Transport } from "../../models/transport";
import { TransportService } from "../../services/transport.service";
import { ResourceType } from "../../models/resource-type";
import { ResourceTypeService } from "../../services/resource-type.service";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  id: number;
  route0: Route;
  transport: Transport;
  resourceType: ResourceType;
  warehouses: Warehouse[] = [];
  destinations: Destination[] = [];
  latlngArray: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private resourceTypeService: ResourceTypeService,
              private transportService: TransportService,
              private destinationService: DestinationService) { }

  async ngOnInit() {
    this.route0 = new Route();
    this.transport = new Transport();
    this.id = this.route.snapshot.params['id'];
    await this.reloadData();
    await this.loadRoute();
    await this.loadTransport();
    await this.delay(250);
    this.loadMap();
  }

  reloadData() {
    this.destinationService.getDestinatonsByRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.destinations = data;
        this.destinations.sort((a,b) => a.order - b.order);
      });
  }

  loadRoute() {
    this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;
        this.loadWarehouses();
      }, error => console.log(error));
  }

  loadWarehouses() {
    for(let i = 0; i < this.destinations.length; i++) {
      console.log(this.destinations[i].id_warehouse);
      this.warehouseService.getWarehouse(this.destinations[i].id_warehouse)
        .subscribe(warehouse => {
          console.log(warehouse);
          this.warehouses[i] = warehouse;
        });
    }
  }

  loadTransport() {
    this.transportService.getTransportByIdRoute(this.id)
      .subscribe(transport => {
        console.log(transport);
        this.transport = transport;
        this.loadResourceType();
      },error => console.log(error));
  }

  loadResourceType() {
    this.resourceTypeService.getResourceType(this.transport.idResourceType)
      .subscribe(resourceType => {
        console.log(resourceType);
        this.resourceType = resourceType;
      }, error => console.log(error))
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async loadMap() {
    await this.mapsService.initializeMap();
    await this.mapsService.loadCoordinatesArray(this.warehouses, this.latlngArray);
    await this.mapsService.showRoute(this.latlngArray);
    this.mapsService.showWarehousesWithDetails(this.warehouses);
    this.showRouteDetailsAlert();
  }

  showRouteDetailsAlert() {
    this.mapsService.leafletRoute.on('routesfound', function(e) {
      let routes = e.routes;
      let summary = routes[0].summary;
      alert('Total distance is ' + Math.round(summary.totalDistance / 1000) + ' km.' + '\n' +
        'Total time is ' + Math.round(summary.totalTime / 3600) + ' hours ' +
        'and ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes.');
    });
  }

  goToRoutelist(){
    this.router.navigate(['routes']);
  }
}
