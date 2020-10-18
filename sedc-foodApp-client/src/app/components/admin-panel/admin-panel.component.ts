
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MenuItemRequestModel, Municipality, RestaurantRequestModel, RestaurantResponseModel } from 'src/app/models/request-models/restoran-model';
import { AdminPanelService } from '../../services/admin-panel.service'

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {

  isEditMode: boolean

  restaurantId: string

  modalRef: BsModalRef;

  restoraunts: any;

  requestForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    municipality: new FormControl('')
  })

  filterForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    municipality: new FormControl('')
  })

  municipalityFlterForm = new FormGroup({
    municipality: new FormControl('')
  })

  municipalityList = [Municipality.karpos, Municipality.centar, Municipality.aerodrom];

  constructor(private adminPanelService: AdminPanelService,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    this.getAllRestoraunts()
  }

  getAllRestoraunts() {
    let item = {
      name: this.filterForm.value.name,
      address: this.filterForm.value.address,
      municipality: this.municipalityFlterForm.value.municipality
    }

    this.adminPanelService.getAllRestoraunts(item).subscribe({
      next: res => {
        this.restoraunts = res
      },
      error: err => console.warn(err),
      complete: () => {}
    })
  }

  addRestaurant() {
    let requestModel = new RestaurantRequestModel();
    requestModel.name = this.requestForm.value.name;
    requestModel.address = this.requestForm.value.address;
    requestModel.municipality = parseInt(this.requestForm.value.municipality);

    this.adminPanelService.addRestoraunt(requestModel).subscribe({
      next: res => {

      },
      error: err => console.warn(err),
      complete: () => {
        this.closeModal()
        this.getAllRestoraunts()
      }
    })
  }

  updateRestaurant() {
    let body = Object.assign(this.requestForm.value, { id : this.restaurantId})
    body.municipality = parseInt(body.municipality)

    this.adminPanelService.updateRestaurant(body).subscribe({
      complete: () => { 
        this.closeModal()
        this.getAllRestoraunts() 
      }
    }) 
  }

  deleteRestaurant(id) {
    this.adminPanelService.deleteRestaurant(id).subscribe({
      next: res => console.log(res),
      error: err => console.warn(err),
      complete: () => {
        this.getAllRestoraunts()
      }
    })
  }

  openModal(template: TemplateRef<any>, restaurant?: any) {  
    this.modalRef = this.modalService.show(template);

    if(!restaurant) {
      this.requestForm.get("municipality").setValue(Municipality.karpos)
    }

    if (!!restaurant) {
      this.isEditMode = true;
      const {id, menu, ...rest} = restaurant
      this.requestForm.setValue(rest)
      this.restaurantId = id;
    }
  }

  closeModal() {
    this.modalService._hideModal()
    this.modalService._hideBackdrop()
    this.requestForm.reset()
    this.isEditMode = false
  } 

  mapMunicipality(input) {
    switch(input) {
      case 1:
        return "Karposh";
        break;
      case 2:
        return "Centar";
        break;
      case 3: 
        return "Aerodrom"
        break;
    }

  }

}
