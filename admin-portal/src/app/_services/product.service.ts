import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { ProductRaw } from '../_models/product-raw';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }),
  ResponseType: 'Product'
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL to web api
  private productUrl = 'http://localhost:3001/api/products';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductRaw[]> {
    return this.http.get<ProductRaw[]>(this.productUrl)
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`http://localhost:3001/api/productbyid/${id}`)
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productUrl, product, httpOptions);
  }

  updateProductById(product: Product, id: any): Observable<Product> {
    return this.http.put<Product>(`${this.productUrl}/${id}`, product, httpOptions);
  }

  deleteProductById(id: any): Observable<Product> {
    return this.http.delete<Product>(`${this.productUrl}/${id}`)
  }

}
