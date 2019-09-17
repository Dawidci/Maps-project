import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {

  id: number;
  warehouse: Warehouse;
  submitted = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.warehouse = new Warehouse();
    this.id = this.route.snapshot.params['id'];

    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        console.log(data)
        this.warehouse = data;
      }, error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  save() {
    this.warehouseService.updateWarehouse(this.id, this.warehouse)
      .subscribe(data => console.log(data), error => console.log(error));
    this.warehouse = new Warehouse();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/warehouses']);
  }
}
