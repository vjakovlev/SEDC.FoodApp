import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getUrl() {
    return window.location.protocol + '//' + window.location.host;
  }

}
