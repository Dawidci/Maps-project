import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { Destination } from "../../models/destination";
import { DestinationService } from "../../services/destination.service";
import { MapService} from "../../services/map.service";
import { ResourceTypeService } from "../../services/resource-type.service";
import { Resource } from "../../models/resource";
import { ResourceService } from "../../services/resource.service";
import { TransportService } from "../../services/transport.service";
import { Transport } from "../../models/transport";
import { ComputeOrderService } from "../../services/compute-order.service";
import { ResourceType } from "../../models/resource-type";

@Component({
  selector: 'app-destinations-create',
  templateUrl: './destinations-create.component.html',
  styleUrls: ['./destinations-create.component.css']
})
export class DestinationsCreateComponent implements OnInit {

  resourceTypes: Observable<ResourceType[]> = this.resourceTypeService.getResourceTypesList();
  warehouses: Observable<Warehouse[]> = this.mapService.loadWarehouses();
  createdRoute: Route = new Route();
  destinations: Destination[] = [];
  chosenWarehouses: Warehouse[] = [];
  result: Resource[][] = [];
  transport: Transport = new Transport();
  allDestinations: Destination[][] = [];
  allWarehouses: Warehouse[][] = [];
  destinationToAdd: Destination = new Destination();
  warehousesToSelect: Warehouse[] = [];

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
              private transportService: TransportService,
              private mapService: MapService,
              private computeOrderService: ComputeOrderService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.warehouses.subscribe(warehouses => this.warehousesToSelect = warehouses, error => console.log(error));
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
    this.loadRoute();
  }

  loadRoute() {
    this.routeService.getRoute(this.route.snapshot.params['id'])
      .subscribe(route => {
        this.createdRoute = route;
        this.transport.idRoute = route.id;
        this.getFirstWarehouse();
      }, error => console.log(error));
  }

  getFirstWarehouse() {
    this.warehouseService.getWarehouse(this.createdRoute.id_first_warehouse)
      .subscribe(first => this.deleteWarehouseFromSelectList(first),error => console.log(error));
  }

  deleteWarehouseFromSelectList(warehouseToRemove) {
    this.destinations.push({id:null, id_route: this.createdRoute.id, id_warehouse: warehouseToRemove.id, order: null});
    this.chosenWarehouses.push(warehouseToRemove);
    this.warehousesToSelect = this.warehousesToSelect.filter(warehouse => warehouse.name !== warehouseToRemove.name);
  }

  addDestinationToList() {
    this.loadWarehouseToChosenWarehouses(this.destinationToAdd.id_warehouse);
    this.destinationToAdd = new Destination();
  }

  loadWarehouseToChosenWarehouses(idWarehouse: number) {
    this.warehouseService.getWarehouse(idWarehouse)
      .subscribe(warehouse => this.deleteWarehouseFromSelectList(warehouse),error => console.log(error));
  }

  onSubmit() {
    this.computeOrderService.computeDistance(this.chosenWarehouses);
    this.destinations = this.computeOrderService.computeOrder(this.destinations, this.chosenWarehouses);
    this.createDestinations();
    this.gotoList();
  }

  createDestinations() {
    this.destinations.forEach(destination => {
      this.destinationService.createDestination(destination).subscribe(error => console.log(error));
    });
  }

  gotoList() {
    this.router.navigate(['/routes']);
  }

  createRouteByResource() {
    this.resourceTypeService.getResourceType(this.transport.idResourceType)
      .subscribe(type => this.getResourcesByType(type),error => console.log(error));
  }

  async getResourcesByType(type: ResourceType) {
    this.resourceService.getResourcesByIdResourceType(type.id)
      .subscribe(resources => {
        this.deleteResourceFromFirstWarehouse(resources);
        this.sumResourceTypeTotalQuantity(resources);
      }, error => console.log(error));
  }

  async deleteResourceFromFirstWarehouse(resources: Resource[]) {
    resources.forEach(resource => {
      if(resource.idWarehouse == this.chosenWarehouses[0].id) {
        resources.splice(resources.findIndex(resource => resource.idWarehouse == this.chosenWarehouses[0].id), 1);
      }
    });
  }

  async sumResourceTypeTotalQuantity(resources: Resource[]) {
    let totalQuantity = 0;
    resources.forEach(resource => totalQuantity += resource.quantity);

    if(totalQuantity >= this.transport.quantity) {
      this.getResourceMatrix(resources);
      this.saveByResource();
    } else {
      alert("Not enough resources\n" +
        "You need: " + this.transport.quantity + "\n" +
        "Total quantity: " + totalQuantity);
    }
  }

  getResourceMatrix(resources: Resource[]) {
    resources.sort((a, b) => b.quantity - a.quantity);

    for(let i = 0; i < resources.length; i++) {
      if(resources[i].quantity >= this.transport.quantity) {
        let local: Resource[] = [];
        local.push(resources[i]);
        this.result.push(local);
      } else if ((i + 1) == resources.length) {
        break;
      } else {
        let localMatrix: Resource[] = [];
        let sum = 0;
        localMatrix.push(resources[i]);
        sum += resources[i].quantity;
        this.getResult(resources, i, localMatrix, sum);
      }
    }
  }

  getResult(resources, i, localMatrix, sum) {
    for(let j = i + 1; j < resources.length; j++) {
      let local: Resource[] = [];
      let total: Resource[] = [];
      let localSum: number = sum;

      local.push(resources[j]);
      localSum += resources[j].quantity;
      total = localMatrix.concat(local);

      if(localSum >= this.transport.quantity) {
        this.result.push(total);
      } else if((j + 1) == resources.length) {
        break;
      } else {
        this.getResult(resources, j, total, localSum);
      }
    }
  }

  async saveByResource() {
    await this.fillAllDestinationsArray();
    this.createTransport();
    await this.delay(500);
    this.destinations = await this.computeOrderService.computeAllOrder(this.allDestinations, this.allWarehouses);
    await this.createDestinations();
    this.gotoList();
  }

  async fillAllDestinationsArray() {
    for(let i = 0; i < this.result.length; i++) {
      this.allDestinations[i] = [];
      this.allWarehouses[i] = [];
      this.allDestinations[i].push({id:1, id_route: this.createdRoute.id, id_warehouse: this.createdRoute.id_first_warehouse, order: 1});

      this.warehouses.subscribe(warehouses => {
        let warehouse = warehouses.find(warehouse => warehouse.id == this.createdRoute.id_first_warehouse);
        this.allWarehouses[i].push(warehouse);
      });

      for(let j = 0; j < this.result[i].length; j++) {
        this.warehouses.subscribe(warehouses => {
          let warehouse = warehouses.find(warehouse => warehouse.id == this.result[i][j].idWarehouse);
          this.allDestinations[i].push({id: null, id_route: this.createdRoute.id, id_warehouse: warehouse.id, order: null});
          this.allWarehouses[i].push(warehouse);
        }, error => console.log(error));
      }
    }
  }

  createTransport() {
    this.transportService.createTransport(this.transport).subscribe(error => console.log(error));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
