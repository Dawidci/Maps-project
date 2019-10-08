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

  id: number;
  warehouse: Warehouse;
  submitted = false;

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

  async ngOnInit() {
    this.warehouse = new Warehouse();
    this.id = this.route.snapshot.params['id'];
    this.getWarehouse();
    this.mapService.initializeMap();
    this.mapService.map.on('click', this.onMapClick.bind(this));
  }

  getWarehouse() {
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

  onMapClick(e) {
    this.warehouse.latitude = Math.round(e.latlng.lat * 100) / 100;
    this.warehouse.longitude = Math.round(e.latlng.lng * 100) / 100;
  }
}
