import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../_models/company';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css']
})
export class CompanyAddComponent implements OnInit {

  companyForm: FormGroup;
  submitted = false;
  company: Company = new Company();

  constructor(private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router) { }

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }
  get f() {
    return this.companyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    } else {
      console.log(this.company)
      this.companyService.addCompany(this.company).subscribe(result => {
        console.log("Company Added Successfully.");
        this.router.navigate(["/companies"]);
      }, (err) => { console.log(err) })
    }
  }
}
