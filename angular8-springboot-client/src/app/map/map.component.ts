import { Observable, of } from "rxjs";
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Warehouse } from '../warehouse';
import {WarehouseService} from "../warehouse.service";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  map: any;

  constructor(private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.map = L.map('map').setView([30, 0], 2);

    this.warehouses = this.warehouseService.getWarehousesList();

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

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
