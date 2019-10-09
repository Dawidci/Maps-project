import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {ResourceType} from "../../models/resource-type";
import {ResourceTypeService} from "../../services/resource-type.service";

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
    this.createResourceType();
    this.resourceType = new ResourceType();
    this.gotoList();
  }

  createResourceType() {
    this.resourceTypeService.createResourceType(this.resourceType)
      .subscribe(data => {
        console.log(data)
      },error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/resource-types']);
  }
}
