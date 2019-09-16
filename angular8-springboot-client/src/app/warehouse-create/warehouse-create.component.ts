import { WarehouseService } from '../warehouse.service';
import { Warehouse } from '../warehouse';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  warehouse: Warehouse = new Warehouse();
  submitted = false;

  constructor(private warehouseService: WarehouseService,
              private router: Router) {
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
    alert('New warehouse is probably added (or not)');
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

  get diagnostic() { return JSON.stringify(this.warehouse); }
}
