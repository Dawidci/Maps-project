import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  popup = L.popup();
  map: any;
  marker: any;
  circle: any;
  latitude: number;
  longitude: number;

  constructor() { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13);
    this.marker = L.marker([51.5, -0.09]).addTo(this.map);
    this.marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    this.map.on('click', this.onMapClick);

    this.popup.bindPopup("Hey");

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  onMapClick(e) {
    this.popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(this.map);
  }
}
