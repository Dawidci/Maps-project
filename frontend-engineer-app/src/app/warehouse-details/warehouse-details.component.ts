import { Component, OnInit } from '@angular/core';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Destination } from "../destination";
import { DestinationService } from "../destination.service";
import { MapService} from "../map.service";
import {Resource} from "../resource";
import {ResourceService} from "../resource.service";
import {ResourceTypeService} from "../resource-type.service";

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {

  id: number;
  warehouse: Warehouse;
  resources: Resource[] = [];
  resourceNames: string[] =[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService,
              private mapsService: MapService,
              private resourceService: ResourceService,
              private resourceTypeService: ResourceTypeService,
              private destinationService: DestinationService) { }

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

        this.resourceService.getResourcesByIdWarehouse(this.id)
          .subscribe(resources => {
            console.log(resources);
            this.resources = resources;

            for(let i = 0; i < this.resources.length; i++) {
              this.resourceTypeService.getResourceType(this.resources[i].idResourceType)
                .subscribe(resourceType => {
                  console.log(resourceType);
                  this.resourceNames[i] = resourceType;
                }, error => console.log(error));
            }

          }, error => console.log(error));

      }, error => console.log(error));
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async loadMap() {
    await this.mapsService.initializeMap();
    await this.mapsService.showWarehouse(this.warehouse);
  }

  list(){
    this.router.navigate(['warehouses/list']);
  }
}
