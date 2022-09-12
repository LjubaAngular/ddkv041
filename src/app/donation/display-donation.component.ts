import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DonationService } from '../shared/donation.service';
import { IDonation } from './idonation';

@Component({
  selector: 'app-display-donation',
  templateUrl: './display-donation.component.html',
  styleUrls: ['./display-donation.component.css']
})
export class DisplayDonationComponent implements OnInit {

  // @Input()
  // donationId!: number;

  @Input()
  donation!: IDonation;

  donationFormGroup!: FormGroup;

 

  constructor(private _donationService: DonationService,
              private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.fillFormGroup();
  }

  createFormGroup (): void {
    this.donationFormGroup = this._fb.group({
      idFormControl: ["", Validators.required],
      eventNameFormControl: ["", Validators.required],
      eventDateFormControl: ["", Validators.required],
      placeFormControl: ["", Validators.required],
      addressFormControl: ["", Validators.required]
    });
  }

  fillFormGroup(): void {
    this.donationFormGroup.setValue({
      idFormControl: this.donation.id,
      eventNameFormControl: this.donation.eventName  ,
      eventDateFormControl: this.donation.eventDate  ,
      placeFormControl: this.donation.place  ,
      addressFormControl: this.donation.address
    });
  }


}
