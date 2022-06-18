import { CompileNgModuleMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Company } from '../_models/company';
import { Product } from '../_models/product';
import { ProductRaw } from '../_models/product-raw';
import { CompanyService } from '../_services/company.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = null;

  companies: Company[] = null;

  productsRaw: ProductRaw[] = null;

  constructor(private productService: ProductService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getCompanies();
    this.getRawProducts();
  
  }

  getRawProducts() {
    return this.productService.getProducts()
      .subscribe(
        results => {
          this.productsRaw = results;
          if(this.companies != null) {

            this.getProducts();

          }
            
        }
      );
  }

  getProducts() {
    console.log(this.companies);
    console.log(this.productsRaw);

    let products: Product[] = [];
    this.productsRaw.forEach(productRaw => {
      let product = new Product();

      product.company =  this.getCompanyById(productRaw.company);
      product._id = productRaw._id;
    
      product.code = productRaw.code;

      product.details = productRaw.details;
      product.image = productRaw.image;
      product.name = productRaw.name;
      product.price = productRaw.price;
      products.push(product);
    });

    this.products = products;
    console.log(this.products);
    
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      if (this.productsRaw != null) {
        console.log(this.productsRaw);
        this.getProducts();
      }

    })
  }

  getCompanyById(id : string): Company {

    let result:Company = new Company();
    result._id = id;
    
    this.companies.forEach(company => {
      if (company._id == id) {
        result.name = company.name;
      }   
    });

    return result;
    

  }

}
