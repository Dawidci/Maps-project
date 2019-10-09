import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { RouteService } from "../../services/route.service";
import { WarehouseService } from "../../services/warehouse.service";
import { Route } from "../../models/route";
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {

  routes: Route[] = [];
  warehouseNames: string[] = [];

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.loadRoutes();
  }

  loadRoutes() {
    this.routeService.getRoutesList()
      .subscribe(data => {
        console.log(data);
        this.routes = data;
        this.loadWarehouseNames();
      }, error => console.log(error));
  }

  loadWarehouseNames() {
    for(let i = 0; i < this.routes.length; i++) {
      this.warehouseService.getWarehouse(this.routes[i].id_first_warehouse)
        .subscribe(warehouse => {
          this.warehouseNames[i] = warehouse.name;
        }, error => console.log(error));
    }
  }

  deleteRoute(id: number) {
    this.routeService.deleteRoute(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },error => console.log(error));
  }

  routeDetails(id: number){
    this.router.navigate(['/routes/details', id]);
  }
}
