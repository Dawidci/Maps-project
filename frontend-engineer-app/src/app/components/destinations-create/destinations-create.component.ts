import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Route } from '../../models/route';
import { RouteService } from '../../services/route.service';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { Destination } from "../../models/destination";
import { DestinationService } from "../../services/destination.service";
import { MapService} from "../../services/map.service";
import { ResourceTypeService } from "../../services/resource-type.service";
import { ResourceType } from "../../models/resource-type";
import { Resource } from "../../models/resource";
import { ResourceService } from "../../services/resource.service";
import { TransportService } from "../../services/transport.service";
import { Transport } from "../../models/transport";
import { ComputeOrderService } from "../../services/compute-order.service";

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
  resourceTypes: ResourceType[] = [];
  resources: Resource[] = [];
  result: Resource[][] = [];
  transport: Transport;

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
    this.id = this.route.snapshot.params['id'];
    this.route0 = new Route();
    this.transport = new Transport();
    this.transport.idRoute = this.id;

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
        this.getFirstWarehouse();
      }, error => console.log(error));
  }

  getFirstWarehouse() {
    this.warehouseService.getWarehouse(this.route0.id_first_warehouse)
      .subscribe(first => {
        console.log(first);
        this.firstWarehouse = first;
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
    this.submitted = true;
    this.saveByResource();
    this.createTransport();
    console.log(this.destinations);
  }

  createTransport() {
    this.transportService.createTransport(this.transport)
      .subscribe(data => {
        console.log("TRANSPORT");
        console.log(data);
      }, error => console.log(error));
  }

  loadEverything() {
    this.resourceTypeService.getResourceType(this.transport.idResourceType)
      .subscribe(type => {
        console.log(type);
        let totalQuantity = 0;
        this.getResourcesByType(totalQuantity, type);
      }, error => console.log(error));
  }

  getResourcesByType(totalQuantity, type) {
    this.resourceService.getResourcesByIdResourceType(type.id)
      .subscribe(resources => {
        console.log(resources);
        this.resources = resources;
        this.sumResourceTypeTotalQuantity(totalQuantity, resources);
        this.getResourceMatrix(resources);
        this.getWarehousesWithChosenResource();
      }, error => console.log(error));
  }

  sumResourceTypeTotalQuantity(totalQuantity, resources) {
    for(let i = 0; i < resources.length; i++) {
      totalQuantity += resources[i].quantity;
    }
  }

  getWarehousesWithChosenResource() {
    for(let i = 0; i < this.result[0].length; i++) {
      this.warehouseService.getWarehouse(this.result[0][i].idWarehouse)
        .subscribe(warehouse => {
          console.log(warehouse);
          this.count++;
          this.destinations.push({id: this.count, id_route: this.id, id_warehouse: warehouse.id, order: this.count});
        });
    }
  }

  getResourceMatrix(resources) {
    resources.sort((a,b) => b.quantity - a.quantity);

    for(let i = 0; i < resources.length; i++) {
      let sum = 0;
      let localMatrix: Resource[] = [];

      for(let j = i; j < resources.length; j++) {
        localMatrix.push(resources[j]);
        sum += resources[j].quantity;

        if(sum >= this.transport.quantity) {
          this.result[i] = localMatrix;
          break;
        }
      }
    }
  }

  async save() {
    await this.loadWarehouses();
    await this.delay(250);
    await this.computeOrderService.computeDistance(this.wars);
    this.destinations = await this.computeOrderService.computeOrder(this.destinations, this.wars);
    await this.createDestinations();
    this.gotoList();
  }

  async saveByResource() {
    await this.loadEverything();
    await this.delay(250);
    this.save();
  }

  async createDestinations() {
    for(let i = 0; i < this.destinations.length; i++) {
      await this.destinationService.createDestination(this.destinations[i])
        .subscribe(data => {
          console.log(data);
        }, error => console.log(error));
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
