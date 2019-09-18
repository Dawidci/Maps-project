import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  warehouse: Warehouse = new Warehouse();
  submitted = false;

  warehouseForm = this.fb.group({
    name: ['', Validators.required],
    latitude: ['', [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9][.]?[0-9]*$")]],
    longitude: ['', [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9][.]?[0-9]*$")]],
    airport: ['', Validators.required],
    seaport: ['', Validators.required]
  });

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
