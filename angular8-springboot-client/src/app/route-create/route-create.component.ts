import { Observable } from "rxjs";
import { Component, OnInit } from '@angular/core';
import { Route } from "../route";
import { RouteService } from "../route.service";
import { WarehouseService } from "../warehouse.service";
import { DestinationService } from "../destination.service";
import { Warehouse } from "../warehouse";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-route-create',
  templateUrl: './route-create.component.html',
  styleUrls: ['./route-create.component.css']
})
export class RouteCreateComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;
  route: Route = new Route();
  submitted = false;

  routeForm = this.fb.group({
    name: ['', Validators.required],
    id_first_warehouse: ['', Validators.required],
    id_last_warehouse: ['', Validators.required]
  }, {validator: this.checkWarehouses });

  constructor(private routeService: RouteService,
              private warehouseService: WarehouseService,
              private destinationService: DestinationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.reloadData()
  }

  reloadData() {
    this.warehouses = this.warehouseService.getWarehousesList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
    alert('New route and destinations added');
  }

  save() {
    this.routeService.createRoute(this.route)
      .subscribe(data => console.log(data), error => console.log(error));
    this.route = new Route();
    this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/warehouses']);
  }

  checkWarehouses(group: FormGroup) { // here we have the 'passwords' group
    let id_first_warehouse = group.get('id_first_warehouse').value;
    let id_last_warehouse = group.get('id_last_warehouse').value;

    return id_first_warehouse !== id_last_warehouse ? null : { notSame: true }
  }

  print() {
    alert("You clicked button!");
  }

}
