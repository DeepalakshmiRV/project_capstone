import { Component, OnInit } from '@angular/core';

import { Product } from '../productUser';
import { ProductService } from '../ProductService';

@Component({
  selector: 'app-product-user',
  templateUrl: './product-user.component.html',
  styleUrls: ['./product-user.component.css']
})
export class ProductUserComponent implements OnInit {

	products: Product[];

	constructor(
		private productService: ProductService
	) { }

	ngOnInit() {
		this.productService.findAll().subscribe(data=>this.products=data, err=>console.log(err));
	}

}





