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
import { MapService} from "../map.service";
import { ResourceTypeService } from "../resource-type.service";
import { ResourceType } from "../resource-type";
import { Resource } from "../resource";
import {ResourceService} from "../resource.service";

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
  wars: Warehouse[] = [];
  newDestinations: number[] = [];
  count = 1;
  submitted = false;
  distance: number[][] = [];
  resourceTypes: ResourceType[] = [];
  resource: Resource;
  resourceWarehouses: Warehouse[] = [];
  resources: Resource[] = [];
  resourceDestinations: Destination[][] = [];
  resourceMatrix: Resource[][] = [];


  destinationForm = this.fb.group({
    firstDestination: [{value: '', disabled: true}, Validators.required],
    newDestination: [''],
    resource: [''],
    quantity: [0],
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private resourceTypeService: ResourceTypeService,
              private resourceService: ResourceService,
              private mapService: MapService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.route0 = new Route();
    this.resource = new Resource();

    this.reloadData();
    this.getResourceTypes();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
    this.loadRoute();
  }

  getResourceTypes() {
    this.resourceTypeService.getResourceTypesList()
      .subscribe(resourceTypes => {
        console.log(resourceTypes);
        this.resourceTypes = resourceTypes;
      }, error => console.log(error));
  }

  loadRoute() {
    this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;
        this.destinations.push({id:1, id_route: this.id, id_warehouse: this.route0.id_first_warehouse, order: 1});

        this.warehouseService.getWarehouse(this.route0.id_first_warehouse)
          .subscribe(first => {
            console.log(first);
            this.firstWarehouse = first;
          }, error => console.log(error));

      }, error => console.log(error));
  }

  reloadData() {
    this.warehouses = this.mapService.loadWarehouses();
  }

  addNewDestination() {
    this.count++;
    this.destinations.push({id: this.count, id_route: this.id, id_warehouse: 0, order: this.count});
    this.newDestinations.push(this.count);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  createRouteByResource() {
    //this.submitted = true;
    //getResourcesByIdResourceType();
    //

    this.saveByResource();
  }

  saveByResource() {
    this.resourceTypeService.getResourceType(this.resource.idResourceType)
      .subscribe(type => {
        console.log(type);
        let totalQuantity = 0;

        this.resourceService.getResourcesByIdResourceType(type.id)
          .subscribe(resources => {
            console.log(resources);
            this.resources = resources;

            for(let i = 0; i < resources.length; i++) {
              totalQuantity += resources[i].quantity;
            }

            this.getResourceMatrix(resources);

          }, error => console.log(error));

      });
  }

  getResourceMatrix(resources) {
    let localResources = resources;
    console.log(this.resource.quantity);

    for(let i = 0; i < localResources.length; i++) {
      localResources.sort((a,b) => b.quantity - a.quantity);
      console.log(localResources[i]);

      if(localResources[i].quantity >= this.resource.quantity) {
        this.resourceMatrix[i].push(localResources[i]);
        this.resourceMatrix[i].push(localResources[i]);
      }
    }

    for(let i = 0; i < localResources.length; i++) {
      console.log(this.resourceMatrix[i]);
    }



    console.log(this.resourceMatrix);



  }


  async save() {
    await this.loadWarehouses();
    await this.delay(250);
    await this.computeDistance();
    await this.computeOrder();
    await this.createDestinations();
    this.gotoList();
  }

  async createDestinations() {
    for(let i = 0; i < this.destinations.length; i++) {
      await this.destinationService.createDestination(this.destinations[i])
        .subscribe(data => {
          console.log(data);
        }, error => console.log(error));
    }
  }

  computeDistance() {
    for(let i = 0; i < this.wars.length; i++) {
      this.distance[i] = [];
      for(let j = 0; j < this.wars.length; j++) {
        if(i != j) {
          this.distance[i][j] = this.distanceBetweenCoordinates(this.wars[i].latitude,
            this.wars[i].longitude, this.wars[j].latitude, this.wars[j].longitude);
        }
      }
    }
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
    let earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusKm * c;
  }

  computeOrder() {
    let start = 0;
    let dist = 10000000;
    let newStart = 0;
    let count = 1;

    for(let i = 0; i < this.wars.length; i++) {
      console.log("START: " + start + ", WAR: " + this.wars[start].id);
      this.destinations[start].order = count;

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
      dist = 10000000;
      count++;
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
    this.router.navigate(['/routes']);
  }
}
