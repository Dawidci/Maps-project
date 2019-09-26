import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { MapService} from "../map.service";
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
    latitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9]([.][0-9]+)?$")]],
    longitude: [{value: '', disabled: true}, [Validators.required, Validators.pattern("^([-]?)(([1-9]?[0-9])|([1][0-7][0-9]))([.][0-9]+)?$")]], //180
    airport: ['', Validators.required],
    seaport: ['', Validators.required]
  });

  constructor(private warehouseService: WarehouseService,
              private mapService: MapService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.mapService.initializeMap();
    this.mapService.map.on('click', this.onMapClick.bind(this));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
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

  onMapClick(e) {
    this.warehouse.latitude = Math.round(e.latlng.lat * 100) / 100;
    this.warehouse.longitude = Math.round(e.latlng.lng * 100) / 100;
  }
}
