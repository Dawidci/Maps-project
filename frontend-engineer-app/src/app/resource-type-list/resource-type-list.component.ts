import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ResourceType } from "../resource-type";
import { ResourceTypeService } from "../resource-type.service";
import {ResourceService} from "../resource.service";

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
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
   this.resourceTypes = this.resourceTypeService.getResourceTypesList();

    this.resourceTypeService.getResourceTypesList()
      .subscribe(resourceTypes => {
        console.log(resourceTypes);
        this.types = resourceTypes;

        for(let i = 0; i < this.types.length; i++) {
          this.resourceService.getResourcesByIdResourceType(this.types[i].id)
            .subscribe(resources => {
              console.log(resources);
              this.resourceTypeQuantity[i] = 0;

              for(let j = 0; j < resources.length; j++) {
                this.resourceTypeQuantity[i] += resources[j].quantity;
              }
            }, error => console.log(error));
        }

      }, error => console.log(error));
  }

  deleteResourceType(id: number) {
    this.resourceTypeService.deleteResourceType(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },error => console.log(error));
  }

  updateResourceType(id: number) {
    this.router.navigate(['resource-types/update', id]);
  }
}

