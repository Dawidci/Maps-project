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
  count = 1;
  submitted = false;
  enoughResources: boolean = false;
  resourceTypes: ResourceType[] = [];
  resources: Resource[] = [];
  result: Resource[][] = [];
  transport: Transport;
  allDestinations: Destination[][] = [];
  allWarehouses: Warehouse[][] = [];
  destinationToAdd: Destination;
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
    this.id = this.route.snapshot.params['id'];
    this.route0 = new Route();
    this.transport = new Transport();
    this.transport.idRoute = this.id;
    this.destinationToAdd = new Destination();

    this.reloadData();
    this.getResourceTypes();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
    this.loadRoute();
  }

  reloadData() {
    this.warehouses = this.mapService.loadWarehouses();
    this.loadWarehousesToSelect();
  }

  loadWarehousesToSelect() {
    this.warehouseService.getWarehousesList()
      .subscribe(warehouses => {
        this.warehousesToSelect = warehouses;
      });
  }

  getResourceTypes() {
    this.resourceTypeService.getResourceTypesList()
      .subscribe(resourceTypes => {
        this.resourceTypes = resourceTypes;
      }, error => console.log(error));
  }

  loadRoute() {
    this.routeService.getRoute(this.id)
      .subscribe(data => {
        this.route0 = data;
        this.destinations.push({id:1, id_route: this.id, id_warehouse: this.route0.id_first_warehouse, order: 1});
        this.getFirstWarehouse();
      }, error => console.log(error));
  }

  getFirstWarehouse() {
    this.warehouseService.getWarehouse(this.route0.id_first_warehouse)
      .subscribe(first => {
        this.firstWarehouse = first;
        this.wars[0] = this.firstWarehouse;
        this.deleteWarehouseFromSelectList(this.firstWarehouse);
      }, error => console.log(error));
  }

  deleteWarehouseFromSelectList(warehouseToRemove) {
    for(let i = 0; i < this.warehousesToSelect.length; i++) {
      if(this.warehousesToSelect[i].name == warehouseToRemove.name) {
        this.warehousesToSelect.splice(i, 1);
      }
    }
  }



  addDestinationToList() {
    this.count++;
    this.destinations.push({id: this.count, id_route: this.id, id_warehouse: this.destinationToAdd.id_warehouse, order: this.count});
    this.loadWarehouseToWars(this.destinationToAdd.id_warehouse);
    this.destinationToAdd = new Destination();
  }

  loadWarehouseToWars(idWarehouse) {
    this.warehouseService.getWarehouse(idWarehouse)
      .subscribe(warehouse => {
        this.wars.push(warehouse);
        this.deleteWarehouseFromSelectList(warehouse);
      });
  }



  onSubmit() {
    this.submitted = true;
    this.save();
  }

  async save() {
    await this.computeOrderService.computeDistance(this.wars);
    this.destinations = await this.computeOrderService.computeOrder(this.destinations, this.wars);
    await this.createDestinations();
    this.gotoList();
  }

  async createDestinations() {
    for(let i = 0; i < this.destinations.length; i++) {
      this.destinationService.createDestination(this.destinations[i]).subscribe(error => console.log(error));
    }
  }

  gotoList() {
    this.router.navigate(['/routes']);
  }



  async createRouteByResource() {
    await this.loadEverything();
    await this.delay(100);

    if(this.enoughResources == true) {
      this.submitted = true;
      this.saveByResource();
    }
  }

  loadEverything() {
    this.resourceTypeService.getResourceType(this.transport.idResourceType)
      .subscribe(type => {
        this.getResourcesByType(type);
      },error => console.log(error));
  }

  getResourcesByType(type) {
    this.resourceService.getResourcesByIdResourceType(type.id)
      .subscribe(resources => {
        this.resources = resources;
        this.deleteResourceBeingInFirstWarehouse(this.firstWarehouse);
        this.sumResourceTypeTotalQuantity(resources);

        if(this.enoughResources == true) {
          this.getResourceMatrix(resources);
          this.getAllResourceWarehouses();
        }
      }, error => console.log(error));
  }

  deleteResourceBeingInFirstWarehouse(firstWarehouse) {
    for(let i = 0; i < this.resources.length; i++) {
      if(this.resources[i].idWarehouse == firstWarehouse.id) {
        this.resources.splice(i, 1);
      }
    }
  }

  sumResourceTypeTotalQuantity(resources) {
    let totalQuantity = 0;

    for(let i = 0; i < resources.length; i++) {
      totalQuantity += resources[i].quantity;
    }

    if(totalQuantity >= this.transport.quantity) {
      this.enoughResources = true;
    } else {
      alert("Not enough resources\n" +
        "You need: " + this.transport.quantity + "\n" +
        "Total quantity: " + totalQuantity);
    }
  }

  getResourceMatrix(resources) {
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
        localMatrix.push(this.resources[i]);
        sum += this.resources[i].quantity;

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

  getAllResourceWarehouses() {
    for(let i = 0; i < this.result.length; i++) {
      this.allDestinations[i] = [];
      this.allDestinations[i].push({id:1, id_route: this.id, id_warehouse: this.route0.id_first_warehouse, order: 1});

      for(let j = 0; j < this.result[i].length; j++) {
        let count = j + 2;
        this.warehouseService.getWarehouse(this.result[i][j].idWarehouse)
          .subscribe(warehouse => {
            this.allDestinations[i].push({id: count, id_route: this.id, id_warehouse: warehouse.id, order: count});
          });
      }
    }
  }

  async saveByResource() {
    this.createTransport();
    await this.delay(250);
    await this.loadAllWarehouses();
    await this.delay(100);
    this.destinations = await this.computeOrderService.computeAllOrder(this.allDestinations, this.allWarehouses);
    await this.createDestinations();
    this.gotoList();
  }

  createTransport() {
    this.transportService.createTransport(this.transport).subscribe(error => console.log(error));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadAllWarehouses() {
    for(let i = 0; i < this.allDestinations.length; i++) {
      this.allWarehouses[i] = [];

      for(let j = 0; j < this.allDestinations[i].length; j++) {
        this.warehouseService.getWarehouse(this.allDestinations[i][j].id_warehouse)
          .subscribe(warehouse => {
            this.allWarehouses[i].push(warehouse);
          });
      }
    }
  }
}
