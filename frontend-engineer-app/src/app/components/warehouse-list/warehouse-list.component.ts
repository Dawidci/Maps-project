import { WarehouseService } from "../../services/warehouse.service";
import { MapService } from "../../services/map.service";
import { Warehouse } from "../../models/warehouse";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: Warehouse[] = [];

  constructor(private route: ActivatedRoute,
              private warehouseService: WarehouseService,
              private mapService: MapService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
    this.mapService.initializeMap();
  }

  reloadData() {
    this.warehouseService.getWarehousesList()
      .subscribe(warehouses => {
        this.warehouses = warehouses;
        this.mapService.showWarehousesWithParameters(warehouses);
      }, error => console.log(error));
  }

  deleteWarehouse(id: number) {
    this.warehouseService.deleteWarehouse(id).subscribe(() => this.reloadData(),error => console.log(error));
  }

  updateWarehouse(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

  warehouseDetails(id: number) {
    this.router.navigate(['warehouses/details', id]);
  }
}
