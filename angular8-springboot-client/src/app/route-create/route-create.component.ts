import {Observable} from "rxjs";
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Route} from "../route";
import {RouteService} from "../route.service";
import {WarehouseService} from "../warehouse.service";
import {DestinationService} from "../destination.service";
import {Warehouse} from "../warehouse";
import {Router} from '@angular/router';
import { MapService} from "../map.service";
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
    id_last_warehouse: ['', Validators.required],
    destination: ['']
  }, {validator: this.checkWarehouses });

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private mapService: MapService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.mapService.loadWarehouses();
    this.reloadData();
    this.mapService.initializeMap();
    this.mapService.showWarehouses();
  }

  reloadData() {
    this.warehouses = this.mapService.warehouses;
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

  checkWarehouses(group: FormGroup) {
    let id_first_warehouse = group.get('id_first_warehouse').value;
    let id_last_warehouse = group.get('id_last_warehouse').value;

    return id_first_warehouse !== id_last_warehouse ? null : { notSame: true }
  }
}
