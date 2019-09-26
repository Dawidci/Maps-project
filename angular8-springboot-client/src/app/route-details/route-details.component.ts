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
  warehouses: Warehouse[] = [];
  destinations: Destination[] = [];
  latlngArray: any[] = [];
  leafletRoute: any;
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

    await this.reloadData();

    await this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;

        for(let i = 0; i < this.destinations.length; i++) {
          console.log(this.destinations[i].id_warehouse);
          this.warehouseService.getWarehouse(this.destinations[i].id_warehouse)
            .subscribe(warehouse => {
              console.log(warehouse);
              this.warehouses[i] = warehouse;
            });
        }

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


    await this.delay(1000);
    this.loadMap();
  }

  loadWarehouses() {

  }

  reloadData() {
    this.destinationService.getDestinatonsByRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.destinations = data;
        this.destinations.sort((a,b) => a.order - b.order);
      });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  loadMap() {
    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    for (let i = 0; i < this.warehouses.length; i++) {
      let ltln = L.latLng(this.warehouses[i].latitude, this.warehouses[i].longitude);
      console.log("LTLN: " + ltln);
      this.latlngArray.push(ltln);
    }

    this.leafletRoute = L.Routing.control({
      waypoints: this.latlngArray,
      show: false
    }).addTo(this.map);

    this.leafletRoute.on('routesfound', function(e) {
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
