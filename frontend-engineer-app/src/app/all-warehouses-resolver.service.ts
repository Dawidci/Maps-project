import { Injectable } from '@angular/core';
import { WarehouseService } from "./services/warehouse.service";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AllWarehousesResolverService implements Resolve<any>{

  constructor(private warehouseService: WarehouseService) { }

  resolve() {
    return this.warehouseService.getWarehousesList();
  }
}
