import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = 'http://localhost:8080/resources';

  constructor(private http: HttpClient) { }

  getResource(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getResourcesByIdWarehouse(id_warehouse: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/warehouse/${id_warehouse}`);
  }

  getResourcesByIdResourceType(id_resource_type: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/resource-type/${id_resource_type}`);
  }

  getResourceByIdWarehouseAndIdResourceType(id_warehouse: number, id_resource_type: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/warehouse/${id_warehouse}/resource-type/${id_resource_type}`);
  }

  createResource(resource: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, resource);
  }

  updateResource(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteResource(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getResourcesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}

