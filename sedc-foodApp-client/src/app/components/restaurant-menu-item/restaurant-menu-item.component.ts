import { Component, Input, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';
import { MapMealTypePipe } from '../../pipes/map-meal-type.pipe'; 

@Component({
  selector: 'app-restaurant-menu-item',
  templateUrl: './restaurant-menu-item.component.html',
  styleUrls: ['./restaurant-menu-item.component.css']
})
export class RestaurantMenuItemComponent implements OnInit {

  @Input() menuItem: any
  @Input() mealTypeName: any

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {}

}
