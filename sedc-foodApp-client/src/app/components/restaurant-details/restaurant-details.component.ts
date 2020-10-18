import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MealType, MenuItemRequestModel } from 'src/app/models/request-models/restoran-model';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  modalRef: BsModalRef;

  restaurantId: string;

  restaurant: any

  retaurantMenuItems: any

  menuItemForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    calories: new FormControl(''),
    isVege: new FormControl(''),
    mealType: new FormControl(MealType.Starters),
  })

  mealTypes = [MealType.Starters, MealType.Salads, MealType.MainDish, MealType.Deserts, MealType.Drinks];
  

  constructor(private activatedRoute: ActivatedRoute,
              private adminPanelService: AdminPanelService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.restaurantId = params.id;
    })

    //da se naprai filtracija na meni itemi, nova metoda samo za meni itemi

    this.getMenuItems() 
  }

  getMenuItems() {
    this.adminPanelService.getRestaurantMenu(this.restaurantId).subscribe({
      next: data => {
        console.log(data)
        this.retaurantMenuItems = data
      }
    })
  }

  addMenuItem() {
    let menuItem = new MenuItemRequestModel;
    menuItem.name = this.menuItemForm.value.name
    menuItem.calories = this.menuItemForm.value.calories
    menuItem.price = this.menuItemForm.value.price
    menuItem.isVege = Boolean(this.menuItemForm.value.isVege)
    menuItem.mealType = parseInt(this.menuItemForm.value.mealType)

    let requestModel = {
      id: this.restaurantId,
      menuItem: menuItem
    }

    this.adminPanelService.updateRestaurantMenu(requestModel).subscribe({
      error: err => console.warn(err.error),
      complete: () => {
        this.closeModal()
        this.getMenuItems()
      }
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalService._hideModal()
    this.modalService._hideBackdrop()
  }

  mapMealTypes(input) {
    switch(input) {
      case 1:
        return "Starters";
        break;
      case 2:
        return "Salads";
        break;
      case 3: 
        return "MainDish"
        break;
      case 4: 
        return "Deserts"
        break;
      case 5: 
        return "Drinks"
        break;  
    }
  }

}
