import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {ResourceType} from "../resource-type";
import {ResourceTypeService} from "../resource-type.service";
import {ResourceTypeListComponent} from "../resource-type-list/resource-type-list.component";

@Component({
  selector: 'app-resource-type-create',
  templateUrl: './resource-type-create.component.html',
  styleUrls: ['./resource-type-create.component.css']
})
export class ResourceTypeCreateComponent implements OnInit {

  resourceType: ResourceType = new ResourceType();
  submitted = false;

  resourceTypeForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private resourceTypeService: ResourceTypeService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.resourceTypeService.createResourceType(this.resourceType)
      .subscribe(data => console.log(data), error => console.log(error));
    this.resourceType = new ResourceType();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/resource-types']);
  }
}
