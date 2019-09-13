import { Observable } from "rxjs";
import { WarehouseService } from "../warehouse.service";
import { Warehouse } from "../warehouse";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;

  constructor(private warehouseService: WarehouseService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.warehouses = this.warehouseService.getWarehousesList();
  }

  deleteWarehouse(id: number) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  /*
  employeeDetails(id: number){
    this.router.navigate(['details', id]);
  }
  */

  /*
  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
  */
}

