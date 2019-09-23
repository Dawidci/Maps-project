import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { RouteService } from "../route.service";
import { Route } from "../route";
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  routes: Observable<Route[]>;
  map: any;

  constructor(private routeService: RouteService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.routes = this.routeService.getRoutesList();
  }

  deleteRoute(id: number) {
    this.routeService.deleteRoute(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  routeDetails(id: number){
    this.router.navigate(['/routes/details', id]);
  }


/*
  updateRoute(id: number) {
    this.router.navigate(['warehouses/update', id]);
  }

 */

}

