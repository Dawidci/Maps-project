import { Component, OnInit } from '@angular/core';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-warehouse-create',
  templateUrl: './warehouse-create.component.html',
  styleUrls: ['./warehouse-create.component.css']
})
export class WarehouseCreateComponent implements OnInit {

  warehouse: Warehouse = new Warehouse();
  submitted = false;
  map: any;
  string: string;
  latitude: number;
  longitude: number;

  warehouseForm = this.fb.group({
    name: ['', Validators.required],
    latitude: ['', [Validators.required, Validators.pattern("^[-]?[1-8]?[0-9]([.][0-9]+)?$")]],
    longitude: ['', [Validators.required, Validators.pattern("^([-]?)(([1-9]?[0-9])|([1][0-7][0-9]))([.][0-9]+)?$")]], //180
    airport: ['', Validators.required],
    seaport: ['', Validators.required]
  });

  constructor(private warehouseService: WarehouseService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.latitude = 0;
    this.initializeMap();
    this.map.on('click', this.onMapClick);
  }

  initializeMap() {
    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
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

  onMapClick(e) {
    //alert("You clicked the map at " + e.latlng);
    this.string = e.latlng.toString();
    this.string = this.string.replace("LatLng(", "");
    this.string = this.string.replace(")", "");
    this.latitude = parseFloat(this.string.replace(/[,]\s\d*[.]\d*/g, ""));
    this.longitude = parseFloat(this.string.replace(/\d*[.]\d*[,]\s/g, ""));
    alert("Latitude: " + this.latitude + "\n" +
          "Longitude: " + this.longitude);

/*
    this.popup
      .setLatLng(51.4, 1.02)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(this.map);
 */
  }
}
