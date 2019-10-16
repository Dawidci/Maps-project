import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ResourceType } from "../../models/resource-type";
import { ResourceTypeService } from "../../services/resource-type.service";
import {ResourceService} from "../../services/resource.service";
import {TransportService} from "../../services/transport.service";

@Component({
  selector: 'app-resource-type-list',
  templateUrl: './resource-type-list.component.html',
  styleUrls: ['./resource-type-list.component.css']
})
export class ResourceTypeListComponent implements OnInit {

  resourceTypes: Observable<ResourceType[]>;
  resourceTypeQuantity: number[] = [];
  types: ResourceType[] = [];

  constructor(private resourceTypeService: ResourceTypeService,
              private resourceService: ResourceService,
              private transportService: TransportService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
   this.resourceTypes = this.resourceTypeService.getResourceTypesList();
   this.getAllResourceTypes();
  }

  getAllResourceTypes() {
    this.resourceTypeService.getResourceTypesList()
      .subscribe(resourceTypes => {
        console.log(resourceTypes);
        this.types = resourceTypes;
        this.getResourcesByType();
      }, error => console.log(error));
  }

  getResourcesByType() {
    for(let i = 0; i < this.types.length; i++) {
      this.resourceService.getResourcesByIdResourceType(this.types[i].id)
        .subscribe(resources => {
          console.log(resources);
          this.resourceTypeQuantity[i] = 0;
          this.sumResources(resources, i);
        }, error => console.log(error));
    }
  }

  sumResources(resources, i) {
    for(let j = 0; j < resources.length; j++) {
      this.resourceTypeQuantity[i] += resources[j].quantity;
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  deleteResourceType(id: number) {
    this.deleteResourcesByType(id);
    this.deleteTransportByResourceType(id);
    this.deleteTypeOfResource(id);
  }

  deleteResourcesByType(id) {
    this.resourceService.getResourcesByIdResourceType(id)
      .subscribe(resources => {
        for(let i = 0; i < resources.length; i++) {
          this.resourceService.deleteResource(resources[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteTransportByResourceType(id) {
    this.transportService.getTransportByIdResourceType(id)
      .subscribe(transports => {
        for(let i = 0; i < transports.length; i++) {
          this.transportService.deleteTransport(transports[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteTypeOfResource(id) {
    this.resourceTypeService.deleteResourceType(id)
      .subscribe(data => {
        console.log(data);
        this.reloadData();
      },error => console.log(error));
  }

  updateResourceType(id: number) {
    this.router.navigate(['resource-types/update', id]);
  }
}
