// src/app/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/appointment';  

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<any[]> {
    
    const authToken = sessionStorage.getItem('authToken'); 
    console.log('Retrieved authToken:', authToken);  

    let headers = new HttpHeaders();

    if (authToken) {
      console.log(authToken);
      headers = headers.set('Authorization', `Bearer ${authToken}`);  
    }

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getAppointmentById(id: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');  
    console.log('Retrieved authToken for AppointmentById:', authToken);  

    let headers = new HttpHeaders();

    if (authToken) {
      console.log(authToken);
      headers = headers.set('Authorization', `Bearer ${authToken}`);  
    }

    const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url, { headers });
  }

  updateAppointment(id: number, updatedAppointment: any): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    let headers = new HttpHeaders();
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, updatedAppointment, { headers });
  }

  deleteAppointment(id: number): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    let headers = new HttpHeaders();
  
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
  
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url, { headers });
  }

  addAppointment(appointment: any): Observable<any> {
    const authToken = sessionStorage.getItem('authToken');
    let headers = new HttpHeaders();
  
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
  
    return this.http.post<any>(this.apiUrl, appointment, { headers }); 
  }
  
  
}
