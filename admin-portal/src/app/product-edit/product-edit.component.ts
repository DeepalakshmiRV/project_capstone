import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../_models/company';
import { Product } from '../_models/product';
import { CompanyService } from '../_services/company.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  id: any;
  product: Product = new Product();
  companies: Company[];
  productForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(this.id).subscribe(result => {
      this.product = result;
      console.log(this.product);
    });
    this.companyService.getCompanies().subscribe(result => {
      this.companies = result;
      console.log(this.companies)
    })
    this.productForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      details: ['', Validators.required],
      image: ['', Validators.required],
      price: ['', Validators.required],
      company: ['', Validators.required]
    });

  }
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    } else {
      console.log(this.product)
      this.productService.updateProductById(this.product, this.id).subscribe(result => {
        console.log("Product Updated Successfully.");
        this.router.navigate(["/products"]);
      }, (err) => { console.log(err) })
    }
  }

  goBack() {
    this.location.back();
  }

}
