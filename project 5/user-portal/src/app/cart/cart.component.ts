import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Item } from '../Item';
import { ProductService } from '../ProductService';

@Component({
	templateUrl: 'cart.component.html'
})

export class CartComponent implements OnInit {

	items: Item[] = [];
	total: number = 0;

	constructor(
		private activatedRoute: ActivatedRoute,
		private productService: ProductService
	) { }

	ngOnInit() {
		this.activatedRoute.params.subscribe(params => {
			var id = params['id'];

			if (id) {
	
				if (localStorage.getItem('cart') == null) {
					

					this.productService.find(id).subscribe(data=>{
						let cart: any = [];
						var item: Item = {product: data, quantity: 1};
	
						cart.push(JSON.stringify(item));
						localStorage.setItem('cart', JSON.stringify(cart));

						this.items.push(item);

					}, err=>console.log(err));


				} else {
					let cart: any = JSON.parse(localStorage.getItem('cart'));
					let index: number = -1;
					for (var i = 0; i < cart.length; i++) {
						let item: Item = JSON.parse(cart[i]);
						if (item.product.code == id) {
							index = i;
							break;
						}
					}
					if (index == -1) {

						this.productService.find(id).subscribe(data=>{
							var item: Item = {product: data, quantity: 1};
		
							cart.push(JSON.stringify(item));
							localStorage.setItem('cart', JSON.stringify(cart));

							this.items.push(item);
							
						}, err=>console.log(err));

					} else {
						let item: Item = JSON.parse(cart[index]);
						item.quantity += 1;
						cart[index] = JSON.stringify(item);
						localStorage.setItem("cart", JSON.stringify(cart));
					}
				}
				this.loadCart();
			} else {
				this.loadCart();
			}
		});
	}

	loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
			console.log(this.items);
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (var i = 0; i < cart.length; i++) {
			let item: Item = JSON.parse(cart[i]);
			if (item.product.id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}
	cartInfo:any;
	checkOut() {

		this.cartInfo= this.total;
		
	}

}