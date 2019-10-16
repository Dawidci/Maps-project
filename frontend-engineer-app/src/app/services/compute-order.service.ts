import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputeOrderService {

  distance: number[][] = [];
  allDistances: number[] = [];
  totalDistance: number;

  constructor() { }

  computeAllOrder(allDestinations, allWarehouses) {
    let maxTotalDistance = 100000000;
    let indexOfShortestRoute = 0;

    for(let i = 0; i < allDestinations.length; i++) {

      this.computeDistance(allWarehouses[i]);
      this.computeOrder(allDestinations[i], allWarehouses[i]);

      console.log("Destinations: ");
      console.log(allDestinations[i]);
      console.log("Distance" + this.totalDistance);

      if(this.totalDistance < maxTotalDistance) {
        maxTotalDistance = this.totalDistance;
        indexOfShortestRoute = i;
      }
    }

    console.log("Shortest distance: " + maxTotalDistance);
    console.log("Shortest index: " + indexOfShortestRoute)
    return allDestinations[indexOfShortestRoute];
  }

  computeDistance(warehouses) {
    warehouses = Array.from(warehouses);
    console.log(warehouses.length);
    for(let i = 0; i < warehouses.length; i++) {
      this.distance[i] = [];
      for (let j = 0; j < warehouses.length; j++) {
        if (i != j) {
          this.distance[i][j] = this.distanceBetweenCoordinates(warehouses[i].latitude,
            warehouses[i].longitude, warehouses[j].latitude, warehouses[j].longitude);
        }
      }
    }
  }

  distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
    let earthRadiusKm = 6371;

    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadiusKm * c;
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

   computeOrder(destinations, warehouses) {
    let start = 0;
    let newStart = 0;
    let count = 1;
    this.totalDistance = 0;

    for(let i = 0; i < warehouses.length; i++) {
      let dist = 10000000;
      console.log("START: " + start + ", WAR: " + warehouses[start].id);
      destinations[start].order = count;

      for(let j = 0; j < warehouses.length; j++) {
        delete this.distance[j][start];
      }

      for(let j = 0; j < warehouses.length; j++) {
        if(this.distance[start][j] < dist) {
          dist = this.distance[start][j];
          newStart = j;
        }
      }

      if(i == warehouses.length - 1) {
        dist = 0;
      }

      this.totalDistance += dist;

      start = newStart;
      count++;
    }
     return destinations;
  }
}
