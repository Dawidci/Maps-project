import {Observable} from "rxjs";
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Route} from "../../models/route";
import {RouteService} from "../../services/route.service";
import {WarehouseService} from "../../services/warehouse.service";
import {DestinationService} from "../../services/destination.service";
import {Warehouse} from "../../models/warehouse";
import {Router} from '@angular/router';
import {MapService} from "../../services/map.service";
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteCreateComponent implements OnInit {

  warehouses: Observable<Warehouse[]> = this.mapService.loadWarehouses();
  route: Route = new Route();

  routeForm = this.fb.group({
    name: ['', Validators.required],
    id_first_warehouse: ['', Validators.required],
    destination: ['']
  });

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private mapService: MapService,
              private router: Router,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
  }

  onSubmit() {
    this.createNewRoute();
  }

  createNewRoute() {
    this.routeService.createRoute(this.route)
      .subscribe(() => this.getRouteByName(),error => console.log(error));
  }

  getRouteByName() {
    this.routeService.getRouteByName(this.route.name)
      .subscribe(route => this.createDestinations(route.id),error => console.log(error));
  }

  createDestinations(id: number) {
    this.router.navigate(['destinations/create/route', id]);
  }
}
