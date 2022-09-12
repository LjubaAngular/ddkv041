import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DonationService } from '../shared/donation.service';
import { IDonation } from './idonation';

@Component({
  selector: 'app-list-donations',
  templateUrl: './list-donations.component.html',
  styleUrls: ['./list-donations.component.css']
})
export class ListDonationsComponent implements OnInit {

  donations!: IDonation[];
  //donation!: IDonation;


  panelExpanded: number = -1;

  donationFormGroup!: FormGroup;

  constructor(private _donationService: DonationService,
              private _fb: FormBuilder,
              private _router: Router) { }

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations(): void {
    this._donationService.getDonations().subscribe(
      (donationList) => this.donations = donationList,
      (err) => console.log(err)
    );
  }

  toggleShow(ind: number) {
    if (this.panelExpanded == ind) {
      this.panelExpanded = -1;
    }
    else {
      this.panelExpanded = ind;
    }
  }

  onClickCreateNew(): void {
    this._router.navigate(['createdonation']);
  }
 
  

  



}
