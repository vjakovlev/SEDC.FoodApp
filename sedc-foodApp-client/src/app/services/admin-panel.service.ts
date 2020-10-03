import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { RestaurantRequestModel } from '../models/request-models/restoran-model';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  get url() {
    return this.config.getUrl()
  }

  constructor(private http: HttpClient,
              private config: ConfigService) {}

  addRestaureant(request: RestaurantRequestModel): Observable<any> {
    // let url = this.url + "/api/adminpanel/addrestaurant";
    let url = "https://localhost:5001/api/AdminPanel/AddRestaurant";

    console.log(url)

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };


    return this.http.post<RestaurantRequestModel>(url, request, options)
  }

}
