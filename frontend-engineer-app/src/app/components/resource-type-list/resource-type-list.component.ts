import { Component, OnInit } from "@angular/core";
import { ResourceType } from "../../models/resource-type";
import { ResourceTypeService } from "../../services/resource-type.service";
import { ResourceService } from "../../services/resource.service";
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
              private resourceService: ResourceService) {}

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
    this.resourceTypeQuantity[index] = resources.reduce((prev, current) => prev + current.quantity, 0);
  }

  deleteResourceType(id: number) {
    this.resourceTypeService.deleteResourceType(id)
      .subscribe(() => this.ngOnInit(),error => console.log(error));
  }

  addResourceType() {
    this.resourceTypeService.createResourceType(this.newResourceType)
      .subscribe(() => {
        this.newResourceType = new ResourceType();
        this.ngOnInit();
      },error => console.log(error));
  }

  updateResourceType(id: number, index: number) {
    this.types[index].name = this.newNameOfResourceType[index];
    this.resourceTypeService.updateResourceType(id, this.types[index]).subscribe();
    this.newNameOfResourceType.length = 0;
  }
}
