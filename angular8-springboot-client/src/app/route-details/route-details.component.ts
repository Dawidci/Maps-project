import { Component, OnInit } from '@angular/core';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { RouteListComponent } from '../route-list/route-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import {Warehouse} from "../warehouse";
import {WarehouseService} from "../warehouse.service";

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
  id_first: number;
  id_last: number;
  name: string;
  map: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.loadMap();

    this.route0 = new Route();
    this.firstWarehouse = new Warehouse();
    this.lastWarehouse = new Warehouse();

    this.id = this.route.snapshot.params['id'];

    this.id_first = 32;
    this.id_last = 33;

    this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data)
        this.route0 = data;
      }, error => console.log(error));

    this.warehouseService.getWarehouse(this.id_first)
      .subscribe(data => {
        console.log(data);
        this.firstWarehouse = data;
      }, error => console.log(error));

    this.warehouseService.getWarehouse(this.id_last)
      .subscribe(data => {
        console.log(data);
        this.lastWarehouse = data;
      }, error => console.log(error));
  }

  loadMap() {
    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const route = L.Routing.control({
      waypoints: [
        L.latLng(40.5663651,-75.6032277),
        L.latLng(40.00195, -76.073299),
        L.latLng(42.3673945,-83.0750408)
      ]
    }).addTo(this.map);

    route.on('routesfound', function(e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      // alert distance and time in km and minutes
      alert('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
    });
  }

  list(){
    this.router.navigate(['routes/list']);
  }
}