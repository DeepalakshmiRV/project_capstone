import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Product } from './productUser';

@Injectable()
export class ProductService {

    // private products: Product[];

    constructor(public httpClient:HttpClient) {
        // this.products = [
        //     { id: '100', name: 'TV', price: 110000, photo: 'sony.jpg' },
        //     { id: '101', name: 'Mobile', price: 55000, photo: 'mobile.jpg' },
        //     { id: '103', name: 'Laptop', price: 85000, photo: 'lenova.jpg' }
        // ];
    }

    findAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://localhost:3001/api/products");
    }

    find(id: string): Observable<Product> {
        return this.httpClient.get<Product>(`http://localhost:3001/api/productbyidCode/${id}`);
    }

    // private getSelectedIndex(id: string) {
    //     for (var i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id == id) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

}