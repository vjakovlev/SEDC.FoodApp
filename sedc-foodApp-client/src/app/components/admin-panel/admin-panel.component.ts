import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MenuItemRequestModel, Municipality, RestaurantRequestModel, RestaurantResponseModel } from 'src/app/models/request-models/restoran-model';
import { AdminPanelService } from '../../services/admin-panel.service'


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  requestForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    municipality: new FormControl('')
  })

  municipalityList = [Municipality.karpos, Municipality.centar, Municipality.aerodrom];
  restoraunts: Array<RestaurantResponseModel>;
   
  constructor(private _adminPanelService: AdminPanelService) {}

  ngOnInit(): void {}


  onSubmit() {
    let requestModel = new RestaurantRequestModel();
    requestModel.name = this.requestForm.value.name;
    requestModel.address = this.requestForm.value.address;
    requestModel.municipality = parseInt(this.requestForm.value.municipality);
    this._adminPanelService.addRestoraunt(requestModel).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.warn(err.message),
      complete: () => console.log("done")
    })
  }

  getAllRestoraunts() {
    // this._adminPanelService.getAllRestoraunts()
    
  }

  addMenuItem() {
    let requestModel = new MenuItemRequestModel;
    // requestModel.calories = 
  }


}
