import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation.service';
import { IDonation } from './idonation';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.css']
})
export class CreateDonationComponent implements OnInit {

  donation!: IDonation;

  donationFormGroup!: FormGroup;

 
  constructor(private _fb: FormBuilder,
              private _donationService: DonationService,
              private _router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.donation =
    {
      id: 0,
      eventName: '',
      eventDate: new Date(),
      place: '',
      address: ""
    };
  }



  createFormGroup (): void {
    this.donationFormGroup = this._fb.group({
      idFormControl: [""],
      eventNameFormControl: ["", Validators.required],
      eventDateFormControl: ["", Validators.required],
      placeFormControl: ["", Validators.required],
      addressFormControl: ["", Validators.required]
    });
  }


  onSubmit(): void {
    this.mapFormValuesToDonationModel();
    this.addDonation(); 
  }       
  
  mapFormValuesToDonationModel() {
    console.log(this.donationFormGroup.value.eventNameFormControl);
    this.donation.eventName = this.donationFormGroup.value.eventNameFormControl;
    this.donation.eventDate = this.donationFormGroup.value.eventDateFormControl;
    this.donation.place = this.donationFormGroup.value.placeFormControl;
    this.donation.address = this.donationFormGroup.value.addressFormControl;
  }

  addDonation() : void {
    this._donationService.addDonation(this.donation).subscribe(
      () => this._router.navigate(['listdonations']),
      (err: any) => console.log(err)
    );
  }

  onClickCancel() {
    this._router.navigate(['listdonations']);
  }


}

