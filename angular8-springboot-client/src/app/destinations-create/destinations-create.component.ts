import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Route } from '../route';
import { RouteService } from '../route.service';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Destination } from "../destination";
import { DestinationService } from "../destination.service";

import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-destinations-create',
  templateUrl: './destinations-create.component.html',
  styleUrls: ['./destinations-create.component.css']
})
export class DestinationsCreateComponent implements OnInit {

  id: number;
  route0: Route;
  warehouses: Observable<Warehouse[]>;
  destinations: Destination[] = [];
  firstWarehouse: Warehouse;
  lastWarehouse: Warehouse;
  wars: Warehouse[] = [];
  name: string;
  map: any;
  newDestinations: number[] = [];
  count = 2;
  submitted = false;
  leafletRoute: any[] = [];
  distance: number[][] = [];
  order: number[] = [];

  destinationForm = this.fb.group({
    firstDestination: [{value: '', disabled: true}, Validators.required],
    lastDestination: [{value: '', disabled: true}, Validators.required],
    newDestination: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private fb: FormBuilder) { }

  async ngOnInit() {
    this.route0 = new Route();

    this.reloadData();
    this.loadMap();

    this.id = this.route.snapshot.params['id'];

    await this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;
        this.destinations.push({id:1, id_route: this.id, id_warehouse: this.route0.id_first_warehouse, order: 1});
        this.destinations.push({id:2, id_route: this.id, id_warehouse: this.route0.id_last_warehouse, order: 2});

        this.warehouseService.getWarehouse(this.route0.id_first_warehouse)
          .subscribe(first => {
            console.log(first);
            this.firstWarehouse = first;
          })

        this.warehouseService.getWarehouse(this.route0.id_last_warehouse)
          .subscribe(last => {
            console.log(last);
            this.lastWarehouse = last;
          })
      }, error => console.log(error));
  }

  reloadData() {
    this.warehouses = this.warehouseService.getWarehousesList();
  }

  loadMap() {
    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.warehouses.subscribe(elements => {
      elements.forEach((warehouse : any) => {
        console.log(warehouse.name);
        let marker = new L.Marker([warehouse.latitude, warehouse.longitude]).addTo(this.map);
        marker.bindPopup("ID: " + warehouse.id.toString() + "<br>" +
          "Name: " + warehouse.name + "<br>" +
          "Latitude: " + warehouse.latitude.toString() + "<br>" +
          "Longitude: " + warehouse.longitude.toString() + "<br>" +
          "Seaport: " + warehouse.airport.toString() + "<br>" +
          "Airport: " + warehouse.seaport.toString() + "<br>");
      })
    });
  }

  addNewDestination() {
    this.count++;
    this.destinations.push({id: this.count, id_route: this.id, id_warehouse: 0, order: this.count});
    this.newDestinations.push(this.count);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    alert('New route and destinations added');
  }

  async save() {
    await this.loadWarehouses();
    await this.delay(100);
    await this.computeDistance();
    await this.computeOrder();

    for(let i = 0; i < this.destinations.length; i++) {
      await this.destinationService.createDestination(this.destinations[i])
        .subscribe(data => {
          console.log(data);
        }, error => console.log(error));
    }

    this.gotoList();
  }

  computeDistance() {
    for(let i = 0; i < this.wars.length; i++) {
      this.distance[i] = [];
      for(let j = 0; j < this.wars.length; j++) {
        if(i != j) {
          let lat = Math.abs(this.wars[i].latitude - this.wars[j].latitude);
          let long = Math.abs(this.wars[i].longitude - this.wars[j].longitude);

          lat *= lat;
          long *= long;

          this.distance[i][j] = Math.sqrt(lat + long);
        }
      }
    }
  }

  computeOrder() {
    let start = 0;
    let dist = 1000;
    let newStart = 0;

    for(let i = 0; i < this.wars.length; i++) {
      this.order.push(start);

      for(let j = 0; j < this.wars.length; j++) {
        delete this.distance[j][start];
      }

      for(let j = 0; j < this.wars.length; j++) {
        if(this.distance[start][j] < dist) {
          dist = this.distance[start][j];
          newStart = j;
        }
      }

      start = newStart;
      dist = 1000;
    }

    for(let i = 0; i < this.order.length; i++) {
      this.destinations[i].order = this.order[i] + 1;
    }
  }

  loadWarehouses() {
    for(let i = 0; i < this.destinations.length; i++) {
      this.warehouseService.getWarehouse(this.destinations[i].id_warehouse)
        .subscribe(warehouse => {
          console.log(warehouse);
          this.wars[i] = warehouse;
        });
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  gotoList() {
    this.router.navigate(['/routes/list']);
  }
}
