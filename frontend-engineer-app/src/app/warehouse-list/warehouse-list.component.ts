import { Observable } from "rxjs";
import { WarehouseService } from "../warehouse.service";
import { MapService } from "../map.service";
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
  map: any;

  constructor(private warehouseService: WarehouseService,
              private mapService: MapService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
  }

  reloadData() {
    this.warehouses = this.mapService.loadWarehouses();
  }

  deleteWarehouse(id: number) {
    this.warehouseService.deleteWarehouse(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },error => console.log(error));
  }

  updateWarehouse(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

  warehouseDetails(id: number) {
    this.router.navigate(['warehouses/details', id]);
  }
}

