import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../shared/donation.service';
import { IDonor } from './idonor';
import { IStatus } from './istatus';

@Component({
  selector: 'app-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.css']
})
export class CreateDonorComponent implements OnInit {

  //prijavljuje gresku
  // donorFormGroup: FormGroup;

  // direktiva ts, resava problem
  ////@ts-ignore
  //donorFormGroup: FormGroup;

  // ili ovaj znak uzvika ! resava problem
  donorFormGroup!: FormGroup;

  donor!: IDonor;

  statusList!: string[];

  // onClickCancel() {
  //   this._router.navigate(['listdonations']);
  // }

  constructor(private _donationService: DonationService,
    private _fb: FormBuilder,
    private _router: Router) { }

  ngOnInit(): void {
    this.createFormGroup();
    this.statusList = this._donationService.getStatusList();

    this.donor = {
      id: 0,
      employeeNumber: 0,
      name: "",
      gender: "",
      identificationNumber: "",
      birthDate: new Date(),
      bloodType: "",
      rhFactor: "",
      lastDonationDate: new Date(),
      totalDonationNumber: 0,
      member:	false,
      activity: false,
      note: "",
      status:	"",
      phone:	""
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



  childDonorCreated: string = "";
  childNewDonor!: IDonor;

  
  @Output()
  childDonorCreatedEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  childNewDonorEventEmitter: EventEmitter<IDonor> = new EventEmitter<IDonor>();

  // 3.
  onSubmit(): void {
    this.mapFormValuesToDonorModel();
    console.log(this.donor);
    this._donationService.postDonor(this.donor).subscribe(
      () => {
        
        console.log("child before created: " + this.childDonorCreated);
        this.childDonorCreated = "created";
        this.childNewDonor = this.donor;
        this.childDonorCreatedEventEmitter.emit(this.childDonorCreated);
        this.childNewDonorEventEmitter.emit(this.childNewDonor);
        //this._router.navigate(['list']),
      },
      (err: any) => console.log(err)
    );
  }

  mapFormValuesToDonorModel() {
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





  childCancelled: string = "";

  @Output()
  childCancelledEventEmitter: EventEmitter<string> = new EventEmitter<string>();


  onClickCancel(): void {
    this.childCancelled = "cancelled";
    this.childCancelledEventEmitter.emit(this.childCancelled);
  };

}
