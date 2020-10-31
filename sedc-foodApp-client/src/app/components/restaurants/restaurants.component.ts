import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants()
  }

  getAllRestaurants() {
    this.restaurantService.getRestaurants().subscribe({
      next: res => {
        this.restaurants = res
        console.log(res)
      }
    })
  }

}
