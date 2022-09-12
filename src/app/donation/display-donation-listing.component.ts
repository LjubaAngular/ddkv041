import { newArray } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor } from '@angular/forms';
import { findIndex } from 'rxjs';
import { IDonor } from '../donor/idonor';
import { DonationService } from '../shared/donation.service';
import { IDonation } from './idonation';
import { IDonationListing } from './idonationlisting';

@Component({
  selector: 'app-display-donation-listing',
  templateUrl: './display-donation-listing.component.html',
  styleUrls: ['./display-donation-listing.component.css']
})
export class DisplayDonationListingComponent implements OnInit {

  @Input()
  donationId!: number;

  @Input()
  donation!: IDonation;
  

  donationListings!: IDonationListing[];
  donationListingsByDonationId!: IDonationListing[];

  // donationListings!: DonationListing[];
  // donationListingsByDonationId!: IDonationListing[];

  donors!: IDonor[];
  donorsByDonationId!: IDonor[];

  donationListingsFormGroup!: FormGroup;


  // Use this property to stored filtered employees, so we do not
  // lose the original list and do not have to make a round trip
  // to the web server on every new search
  filteredDonors!: IDonor[];

  private _searchTerm!: string;

  // We are binding to this property in the view template, so this
  // getter is called when the binding needs to read the value
  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(searchString: string) {
    this._searchTerm = searchString;
    this.filteredDonors = this.filterDonors(searchString);
    this.donorIndex = -1;
  }

