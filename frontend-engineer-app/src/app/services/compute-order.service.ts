import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComputeOrderService {

  distance: number[][] = [];
  totalDistance: number;

  constructor() { }

  computeAllOrder(allDestinations, allWarehouses) {
    let maxTotalDistance = 1e8;
    let indexOfShortestRoute = 0;

    for(let i = 0; i < allDestinations.length; i++) {

      this.computeDistance(allWarehouses[i]);
      this.computeOrder(allDestinations[i]);

      if(this.totalDistance < maxTotalDistance) {
        maxTotalDistance = this.totalDistance;
        indexOfShortestRoute = i;
      }
    }

    return allDestinations[indexOfShortestRoute];
  }

  computeDistance(warehouses) {
    warehouses = Array.from(warehouses);
    console.log("WAREHOUSES INSIDE: ");
    console.log(warehouses);
    for(let i = 0; i < warehouses.length; i++) {
      this.distance[i] = [];
      for (let j = 0; j < warehouses.length; j++) {
        if (i != j) {
          this.distance[i][j] = this.distanceBetweenCoordinates(warehouses[i].latitude,
            warehouses[i].longitude, warehouses[j].latitude, warehouses[j].longitude);
        }
      }
    }

    for(let i = 0; i < this.distance.length; i++) {
      console.log("DISTANCES");
      console.log(this.distance[i]);
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

   computeOrder(destinations) {
    let start = 0;
    this.totalDistance = 0;
    let newStart = 0;

    for(let i = 0; i < this.distance.length; i++) {
      let maxDistance = 1e8;
      destinations[start].order = i + 1;
      this.distance.forEach(distance => delete distance[start]);

      for(let j = 0; j < this.distance.length; j++) {
        console.log("START: " + start + " j: " + j);
        console.log("MAX DISTANCE: " + this.distance[start][j]);
        if(this.distance[start][j] < maxDistance) {
          maxDistance = this.distance[start][j];
          newStart = j;
        }
      }

      if(i == this.distance.length - 1) {
        maxDistance = 0;
      }

      start = newStart;
      this.totalDistance += maxDistance;
    }
    console.log("DESTINATIONS");
    console.log(destinations);
    return destinations;
  }
}
