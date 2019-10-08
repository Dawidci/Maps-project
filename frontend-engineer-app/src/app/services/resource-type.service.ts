import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceTypeService {

  private baseUrl = 'http://localhost:8080/resource_types';

  constructor(private http: HttpClient) { }

  getResourceType(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createResourceType(warehouse: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, warehouse);
  }

  updateResourceType(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteResourceType(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getResourceTypesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
