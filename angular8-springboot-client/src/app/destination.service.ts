import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private baseUrl = 'http://localhost:8080/destinations';

  constructor(private http: HttpClient) { }

  getDestination(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getDestinatonsByRoute(id_route: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/route/${id_route}`);
  }

  createDestination(warehouse: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, warehouse);
  }

  updateDestination(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteDestination(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getDestinationsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}

