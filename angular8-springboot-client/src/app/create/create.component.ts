import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  warehouseForm = this.fb.group({
    name: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    airport: ['', Validators.required],
    seaport: ['', Validators.required]
  });

  warehouse: Warehouse = new Warehouse();
  submitted = false;

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  newWarehouse(): void {
    this.submitted = false;
    this.warehouse = new Warehouse();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    alert('New warehouse added');
  }

  save() {
    this.warehouseService.createWarehouse(this.warehouse)
      .subscribe(data => console.log(data), error => console.log(error));
    this.warehouse = new Warehouse();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/warehouses']);
  }
}