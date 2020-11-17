import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from 'src/app/services/order-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {

    let request = {
      menuItem : [
        {
          id : "123",
          name: "pilesko",
          price: "200",
          calories: "1400",
          isVege: false,
          mealType: 3
        },
        {
          id : "12323",
          name: "oriz",
          price: "200",
          calories: "1400",
          isVege: true,
          mealType: 2
        }
      ]
    }


    this.orderService.createOrder(request).subscribe(res => console.log(res))
  }

}
