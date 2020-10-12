import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { MenuItemRequestModel, RestaurantRequestModel } from '../models/request-models/restoran-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  serverURL = environment.apiServer

  get url() {
    return this.config.getUrl()
  }

  constructor(private http: HttpClient,
              private config: ConfigService) {}

  getAllRestoraunts() {
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurants`;
    return this.http.get(url);
  }

  getRestaurantById(id: string) {
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurants?id=${id}`;
    return this.http.get(url);
  }

  addRestoraunt(request: RestaurantRequestModel): Observable<any> {
    let url = `${this.serverURL}/api/AdminPanel/AddRestaurant`;
    return this.http.post<RestaurantRequestModel>(url, request);
  }

  addMenuItem(request:MenuItemRequestModel) {
    let url = `${this.serverURL}/api/AdminPanel/updateRestoraunt`;
    return this.http.post<MenuItemRequestModel>(url, request);
  }

}
