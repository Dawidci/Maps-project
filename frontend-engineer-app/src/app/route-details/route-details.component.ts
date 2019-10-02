import { Component, OnInit } from '@angular/core';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Destination } from "../destination";
import { DestinationService } from "../destination.service";
import { MapService} from "../map.service";

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  id: number;
  route0: Route;
  warehouses: Warehouse[] = [];
  destinations: Destination[] = [];
  latlngArray: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private destinationService: DestinationService) { }

  async ngOnInit() {
    this.route0 = new Route();
    this.id = this.route.snapshot.params['id'];
    await this.reloadData();
    await this.loadRoute();
    await this.delay(250);
    this.loadMap();
  }

  reloadData() {
    this.destinationService.getDestinatonsByRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.destinations = data;
        this.destinations.sort((a,b) => a.order - b.order);
        console.log("RELOAD DATA");
      });
  }

  loadRoute() {
    this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;
        this.loadWarehouses();
        console.log("LOAD ROUTE");
      }, error => console.log(error));
  }

  loadWarehouses() {
    for(let i = 0; i < this.destinations.length; i++) {
      console.log(this.destinations[i].id_warehouse);
      this.warehouseService.getWarehouse(this.destinations[i].id_warehouse)
        .subscribe(warehouse => {
          console.log(warehouse);
          this.warehouses[i] = warehouse;
          console.log("LOAD ROUTE - LOAD WAREHOUSES");
        });
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async loadMap() {
    await this.mapsService.initializeMap();
    await this.mapsService.loadCoordinatesArray(this.warehouses, this.latlngArray);
    await this.mapsService.showRoute(this.latlngArray);
    await this.showRouteDetailsAlert();
  }

  showRouteDetailsAlert() {
    this.mapsService.leafletRoute.on('routesfound', function(e) {
      let routes = e.routes;
      let summary = routes[0].summary;
      alert('Total distance is ' + Math.round(summary.totalDistance / 1000) + ' km.' + '\n' +
        'Total time is ' + Math.round(summary.totalTime / 3600) + ' hours ' +
        'and ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes.');
    });
    console.log("LOAD MAP - SHOW ALERT");
  }

  list(){
    this.router.navigate(['routes/list']);
  }
}
