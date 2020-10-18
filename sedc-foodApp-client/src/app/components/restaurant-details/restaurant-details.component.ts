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
  menuItemId: string;

  restaurant: any

  retaurantMenuItems: any

  isEditMode: boolean

  menuItemForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    calories: new FormControl(''),
    isVege: new FormControl(''),
    mealType: new FormControl(''),
  })

  filterForm = new FormGroup({
    name: new FormControl('')
  })

  mealTypes = [MealType.Starters, MealType.Salads, MealType.MainDish, MealType.Deserts, MealType.Drinks];


  constructor(private activatedRoute: ActivatedRoute,
    private adminPanelService: AdminPanelService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.restaurantId = params.id;
    })

    //da se naprai filtracija na meni itemi, nova metoda samo za meni itemi

    this.getMenuItems()
  }

  getMenuItems() {
    let nameFilter = this.filterForm.value.name;

    this.adminPanelService.getRestaurantMenu(this.restaurantId, nameFilter).subscribe({
      next: data => {
        console.log(data)
        this.retaurantMenuItems = data
      }
    })
  }

  addMenuItem() {
    let requestModel: any = {
      id: this.restaurantId,
      menuItem: {
        name: this.menuItemForm.value.name,
        calories: this.menuItemForm.value.calories,
        price: this.menuItemForm.value.price,
        isVege: Boolean(this.menuItemForm.value.isVege),
        mealType: parseInt(this.menuItemForm.value.mealType)
      }
    }

    if(this.isEditMode) {
      requestModel.menuItem.id = this.menuItemId
    }

    this.adminPanelService.updateRestaurantMenu(requestModel).subscribe({
      error: err => console.warn(err.error),
      complete: () => {
        this.closeModal()
        this.getMenuItems()
      }
    })
  }

  deleteMenuItem(menuItemId) {
    this.adminPanelService.deleteMenuItem(this.restaurantId, menuItemId).subscribe({
      complete: () => {
        this.getMenuItems()
      }
    })
  }

  openModal(template: TemplateRef<any>, menuItem?: any) {
    this.modalRef = this.modalService.show(template);

    if(!menuItem) {
      this.menuItemForm.get("mealType").setValue(MealType.Starters)
    }

    if (!!menuItem) {
      this.isEditMode = true
      const {id, ...rest} = menuItem
      this.menuItemForm.setValue(rest)
      this.menuItemId = id
    }
  }

  closeModal() {
    this.menuItemForm.reset()
    this.modalService._hideModal()
    this.modalService._hideBackdrop()
    this.isEditMode = false
  }

  mapMealTypes(input) {
    switch (input) {
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
