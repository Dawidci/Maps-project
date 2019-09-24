import {Observable} from "rxjs";
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Route} from "../route";
import {RouteService} from "../route.service";
import {WarehouseService} from "../warehouse.service";
import {DestinationService} from "../destination.service";
import {Warehouse} from "../warehouse";
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Destination} from "../destination";

import * as L from 'leaflet';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteCreateComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  route: Route = new Route();
  id_route: number;
  submitted = false;
  destinations: Observable<Destination[]>;
  destination: Destination = new Destination();
  dest: Destination[] = [];
  count: number = 0;
  map: any;

  routeForm = this.fb.group({
    name: ['', Validators.required],
    id_first_warehouse: ['', Validators.required],
    id_last_warehouse: ['', Validators.required],
    destination: ['']
  }, {validator: this.checkWarehouses });

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.reloadData();
    this.loadMap();
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

  onSubmit() {
    this.submitted = true;
    this.save();
    alert('New route and destinations added');
  }

  async save() {
    await this.routeService.createRoute(this.route)
      .subscribe(data => console.log(data), error => console.log(error));

    await this.routeService.getRouteByName(this.route.name)
      .subscribe(data => {
        console.log(data);
        this.route = data;
        this.createDestinations(this.route.id);
      }, error => console.log(error));

    this.route = new Route();
    //this.gotoList();
  }

  createDestinations(id: number) {
    this.router.navigate(['destinations/create/route', id]);
  }

  /*
  gotoList() {
    this.router.navigate(['/routes']);
  }
 */

  checkWarehouses(group: FormGroup) {
    let id_first_warehouse = group.get('id_first_warehouse').value;
    let id_last_warehouse = group.get('id_last_warehouse').value;

    return id_first_warehouse !== id_last_warehouse ? null : { notSame: true }
  }

  addNewDestination() {
    this.count++;
    alert("You clicked button!");
    this.dest.push({id:0, id_route:0, id_warehouse:0, order: this.count});
    /*
    this.destinations.subscribe(elements => {
      elements.push(this.destination);
    });
    */

  }
}
