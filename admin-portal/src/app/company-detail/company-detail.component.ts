import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../_models/company';
import { CompanyService } from '../_services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {

  id: any;
  company: Company = new Company();
  constructor(private _companyService: CompanyService,
    private _route: ActivatedRoute, private _router: Router,
    private _location: Location) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._companyService.getCompanyById(this.id).subscribe(result => {
      this.company = result;
      console.log(this.company);
    })
  }

  deleteCompanyById(id: any) {
    this._companyService.deleteCompanyById(id).subscribe((result) => {
      console.log('Company Deleted Successfully..')
      this._location.back();
    })
  }

  goBack(): void {
    this._location.back();
  }

}
