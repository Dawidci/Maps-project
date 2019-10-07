import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  private baseUrl = 'http://localhost:8080/transports';

  constructor(private http: HttpClient) { }

  getTransport(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getTransportByIdRoute(idRoute: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/route/${idRoute}`);
  }

  createTransport(transport: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, transport);
  }

  updateTransport(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTransport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getTransportsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}
