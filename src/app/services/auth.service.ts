import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {
  endpoint: string  = 'http://localhost:8080/authenticate'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };

    return this.http.post<any>(this.endpoint, credentials);
  }
}
