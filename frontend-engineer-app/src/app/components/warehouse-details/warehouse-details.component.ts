import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { MapService } from "../../services/map.service";
import { Resource } from "../../models/resource";
import { ResourceService } from "../../services/resource.service";
import { ResourceTypeService } from "../../services/resource-type.service";

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})

export class WarehouseDetailsComponent implements OnInit {

  id: number;
  warehouse: Warehouse;
  resources: Resource [] = [];
  resourceNames: Resource [] = [];
  resourceQuantity: number [] = [];
  newResource: Resource;
  addResourceType: Resource [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private resourceService: ResourceService,
              private resourceTypeService: ResourceTypeService) { }

  async ngOnInit() {
    await this.delay(100);

    this.warehouse = new Warehouse();
    this.newResource = new Resource();
    this.id = this.route.snapshot.params['id'];
    this.newResource.idWarehouse = this.id;

    await this.loadWarehouse();
    await this.delay(250);
    await this.loadResourceTypes();
    this.loadMap();
  }

  loadResourceTypes() {
    this.addResourceType.length = 0;
    this.resourceTypeService.getResourceTypesList()
      .subscribe(types => {

        for(let i = 0; i < types.length; i++) {

          let push = true;

          for(let j = 0; j < this.resourceNames.length; j++) {
            if(types[i].id == this.resourceNames[j].id) {
              push = false;
              break;
            }
          }

          if(push == true) {
            console.log(types[i]);
            this.addResourceType.push(types[i]);
          }

        }
      });
  }

  loadWarehouse() {
    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        console.log("LOAD");
        this.warehouse = data;
        this.getResources();
      }, error => console.log(error));
  }

  getResources() {
    this.resourceService.getResourcesByIdWarehouse(this.id)
      .subscribe(resources => {
        this.resources = resources;
        this.getResourcesTypeNames();
      }, error => console.log(error));
  }

  async getResourcesTypeNames() {
    for(let i = 0; i < this.resources.length; i++) {
      this.resourceTypeService.getResourceType(this.resources[i].idResourceType)
        .subscribe(resourceType => {
          console.log(resourceType);
          this.resourceNames[i] = resourceType;
        }, error => console.log(error));
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async loadMap() {
    await this.mapsService.initializeMap();
    await this.mapsService.showWarehouse(this.warehouse);
  }

  async deleteResource(id: number) {
    await this.delay(100);

    this.resourceService.deleteResource(id)
      .subscribe(data => {
          console.log(data);
          //this.loadWarehouse();
          this.ngOnInit();
        },error => console.log(error));
  }

  updateResource(id: number, index: number) {
    this.resources[index].quantity = this.resourceQuantity[index];
    this.resourceService.updateResource(id, this.resources[index])
      .subscribe(newResource => {
        console.log(newResource);
      }, error => console.log(error));
  }

  addResource() {
    console.log(this.newResource);

    this.resourceService.createResource(this.newResource)
      .subscribe(newResource => {
        console.log(newResource);
      }, error => console.log(error));

    this.ngOnInit();
  }

  goToWarehouselist(){
    this.router.navigate(['warehouses']);
  }
}
