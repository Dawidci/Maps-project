import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { RouteListComponent } from '../route-list/route-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Destination } from "../destination";
import { DestinationService } from "../destination.service";

import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  id: number;
  route0: Route;
  firstWarehouse: Warehouse;
  lastWarehouse: Warehouse;
  destinations: Observable<Destination[]>;
  map: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService) { }

  async ngOnInit() {

    this.route0 = new Route();
    this.firstWarehouse = new Warehouse();
    this.lastWarehouse = new Warehouse();

    this.id = this.route.snapshot.params['id'];

    this.reloadData();

    await this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;

        this.warehouseService.getWarehouse(this.route0.id_first_warehouse)
          .subscribe(first => {
            console.log(first);
            this.firstWarehouse = first;
          }, error => console.log(error));

        this.warehouseService.getWarehouse(this.route0.id_last_warehouse)
          .subscribe(last => {
            console.log(last);
            this.lastWarehouse = last;
          }, error => console.log(error));
      }, error => console.log(error));

    await this.delay(500);
    this.loadMap();
  }

  reloadData() {
    this.destinations = this.destinationService.getDestinatonsByRoute(this.id);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  loadMap() {
    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const route = L.Routing.control({
      waypoints: [
        L.latLng(this.firstWarehouse.latitude, this.firstWarehouse.longitude),
        L.latLng(this.lastWarehouse.latitude, this.lastWarehouse.longitude),
      ]
    }).addTo(this.map);

    route.on('routesfound', function(e) {
      let routes = e.routes;
      let summary = routes[0].summary;
      // alert distance and time in km and minutes
      alert('Total distance is ' + Math.round(summary.totalDistance / 1000) + ' km.' + '\n' +
            'Total time is ' + Math.round(summary.totalTime / 3600) + ' hours ' +
            'and ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes.');
    });
  }

  list(){
    this.router.navigate(['routes/list']);
  }
}
