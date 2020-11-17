import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  serverURL = environment.apiServer

  constructor(private http: HttpClient) { }



  createOrder(request: any) : Observable<any> {

    let url = `${this.serverURL}/api/Order/CreateOrder`;

    return this.http.post(url, request);

  }

}
