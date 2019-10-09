import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import {ResourceType} from "../../models/resource-type";
import {ResourceTypeService} from "../../services/resource-type.service";

@Component({
  selector: 'app-resource-type-update',
  templateUrl: './resource-type-update.component.html',
  styleUrls: ['./resource-type-update.component.css']
})
export class ResourceTypeUpdateComponent implements OnInit {

  id: number;
  resourceType: ResourceType = new ResourceType();
  submitted = false;

  resourceTypeForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private resourceTypeService: ResourceTypeService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.updateResourceType();
    this.resourceType = new ResourceType();
    this.gotoList();
  }

  updateResourceType() {
    this.resourceTypeService.updateResourceType(this.id, this.resourceType)
      .subscribe(data => {
        console.log(data)
      }, error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/resource-types']);
  }
}
