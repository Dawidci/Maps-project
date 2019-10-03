import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { MapService } from "../map.service";
import { Resource } from "../resource";
import { ResourceService } from "../resource.service";
import { ResourceTypeService } from "../resource-type.service";

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})

export class WarehouseDetailsComponent implements OnInit {

  id: number;
  warehouse: Warehouse;
  resources: Resource [] = [];
  resourceNames: string [] = [];
  resourceQuantity: number [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private resourceService: ResourceService,
              private resourceTypeService: ResourceTypeService) { }

  async ngOnInit() {
    this.warehouse = new Warehouse();
    this.id = this.route.snapshot.params['id'];

    await this.loadWarehouse();
    await this.delay(250);
    this.loadMap();
  }

  loadWarehouse() {
    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        console.log(data);
        this.warehouse = data;
        this.getResources();
      }, error => console.log(error));
  }

  getResources() {
    this.resourceService.getResourcesByIdWarehouse(this.id)
      .subscribe(resources => {
        console.log(resources);
        this.resources = resources;
        this.getResourcesTypeNames();
      }, error => console.log(error));
  }

  getResourcesTypeNames() {
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

  deleteResource(id: number) {
    this.resourceService.deleteResource(id)
      .subscribe(data => {
          console.log(data);
          this.loadWarehouse();
        },error => console.log(error));
  }

  updateResource(id: number, index: number) {
    this.resources[index].quantity = this.resourceQuantity[index];
    this.resourceService.updateResource(id, this.resources[index])
      .subscribe(newResource => {
        console.log(newResource);
      }, error => console.log(error));
  }

  goToWarehouselist(){
    this.router.navigate(['warehouses']);
  }
}
