import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { IDonation } from '../donation/idonation';
import { IDonationListing } from '../donation/idonationlisting';
import { DonationService } from '../shared/donation.service';
import { IDonor } from './idonor';

@Component({
  selector: 'app-display-donor',
  templateUrl: './display-donor.component.html',
  styleUrls: ['./display-donor.component.css']
})
export class DisplayDonorComponent implements OnInit {



  @Input()
  donor!: IDonor;

  @Input()
  donationId!: number;

  @Input()
  donation!: IDonation;

  donorFormGroup!: FormGroup;

  statusList!: string[];

  



  constructor(private _donationService: DonationService,
              private _fb: FormBuilder,
              private _router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.fillFormGroup();
    this.statusList = this._donationService.getStatusList();

    this.childNewDonationListing =
    {
      id: 0,
      donationDate: new Date(),
      numberOfUnits: 0,
      quantity: 0,
      donorId: 0,
      donationId: 0,  
    };


  }


  

  createFormGroup (): void {
    this.donorFormGroup = this._fb.group({
      idFormControl: ["", Validators.required],
      employeeNumberFormControl: ["", Validators.required],
      nameFormControl: ["", Validators.required],
      genderFormControl: ["", Validators.required],
      identificationNumberFormControl: ["", Validators.required],
      birthDateFormControl: ["", Validators.required],
      bloodTypeFormControl: ["", Validators.required],
      rhFactorFormControl: ["", Validators.required],
      lastDonationDateFormControl: ["", Validators.required],
      totalDonationNumberFormControl: ["", Validators.required],
      memberFormControl: ["", Validators.required],
      activityFormControl: ["", Validators.required],
      noteFormControl: ["", Validators.required],
      statusFormControl: ["", Validators.required],
      phoneFormControl: ["", Validators.required]
    });
  }


  fillFormGroup(): void {
    this.donorFormGroup.patchValue({
      idFormControl: this.donor.id,
      employeeNumberFormControl: this.donor.employeeNumber  ,
      nameFormControl: this.donor.name  ,
      genderFormControl: this.donor.gender  ,
      identificationNumberFormControl: this.donor.identificationNumber,
      birthDateFormControl: this.donor.birthDate,
      bloodTypeFormControl: this.donor.bloodType,
      rhFactorFormControl: this.donor.rhFactor,
      lastDonationDateFormControl: this.donor.lastDonationDate,
      totalDonationNumberFormControl: this.donor.totalDonationNumber,
      memberFormControl: this.donor.member,
      activityFormControl: this.donor.activity,
      noteFormControl: this.donor.note,
      statusFormControl: this.donor.status,
      phoneFormControl: this.donor.phone
    });
  }

  



  childBackToSearch: string = "";

  @Output()
  childBackToSearchEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  onClickBackToSearch(): void {
    this.childBackToSearch = "back";
    this.childBackToSearchEventEmitter.emit(this.childBackToSearch);
  };

  
  

  




  
  childDonated: string = "";
  childNewDonationListing!: IDonationListing;

  @Output()
  childDonatedEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  childNewDonationListingEventEmitter: EventEmitter<IDonationListing> = new EventEmitter<IDonationListing>();
  
  onClickDonate(){
    if (this.childDonated === "") {
      this.mapValuesToDonationListingModel();
      this.postDonationListing();
      this.mapValuesToDonorModel();
      this.putDonor();
      this.fillFormGroup();

      console.log("child before donated: " + this.childDonated);
      this.childDonated = "donated";
      this.childDonatedEventEmitter.emit(this.childDonated);
      this.childNewDonationListingEventEmitter.emit(this.childNewDonationListing);
  
    }
    console.log("child after donated: " + this.childDonated);
    console.log("child after new listing: " + this.childNewDonationListing);
  }

  // onSubmit(): void {
  //   this.mapFormValuesToDonationModel();
  //   this.addDonation(); 
  // }       
  
  mapValuesToDonationListingModel() {
    this.childNewDonationListing.donationDate = new Date('2022-08-18');
    this.childNewDonationListing.numberOfUnits = 1;
    this.childNewDonationListing.quantity = 30;
    this.childNewDonationListing.donorId = this.donor.id;
    this.childNewDonationListing.donationId = this.donationId;
  }

  postDonationListing() : void {
    this._donationService.postDonationListing(this.childNewDonationListing).subscribe(
      () => console.log("Donated"),
      (err: any) => console.log(err)
    );
  }

  mapValuesToDonorModel() {
    console.log(this.donation.eventDate);
    this.donor.lastDonationDate = this.donation.eventDate;
    this.donor.totalDonationNumber = this.donor.totalDonationNumber + 1;
  }

  putDonor(): void {
    this._donationService.putDonor(this.donor).subscribe(
      () => console.log("Donor updated"),
      (err: any) => console.log(err)
    );
  }



  

  


  


  editDonor: number = -1;

  onClickEdit() {
    this.editDonor = 1;
  }

  // onClickEdit(donorId: number){
  //     this._router.navigate(['/edit', donorId]);
  // }




  childSavedChanges: string = "";

  @Output()
  childSavedChangesEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  onClickSaveChanges() {
    this.mapFormValuesToDonorModel();
    this.putDonor(); 
    this.childSavedChanges = "changed"; 
    this.editDonor = -1;
    this.childSavedChangesEventEmitter.emit(this.childSavedChanges);
  }

  mapFormValuesToDonorModel() {
    this.donor.id = this.donorFormGroup.value.idFormControl;
    this.donor.employeeNumber = this.donorFormGroup.value.employeeNumberFormControl;
    this.donor.name = this.donorFormGroup.value.nameFormControl;
    this.donor.gender = this.donorFormGroup.value.emailFormControl;
    this.donor.identificationNumber = this.donorFormGroup.value.identificationNumberFormControl;
    this.donor.birthDate = this.donorFormGroup.value.birthDateFormControl;
    this.donor.bloodType = this.donorFormGroup.value.bloodTypeFormControl;
    this.donor.rhFactor = this.donorFormGroup.value.rhFactorFormControl;
    this.donor.lastDonationDate = this.donorFormGroup.value.lastDonationDateFormControl;
    this.donor.totalDonationNumber = this.donorFormGroup.value.totalDonationNumberFormControl;
    this.donor.member = this.donorFormGroup.value.memberFormControl;
    this.donor.activity = this.donorFormGroup.value.activityFormControl;
    this.donor.note = this.donorFormGroup.value.noteFormControl;
    this.donor.status = this.donorFormGroup.value.statusFormControl;
    this.donor.phone = this.donorFormGroup.value.phoneFormControl;
    
  }




  onClickCancel() {
    this.fillFormGroup();
    this.editDonor = -1;
  }

  // onClickCancel() {
  //   this._router.navigate(['listdonations']);
  // }
  

}
