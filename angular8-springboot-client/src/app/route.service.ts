import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private baseUrl = 'http://localhost:8080/routes';

  constructor(private http: HttpClient) { }

  getRoute(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createRoute(warehouse: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, warehouse);
  }

  updateRoute(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteRoute(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRoutesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
