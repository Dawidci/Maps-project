import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private baseUrl = 'http://localhost:8080/warehouses';

  constructor(private http: HttpClient) { }

  getWarehouse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createWarehouse(warehouse: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, warehouse);
  }

  updateWarehouse(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteWarehouse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getWarehousesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}