  filterDonors(searchString: string) {
    return this.donors.filter(donor =>
      donor.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  //panelExpanded: number = -1;
  donorIndex: number = -1;
  donorCreate: number = -1;
  donorEdit: number = -1;

  onClickDonor(ind: number) {
    if (this.donorIndex == ind) {
      //this.panelExpanded = -1;
      this.donorIndex = -1;
    }
    else {
      //this.panelExpanded = ind;
      this.donorIndex = ind;
    }
  }

  onClickBackToSearchList() {
    this.donorIndex = -1;
  }

  onClickCreateNewDonor(){
    this.donorCreate = 1;
  }

  onCreateNewDonor(){
    this.donorCreate = -1;
    this._searchTerm = "";
  }

  // onClickCancel(){
  //   this.donorCreate = -1;
  // }



  donationStatisticsFormGroup!: FormGroup;

  totalNumberOfUnits!: number;
  totalQuantity!: number;
 
  // filterDonors(searchString: string) {
  //   const resultDonor: IDonor = this.donors.find(donor => donor.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1)!;
  //   if (resultDonor) {
  //     return this.donors.filter(donor => donor.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  //   }
  //   else {
  //       return new Array;
  //   }
  // }
  

  parentDonated: string = "";
  newDonationListing!: IDonationListing;

  parentOnDonated(childDonated: string): void {
    this.parentDonated = childDonated;
    console.log("parent: " + this.parentDonated);
  }


  parentOnNewDonationListing(childNewDonationListing: IDonationListing) {
    this.newDonationListing = childNewDonationListing;
    console.log("parent new listing: " + this.parentDonated);

    this.donationListings.push(this.newDonationListing);  
    this.donationListingsByDonationId.push(this.newDonationListing);  
    if (!(this.donorsByDonationId.find(donor => donor.id === this.newDonationListing.donorId))) {
      const newDonor: IDonor = this.donors.find(donor => donor.id === this.newDonationListing.donorId)!;
      this.donorsByDonationId.push(newDonor);
      // umesto prethodna dva reda moze ovaj kod
      //this.donorsByDonationId.push(this.donors.find(donor => donor.id === donationListing.donorId)!);
    }
    this.totalQuantity = this.totalQuantity + this.newDonationListing.quantity;
    this.totalNumberOfUnits = this.totalNumberOfUnits + 1;

    this.donationStatisticsFormGroup.patchValue({
      totalNumberOfUnitsFormControl: this.totalNumberOfUnits,  
      totalQuantityFormControl: this.totalQuantity,
    });


  }





  parentDonorCreated: string = "";
  newDonor!: IDonor;
  newIndex!: number;

  parentOnDonorCreated(childDonorCreated: string): void {
    this.parentDonorCreated = childDonorCreated;
    console.log("parent: " + this.parentDonorCreated);
  }

  parentOnNewDonor(childNewDonor: IDonor) {
    this.newDonor = childNewDonor;
    console.log("parent new donor: " + this.newDonor);

    this.donors.push(this.newDonor);
    //this.filteredDonors.push(this.newDonor);
    this.onCreateNewDonor();
    this.newIndex = this.filteredDonors.indexOf(this.newDonor); 
    //this.newIndex = this.filteredDonors.length - 1;
    this.onClickDonor(this.newIndex);

  }





  parentCancelled: string = "";

  parentOnCancelled(childCancelled: string): void {
    this.parentCancelled = childCancelled;
    this.donorCreate = -1;
  }




  parentBackToSearch: string = "";

  parentOnBackToSearch(childBackToSearch: string): void {
    this.parentBackToSearch = childBackToSearch;
    this.donorIndex = -1;
  }


  parentSavedChanges: string = "";

  parentOnSavedChanges(childSavedChanges: string): void {
    this.parentSavedChanges = childSavedChanges;
    console.log("parent: " + this.parentSavedChanges);
  }






  createFormGroup (): void {
    this.donationStatisticsFormGroup = this._fb.group({
      totalNumberOfUnitsFormControl: [0],
      totalQuantityFormControl: [0]
    });
  }

  fillFormGroup(totalNumberOfUnits: number, totalQuantity: number): void {
    this.donationStatisticsFormGroup.patchValue({
      totalNumberOfUnitsFormControl: totalNumberOfUnits,
      totalQuantityFormControl: totalQuantity
    });
  }

  




  constructor(private _donationService: DonationService,
              private _fb: FormBuilder) { }


  ngOnInit(): void {
    this.donationListings = new Array;
    this.donationListingsByDonationId = new Array;
    this.donors = new Array;
    this.donorsByDonationId = new Array;
    //this.getDonationListings();
    //this.getDonors();
    //this.getDonationListingsByDonationId();
    //this.getDonorsByDonationId();
    
    let totalQuantity: number = 0;
    let totalNumberOfUnits: number = 0;
    //let donationListings: IDonationListing[];
    //let donationListingsByDonationId: IDonationListing[];

    this.donationStatisticsFormGroup = this._fb.group({
      totalNumberOfUnitsFormControl: [""],
      totalQuantityFormControl: [""]
    });

    

    this._donationService.getDonationListings().subscribe(
      (fetchedDonationListings) => {
        this.donationListings = fetchedDonationListings;
        console.log("1.");
        console.log(this.donationListings);

        this.donationListings.forEach(
          (fetchedDonationListing) => {
            if (fetchedDonationListing.donationId === this.donationId)
              this.donationListingsByDonationId.push(fetchedDonationListing); 
          }
        );
        // umesto .forEach moze ovaj kod
        //this.donationListingsByDonationId = this.donationListings.filter(donationListing => donationListing.id === this.donationId);
        console.log("2.");
        console.log(this.donationListingsByDonationId);

        totalNumberOfUnits = this.donationListingsByDonationId.length;
        this.totalNumberOfUnits = totalNumberOfUnits;
        console.log("2.1.");
        console.log(totalNumberOfUnits);

        // for (let index = 0; index < this.donationListingsByDonationId.length; index++) {
        //   totalQuantity = totalQuantity + this.donationListingsByDonationId[index].quantity;
        // }
        for (let donationListing of this.donationListingsByDonationId) {
          totalQuantity = totalQuantity + donationListing.quantity;
        }
        this.totalQuantity = totalQuantity;
        console.log("2.2.");
        console.log(totalQuantity);

        this.donationStatisticsFormGroup.patchValue({
          totalNumberOfUnitsFormControl: totalNumberOfUnits,
          totalQuantityFormControl: totalQuantity
        });
        
      },
      (err) => console.log(err)
    );



    
    this._donationService.getDonors().subscribe(
      (donorList) => { 
        this.donors = donorList;
        console.log("3.");
        console.log(this.donors);

        this.donationListingsByDonationId.forEach(
          (donationListing) => {
            if (!(this.donorsByDonationId.find(donor => donor.id === donationListing.donorId))) {
              const newDonor: IDonor = this.donors.find(donor => donor.id === donationListing.donorId)!;
              this.donorsByDonationId.push(newDonor);
              // umesto prethodna dva reda moze ovaj kod
              //this.donorsByDonationId.push(this.donors.find(donor => donor.id === donationListing.donorId)!);
            }
          }
        );
        console.log("4.");
        console.log(this.donorsByDonationId);

        this.filteredDonors = this.donors;
        
      },
      (err) => console.log(err)
    );

    
    

    // this.createFormGroup();
    //this.fillFormGroup(totalNumberOfUnits, totalQuantity)
    
  }
  
  
  
  

}














// ngOnInit(): void {
//   this.donationListings = new Array;
//   this.donationListingsByDonationId = new Array;
//   this.donors = new Array;
//   this.donorsByDonationId = new Array;
//   //this.getDonationListings();
//   //this.getDonors();
//   //this.getDonationListingsByDonationId();
//   //this.getDonorsByDonationId();


//   this._donationService.getDonationListings().subscribe(
//     (donationListings) => {
//       this.donationListings = donationListings;
//       //console.log("1");
//       //console.log(this.donationListings);

//       this.donationListings.forEach(
//         (donationListing) => {
//           if (donationListing.donationId === this.donationId)
//             this.donationListingsByDonationId.push(donationListing);
//         }
//       );
//       // umesto if moze ovaj kod
//       //this.donationListingsByDonationId = this.donationListings.filter(donationListing => donationListing.id === this.donationId);
//       //console.log("2");
//       //console.log(this.donationListingsByDonationId);

//     },
//     (err) => console.log(err)
//   );

  
//   this._donationService.getDonors().subscribe(
//     (donorList) => { 
//       this.donors = donorList;
//       //console.log("3");
//       //console.log(this.donors);

//       this.donationListingsByDonationId.forEach(
//         (donationListing) => {
//           if (!(this.donorsByDonationId.find(donor => donor.id === donationListing.donorId))) {
//             const newDonor: IDonor = this.donors.find(donor => donor.id === donationListing.donorId)!;
//             this.donorsByDonationId.push(newDonor);
//             // umesto prethodna dva reda moze ovaj kod
//             //this.donorsByDonationId.push(this.donors.find(donor => donor.id === donationListing.donorId)!);
//           }
//         }
//       );
//       //console.log("4");
//       //console.log(this.donorsByDonationId);
      
//     },
//     (err) => console.log(err)
//   );

  



// }


// //   getDonationListings(): void {
// //     this._donationService.getDonationListings().subscribe(
// //       (donationListings) => {
// //         this.donationListings = donationListings;
// //         console.log(this.donationListings);
// //       },
// //       (err) => console.log(err)
// //     );
// // }

// //   getDonors(): void {
// //       this._donationService.getDonors().subscribe(
// //         (donorList) => { 
// //           this.donors = donorList;
// //           console.log(this.donors);
// //         },
// //         (err) => console.log(err)
// //       );
// //   }

// //   getDonationListingsByDonationId(): void {
// //     this.donationListings.forEach(
// //       (donationListing) => {
// //         console.log(this.donationListings);
// //         if (donationListing.donationId === this.donationId)
// //           this.donationListingsByDonationId.push(donationListing);
// //       }
// //     );
// //     console.log(this.donationListingsByDonationId);
// //     //this.donationListingsByDonationId = this.donationListings.filter(donationListing => donationListing.id === this.donationId);
// //   }

// //   getDonorsByDonationId(): void {
// //     this.donationListingsByDonationId.forEach(
// //       (donationListing) => {
// //         console.log(this.donationListingsByDonationId);
// //         if (!this.donorsByDonationId.find(donor => donor.id === donationListing.donorId)) {
// //           const newDonor: IDonor = this.donors.find(donor => donor.id === donationListing.donorId)!;
// //           this.donorsByDonationId.push(newDonor);
// //           //this.donorsByDonationId.push(this.donors.find(donor => donor.id === donationListing.donorId)!);
// //         }
// //       }
// //     );
// //     console.log(this.donorsByDonationId);
// //   }

// }

