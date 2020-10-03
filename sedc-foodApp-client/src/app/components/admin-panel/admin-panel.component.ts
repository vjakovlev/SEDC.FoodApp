import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestaurantRequestModel } from 'src/app/models/request-models/restoran-model';
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

  constructor(private _adminPanelService: AdminPanelService) {}

  ngOnInit(): void {}


  onSubmit() {

    let requestModel = new RestaurantRequestModel();
    requestModel.name = this.requestForm.value.name;
    requestModel.address = this.requestForm.value.address;
    requestModel.municipality = parseInt(this.requestForm.value.municipality);

    this._adminPanelService.addRestaureant(requestModel).subscribe({
      next: res => {
        console.log(res)
      },
      error: err => console.warn(err.message),
      complete: () => console.log("done")
    })
  }


}
