import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: any;

  constructor() { }

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
  }
}
