import {Observable} from "rxjs";
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Route} from "../../models/route";
import {RouteService} from "../../services/route.service";
import {WarehouseService} from "../../services/warehouse.service";
import {DestinationService} from "../../services/destination.service";
import {Warehouse} from "../../models/warehouse";
import {Router} from '@angular/router';
import {MapService} from "../../services/map.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteCreateComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  route: Route = new Route();
  submitted = false;
  map: any;

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
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.reloadData();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
  }

  reloadData() {
    this.warehouses = this.mapService.loadWarehouses();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  async save() {
    await this.routeService.createRoute(this.route)
      .subscribe(data => console.log(data), error => console.log(error));

    await this.delay(500);

    this.routeService.getRouteByName(this.route.name)
      .subscribe(data => {
        console.log(data);
        this.route = data;
        this.createDestinations(this.route.id);
      }, error => console.log(error));

    this.route = new Route();
  }

  createDestinations(id: number) {
    this.router.navigate(['destinations/create/route', id]);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}