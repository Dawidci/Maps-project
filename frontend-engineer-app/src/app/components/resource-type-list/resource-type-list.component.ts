import { Component, OnInit } from "@angular/core";
import { ResourceType } from "../../models/resource-type";
import { ResourceTypeService } from "../../services/resource-type.service";
import { ResourceService } from "../../services/resource.service";
import { TransportService } from "../../services/transport.service";
import { Resource } from "../../models/resource";

@Component({
  selector: 'app-resource-type-list',
  templateUrl: './resource-type-list.component.html',
  styleUrls: ['./resource-type-list.component.css']
})
export class ResourceTypeListComponent implements OnInit {

  resourceTypeQuantity: number[] = [];
  types: ResourceType[] = [];
  newResourceType: ResourceType = new ResourceType();
  newNameOfResourceType: string[] = [];

  constructor(private resourceTypeService: ResourceTypeService,
              private resourceService: ResourceService,
              private transportService: TransportService) {}

  ngOnInit() {
    this.getAllResourceTypes();
  }

  getAllResourceTypes() {
    this.resourceTypeService.getResourceTypesList()
      .subscribe(resourceTypes => {
        this.types = resourceTypes;
        this.getResourcesByType();
      },error => console.log(error));
  }

  getResourcesByType() {
    for(let i = 0; i < this.types.length; i++) {
      this.resourceService.getResourcesByIdResourceType(this.types[i].id)
        .subscribe(resources => {
          this.resourceTypeQuantity[i] = 0;
          this.sumResources(resources, i);
        },error => console.log(error));
    }
  }

  sumResources(resources: Resource[], index: number) {
    for(let j = 0; j < resources.length; j++) {
      this.resourceTypeQuantity[index] += resources[j].quantity;
    }
  }

  deleteResourceType(id: number) {
    this.deleteResourcesByType(id);
    this.deleteTransportByResourceType(id);
    this.deleteTypeOfResource(id);
  }

  deleteResourcesByType(id: number) {
    this.resourceService.getResourcesByIdResourceType(id)
      .subscribe(resources => {
        for(let i = 0; i < resources.length; i++) {
          this.resourceService.deleteResource(resources[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteTransportByResourceType(id: number) {
    this.transportService.getTransportByIdResourceType(id)
      .subscribe(transports => {
        for(let i = 0; i < transports.length; i++) {
          this.transportService.deleteTransport(transports[i].id).subscribe();
        }
      }, error => console.log(error));
  }

  deleteTypeOfResource(id: number) {
    this.resourceTypeService.deleteResourceType(id)
      .subscribe(() => this.ngOnInit(),error => console.log(error));
  }

  addResourceType() {
    this.resourceTypeService.createResourceType(this.newResourceType)
      .subscribe(() => {
        this.newResourceType.name = '';
        this.ngOnInit();
      },error => console.log(error));
  }

  updateResourceType(id: number, index: number) {
    this.types[index].name = this.newNameOfResourceType[index];
    this.resourceTypeService.updateResourceType(id, this.types[index]).subscribe();
    this.newNameOfResourceType.length = 0;
  }
}
