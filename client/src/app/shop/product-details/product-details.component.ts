import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from  'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product : IProduct;
  quantity = 0;

  constructor(private shopService : ShopService, 
              private activeRoute : ActivatedRoute, 
              private bcService : BreadcrumbService, 
              private basketService: BasketService) {
      this.bcService.set('@productDetails', ' ');   //This now needs  to be empty space rather than empty string for effect
     }

  ngOnInit() {
    this.loadProduct();
  }

    addItemToBasket(){
      this.basketService.addItemToBasket(this.product, this.quantity);
    }

    incrementQuantity(){
      this.quantity++;
    }

    decrementQuantity(){
      if(this.quantity > 0){
        this.quantity--;
      }
    }

  loadProduct(){      
    this.shopService.getProduct(+this.activeRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    });
  }

}
