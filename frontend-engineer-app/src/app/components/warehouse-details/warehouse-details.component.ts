import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { MapService } from "../../services/map.service";
import { Resource } from "../../models/resource";
import { ResourceService } from "../../services/resource.service";
import { ResourceTypeService } from "../../services/resource-type.service";
import { ResourceType } from "../../models/resource-type";

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})

export class WarehouseDetailsComponent implements OnInit {

  id: number = this.route.snapshot.params['id'];
  warehouse: Warehouse;
  resources: Resource [] = [];
  resourceNames: ResourceType [] = [];
  resourceQuantity: number [] = [];
  newResource: Resource = new Resource();
  addResourceType: Resource [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private resourceService: ResourceService,
              private resourceTypeService: ResourceTypeService) { }

  ngOnInit() {
    this.newResource.idWarehouse = this.id;
    this.loadWarehouse();
  }

  loadWarehouse() {
    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        this.warehouse = data;
        this.getResources();
        this.loadMap();
      },error => console.log(error));
  }

  getResources() {
    this.resourceService.getResourcesByIdWarehouse(this.id)
      .subscribe(resources => {
        this.resources = resources;
        this.getResourcesTypeNames();
        this.loadResourceTypes();
      }, error => console.log(error));
  }

  getResourcesTypeNames() {
    for(let i = 0; i < this.resources.length; i++) {
      this.resourceTypeService.getResourceType(this.resources[i].idResourceType)
        .subscribe(resourceType => {
          this.resourceNames[i] = resourceType;
        }, error => console.log(error));
    }
  }

  loadResourceTypes() {
    this.addResourceType.length = 0;
    this.resourceTypeService.getResourceTypesList()
      .subscribe(types => {
        this.getListOfResourceTypesThatCouldBeAdded(types);
      }, error => console.log(error));
  }

  getListOfResourceTypesThatCouldBeAdded(types) {
    for(let i = 0; i < types.length; i++) {
      let push = true;

      for(let j = 0; j < this.resourceNames.length; j++) {
        if(types[i].id == this.resourceNames[j].id) {
          push = false;
          break;
        }
      }

      if(push == true) {
        this.addResourceType.push(types[i]);
      }
    }
  }

  async loadMap() {
    await this.mapsService.initializeMap();
    await this.mapsService.showWarehouse(this.warehouse);
  }

  async deleteResource(id: number, idType: number) {
    this.resourceService.deleteResource(id)
      .subscribe(data => {
          this.deleteResourceFromArray(idType);
          this.ngOnInit();
        },error => console.log(error));
  }

  deleteResourceFromArray(idType: number) {
    for(let i = 0; i < this.resourceNames.length; i++) {
      if(this.resourceNames[i].id == idType) {
        this.resourceNames.splice(i, 1);
      }
    }
  }

  updateResource(id: number, index: number) {
    this.resources[index].quantity = this.resourceQuantity[index];
    this.resourceService.updateResource(id, this.resources[index])
      .subscribe(() => this.resourceQuantity[index] = null, error => console.log(error));
  }

  async addResource() {
    if(this.newResource.quantity > 0) {
      this.resourceService.createResource(this.newResource)
        .subscribe(() => {
          this.newResource = new Resource();
          this.newResource.idWarehouse = this.id;
          this.ngOnInit();
        }, error => console.log(error));
    } else {
      alert("Cannot add less than 1 quantity of resource");
    }

  }

  goToWarehouselist(){
    this.router.navigate(['warehouses']);
  }
}
