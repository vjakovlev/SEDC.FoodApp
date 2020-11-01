import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  serverURL = environment.apiServer

  constructor(private http: HttpClient) { }

  getRestaurants() {
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurants`;
    return this.http.get(url);
  }

  getRestaurantMenu(id: string) {
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurantMenuItems?id=${id}`;
    return this.http.get(url);
  }
}
