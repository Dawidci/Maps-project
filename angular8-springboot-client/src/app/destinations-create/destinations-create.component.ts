import { Component, OnInit } from '@angular/core';
import { Route } from '../route';
import { RouteService } from '../route.service';
import { RouteListComponent } from '../route-list/route-list.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Warehouse } from "../warehouse";
import { WarehouseService } from "../warehouse.service";

import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-destinations-create',
  templateUrl: './destinations-create.component.html',
  styleUrls: ['./destinations-create.component.css']
})
export class DestinationsCreateComponent implements OnInit {

  id: number;
  route0: Route;
  firstWarehouse: Warehouse;
  firstLatitude: number;
  firstLongitude: number;
  lastWarehouse: Warehouse;
  id_first: number;
  id_last: number;
  name: string;
  map: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private routeService: RouteService,
              private warehouseService: WarehouseService) { }

  ngOnInit() {
    this.route0 = new Route();

    this.id = this.route.snapshot.params['id'];

    this.routeService.getRoute(this.id)
      .subscribe(data => {
        console.log(data);
        this.route0 = data;
        this.id_first = this.route0.id_first_warehouse;
        this.id_last = this.route0.id_last_warehouse;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['routes/list']);
  }
}
