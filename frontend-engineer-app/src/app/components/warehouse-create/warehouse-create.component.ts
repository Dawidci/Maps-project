import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../../models/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
import { MapService} from "../../services/map.service";
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  warehouse: Warehouse = new Warehouse();

  warehouseForm = this.fb.group({
    name: ['', Validators.required],
    latitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9]([.][0-9]+)?$")]],
    longitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^([-]?)(([1-9]?[0-9])|([1][0-7][0-9]))([.][0-9]+)?$")]] //180
  });

  constructor(private warehouseService: WarehouseService,
              private mapService: MapService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.mapService.initializeMap();
    this.mapService.map.on('click', this.onMapClick.bind(this));
  }

  onSubmit() {
    this.warehouseService.createWarehouse(this.warehouse)
      .subscribe(() => this.gotoList(), error => console.log(error));
  }

  gotoList() {
    this.router.navigate(['/warehouses']);
  }

  onMapClick(e) {
    this.mapService.saveWarehouseLocation(e, this.warehouse);
    this.mapService.addWarehouse(this.warehouse);
  }
}
