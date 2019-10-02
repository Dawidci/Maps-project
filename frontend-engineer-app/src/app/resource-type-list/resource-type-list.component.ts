import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ResourceType } from "../resource-type";
import { ResourceTypeService } from "../resource-type.service";

@Component({
  selector: 'app-resource-type-list',
  templateUrl: './resource-type-list.component.html',
  styleUrls: ['./resource-type-list.component.css']
})
export class ResourceTypeListComponent implements OnInit {

  resourceTypes: Observable<ResourceType[]>;
  map: any;

  constructor(private resourceTypeService: ResourceTypeService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.resourceTypes = this.resourceTypeService.getResourceTypesList();
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

