import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestorauntRequestModel } from '../models/request-models/restoran-model'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(
    private http: HttpClient,
  ) { }


  addRestoraunt(item:RestorauntRequestModel): Observable<RestorauntRequestModel> {
    return this.http.post<RestorauntRequestModel>('URL', item)
    .pipe(
      // catchError(err => console.log(err))
    )

  }















}
