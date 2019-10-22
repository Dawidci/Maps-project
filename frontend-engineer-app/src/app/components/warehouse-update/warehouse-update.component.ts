import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { Router, ActivatedRoute } from '@angular/router';
import { MapService } from "../../services/map.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {

  id: number = this.route.snapshot.params['id'];
  warehouse: Warehouse;

  warehouseForm = this.fb.group({
    name: ['', Validators.required],
    latitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9]([.][0-9]+)?$")]],
    longitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^([-]?)(([1-9]?[0-9])|([1][0-7][0-9]))([.][0-9]+)?$")]], //180
    airport: ['', Validators.required],
    seaport: ['', Validators.required]
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private warehouseService: WarehouseService,
              private mapService: MapService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.getWarehouse();
    this.mapService.initializeMap();
    this.mapService.map.on('click', this.onMapClick.bind(this));
  }

  getWarehouse() {
    this.warehouseService.getWarehouse(this.id)
      .subscribe(warehouse => {
        this.warehouse = warehouse;
        this.mapService.showWarehouse(warehouse);
      }, error => console.log(error));
  }

  onMapClick(e) {
    this.mapService.saveWarehouseLocation(e, this.warehouse);
    this.mapService.addWarehouse(this.warehouse);
  }

  onSubmit() {
    this.warehouseService.updateWarehouse(this.id, this.warehouse)
      .subscribe(() => this.gotoList(),error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/warehouses']);
  }
}
