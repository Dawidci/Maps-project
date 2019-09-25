import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Route } from '../route';
import { RouteService } from '../route.service';
import { RouteListComponent } from '../route-list/route-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { DestinationService } from "../destination.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {Destination} from "../destination";

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
  name: string;
  map: any;
  newDestinations: number[] = [];
  count = 2;
  submitted = false;

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

  list(){
    this.router.navigate(['routes/list']);
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
    alert("You clicked button!");
    this.destinations.push({id: this.count, id_route: this.id, id_warehouse: 0, order: this.count});
    this.newDestinations.push(this.count);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    alert('New route and destinations added');
  }

  async save() {
    for(let i = 0; i < this.destinations.length; i++) {
      await this.destinationService.createDestination(this.destinations[i])
        .subscribe(data => console.log(data), error => console.log(error));
    }

    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/routes/list']);
  }
}
