import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public login(email: String, password: string) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
    };
    console.log(`${this.url}auth`)
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/auth`, { email, password }, options).subscribe((data: any) => {
        data;
        resolve(data);
      }, err => {
        reject(err);
      });
    });

  }
  
  public register(user: User) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
    };
    console.log(`${this.url}auth`)
    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/user`, user, options).subscribe((data: any) => {
        data;
        resolve(data);
      }, err => {
        reject(err);
      });
    });

  }
}
