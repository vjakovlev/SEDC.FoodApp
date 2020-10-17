import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminPanelService } from 'src/app/services/admin-panel.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantId: string;

  restaurant: any
  

  constructor(private activatedRoute: ActivatedRoute,
              private adminPanelService: AdminPanelService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:any) => {
      this.restaurantId = params.id;
    })

    this.adminPanelService.getRestaurantById(this.restaurantId).subscribe({
      next: data => this.restaurant = data
    })
  }

  test() {
    console.log(this.restaurant)
  }

}
