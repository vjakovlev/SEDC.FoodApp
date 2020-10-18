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

  getAllRestoraunts(item) {
    item.municipality = item.municipality === "" ? "" : parseInt(item.municipality)
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurants?name=${item.name}&&address=${item.address}&&municipality=${item.municipality}`;
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

  deleteRestaurant(id) {
    let url = `${this.serverURL}/api/AdminPanel/DeleteRestaurant?id=${id}`;
    return this.http.delete(url);
  }

  updateRestaurant(restaurant) {
    let url = `${this.serverURL}/api/AdminPanel/UpdateRestaurant`;
    return this.http.post(url, restaurant);
  }

  updateRestaurantMenu(restaurant) {
    let url = `${this.serverURL}/api/AdminPanel/UpdateRestaurantMenu`;
    return this.http.post(url, restaurant);
  }

  getRestaurantMenu(id) {
    let url = `${this.serverURL}/api/AdminPanel/GetRestaurantMenuItems?id=${id}`;
    return this.http.get(url);
  }

}
