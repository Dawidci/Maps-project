import { Injectable } from '@angular/core';
import {Warehouse} from "../models/warehouse";
import { Observable } from "rxjs";
import {WarehouseService} from "./warehouse.service";

import * as L from 'leaflet';
import "leaflet-routing-machine";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  warehouses: Observable<Warehouse[]>;
  leafletRoute: any;
  map: any;

  constructor(private warehouseService: WarehouseService) { }

  loadWarehouses() {
    return this.warehouses = this.warehouseService.getWarehousesList();
  }

  initializeMap() {
    this.map = L.map('map', {minZoom: 2}).setView([45, 60], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.map.bounds = [],
      this.map.setMaxBounds([
        [-90, -180],
        [90, 180]
      ]);
    console.log("LOAD MAP - INITIALIZE MAP");
  }

  showWarehouses() {
    this.warehouses.subscribe(elements => {
      elements.forEach((warehouse : any) => {
        console.log(warehouse.name);
        this.showWarehouse(warehouse);
      })
    });
  }

  showWarehouse(warehouse) {
    let marker = new L.Marker([warehouse.latitude, warehouse.longitude]).addTo(this.map);
    marker.bindPopup("ID: " + warehouse.id.toString() + "<br>" +
      "Name: " + warehouse.name + "<br>" +
      "Latitude: " + warehouse.latitude.toString() + "<br>" +
      "Longitude: " + warehouse.longitude.toString() + "<br>" +
      "Seaport: " + warehouse.airport.toString() + "<br>" +
      "Airport: " + warehouse.seaport.toString() + "<br>");
  }

  showRoute(latlngArray) {
    this.leafletRoute = L.Routing.control({
      waypoints: latlngArray,
      show: false
    }).addTo(this.map);
    console.log("LOAD MAP - SHOW ROUTE");
  }

  loadCoordinatesArray(warehouses, latlngArray) {
    for (let i = 0; i < warehouses.length; i++) {
      let ltln = L.latLng(warehouses[i].latitude, warehouses[i].longitude);
      latlngArray.push(ltln);
    }
    console.log("LOAD MAP - LOAD COORDINATES");
  }
}
