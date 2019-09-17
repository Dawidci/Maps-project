import { Observable } from "rxjs";
import { WarehouseService } from "../warehouse.service";
import { Warehouse } from "../warehouse";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  map: any;

  constructor(private warehouseService: WarehouseService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();

    this.map = L.map('map').setView([30, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.warehouses.subscribe(elements => {
      elements.forEach((warehouse : any) => {
        console.log(warehouse.name);
        let marker = new L.Marker([warehouse.latitude, warehouse.longitude]).addTo(this.map);
        marker.bindPopup("ID: " + warehouse.id.toString() + "<br>" +
          "Name: " + warehouse.name + "<br>" +
          "Latitude: " + warehouse.latitude.toString() + "<br>" +
          "Longitude: " + warehouse.longitude.toString() + "<br>" +
          "Seaport: " + warehouse.airport.toString() + "<br>" +
          "Airport: " + warehouse.seaport.toString() + "<br>");
      })
    });
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


  updateWarehouse(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

}

